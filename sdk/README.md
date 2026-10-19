<p align="center">
  <img src="https://useglade.org/images/logo-bg.png" alt="Glade" width="88" height="88">
</p>

<h1 align="center">@useglade/sdk</h1>

<p align="center">
  <a href="https://useglade.org">useglade.org</a> &nbsp;·&nbsp;
  <a href="https://docs.useglade.org">Docs</a> &nbsp;·&nbsp;
  <a href="https://x.com/usegladeorg">@usegladeorg</a> &nbsp;·&nbsp;
  <a href="https://github.com/usegladeorg/typescript-sdk">GitHub</a>
</p>

Glade is a private neobank on Robinhood Chain for people and the AI agents they run. Amounts are encrypted, payments settle in about 100ms, and an agent's account follows a spend policy that lives on-chain, so it can't spend past the limits you set.

This package is the TypeScript client for the Glade REST API. It is small and fully typed. With it you can:

- read your account and its balances
- send encrypted transfers to an `@handle` or a 0x address
- create agent accounts and manage their spend policies
- approve or reject payments an agent has held for review
- subscribe to webhooks and check that each delivery came from Glade

The SDK is in beta. We try to keep the API shape steady, but it can still change, so pin an exact version and review what changed before you upgrade.

## Install

```bash
npm install @useglade/sdk
```

You need Node 18 or newer, since the client relies on the global `fetch` and Web Crypto that arrived in that release. Browsers and edge runtimes work too. Keep live keys on the server, though: anyone who can read a key can spend with it.

## Send a payment

```ts
import { Glade } from "@useglade/sdk";

const glade = new Glade({ apiKey: process.env.GLADE_API_KEY! });

const transfer = await glade.transfers.create({
  to: "@vendor",
  amount: "125.00",
  asset: "USDG",
  memo: "Invoice #4471",
});

console.log(transfer.status, transfer.txHash);
```

The amount is written to the chain as ciphertext. The response tells you the transfer's id, status and transaction hash, and it never repeats the amount back. The memo is encrypted as well, and only you and the recipient can read it.

A few defaults worth knowing:

| Field | Default | Notes |
|---|---|---|
| `asset` | `"USDG"` | `"USDC"` and `"ETH"` are also accepted. |
| `confidential` | `true` | Set it to `false` only when the receiving wallet cannot hold confidential tokens. |
| `memo` | none | Readable by the two parties and nobody else. |

### Retrying safely

Every call to `transfers.create` sends an `Idempotency-Key` header. If you don't pass one, the SDK makes one for you. Calls that share a key produce at most one transfer, so a retry can never pay someone twice. Use something stable, like an order or invoice id, and that holds even if your process restarts between attempts.

```ts
await glade.transfers.create(
  { to: "@vendor", amount: "125.00" },
  { idempotencyKey: "invoice-4471" },
);
```

## API keys

Create keys in the dashboard under **Developer → API Keys**. Each request sends one key as a bearer token. The prefix decides the network, so there is no separate environment setting:

| Prefix | Network | What it touches |
|---|---|---|
| `hc_test_` | Robinhood Chain testnet, chain 46630 | Test funds only |
| `hc_live_` | Robinhood Chain mainnet, chain 4663 | Real USDG |

You can check which one a client is using:

```ts
const glade = new Glade({ apiKey: "hc_test_..." });
glade.environment; // "test"
```

The client treats any key that doesn't start with `hc_test_` as live. Read keys from an environment variable such as `GLADE_API_KEY` or from a secrets manager, never commit them, and rotate a key the moment you suspect it has leaked.

## What encryption means for your code

Glade's servers hold only ciphertext, and they never hold the key that opens it. You'll notice this in two places:

1. No response contains a plaintext amount. That includes the response to the very request where you named the amount.
2. `accounts.balances()` returns figures only when you pass a `decryptionProof` you built on your side. Without one, it tells you which assets you hold but not how much.

```ts
const { balances } = await glade.accounts.balances({ decryptionProof });
// [{ asset: "USDG", amount: "1245.30" }]
```

## Agent accounts

An agent gets its own wallet and a spend policy. The policy is enforced by the agent's smart account before it can sign, not by a check on our servers. So your agent can't overspend, and a compromised backend can't change that.

```ts
const agent = await glade.agents.create({
  name: "research-bot",
  spendPolicy: {
    dailyLimitUsdg: 500,          // rolling 24 hours
    perTransactionLimitUsdg: 50,
    allowedRecipients: ["api.market", "*.anthropic.com"],
    assets: ["USDG"],
    activeHours: "00:00-23:59",
    hitlThresholdUsdg: 25,        // at or above this, a person approves first
  },
});
```

To change a policy, send only the fields you want to change. The new limits apply from the agent's next signature.

```ts
await glade.agents.updateSpendPolicy(agent.accountId, { dailyLimitUsdg: 250 });
const policy = await glade.agents.getSpendPolicy(agent.accountId);
```

Payments at or above `hitlThresholdUsdg` wait for you. Each one has an `expiresAt` time. Approving signs and sends it straight away. Rejecting drops it and nothing moves.

```ts
const { pending } = await glade.agents.listPendingTransactions();

for (const tx of pending) {
  await glade.agents.approveTransaction(tx.transactionId);
  // or: await glade.agents.rejectTransaction(tx.transactionId);
}
```

`glade.accounts.listAgents()` returns every agent under your account.

## Webhooks

Subscribe to the events you care about:

```ts
const webhook = await glade.webhooks.create({
  url: "https://yourapp.com/hooks/glade",
  events: ["transfer.confirmed", "agent.transaction.pending_approval"],
});

// You see the secret once, in this response. Store it now.
const secret = webhook.secret;
```

The available events are `transfer.initiated`, `transfer.confirmed`, `transfer.failed`, `agent.transaction.pending_approval`, `agent.transaction.approved`, `agent.transaction.rejected` and `agent.policy.updated`.

### Verifying deliveries

Each delivery carries an `X-Glade-Signature` header, an HMAC-SHA256 of the raw body keyed with your webhook secret. Verify it before you act on anything. Pass the body exactly as it arrived. If it has been parsed and turned back into JSON, the hash will differ and a genuine delivery will fail.

`constructEvent` checks the signature and returns the parsed, typed event in one step. If the signature doesn't match, or the body isn't valid JSON, it throws `GladeWebhookVerificationError`, so your handler only ever sees verified data.

```ts
// In a handler that receives a standard Fetch API Request
const event = await glade.webhooks.constructEvent({
  payload: await request.text(), // the raw body, as a string or Uint8Array
  signature: request.headers.get("x-glade-signature") ?? "",
  secret,
});

switch (event.event) {
  case "transfer.confirmed":
    console.log(`Settled in ${event.txHash}`);
    break;
  case "agent.transaction.pending_approval":
    // let a person know something is waiting
    break;
}
```

Event payloads never include an amount. To see a figure, decrypt it locally with your own key.

If you only want a yes or no, `await glade.webhooks.verifySignature({ payload, signature, secret })` resolves to `true` or `false` instead of throwing on a mismatch. The same check is exported as a standalone function, `verifyWebhookSignature`, for code that has no client instance. Both throw a `GladeError` if the runtime has no Web Crypto.

To manage subscriptions, use `webhooks.list()`, `webhooks.delete(webhookId)`, `webhooks.deliveries(webhookId)` to see recent attempts and how your endpoint responded, and `webhooks.replay(webhookId, eventId)` to send a past event again.

## Errors

The SDK throws typed errors, so you can branch on class and fields rather than on message text.

| Class | When it's thrown | Useful fields |
|---|---|---|
| `GladeAPIError` | The API answered with a non-2xx status. | `status`, `code`, `body`, `requestId` |
| `GladeConnectionError` | No answer arrived: a network failure, a timeout, or a cancellation. | `cause` |
| `GladeWebhookVerificationError` | `constructEvent` could not verify or parse a delivery. | |
| `GladeError` | The base class for all of the above. Also thrown directly for setup problems, such as a missing API key or no `fetch` in the runtime. | |

```ts
import { GladeAPIError } from "@useglade/sdk";

try {
  await glade.transfers.create({ to: "@vendor", amount: "999999.00" });
} catch (err) {
  if (err instanceof GladeAPIError && err.code === "insufficient_balance") {
    // err.status is 402
  } else {
    throw err;
  }
}
```

Codes you may see include `unauthorized`, `kyc_required`, `invalid_request`, `insufficient_balance`, `recipient_not_found`, `recipient_not_confidential_ready`, `decryption_proof_invalid`, `invalid_policy`, `not_agent_owner`, `transaction_not_found` and `transaction_expired`. If the API sends no code, `code` is `"unknown_error"`. Include `requestId` when you contact support.

## Configuration

Only `apiKey` is required. Everything else has a default:

```ts
const glade = new Glade({
  apiKey: process.env.GLADE_API_KEY!,
  baseUrl: "https://api.useglade.org", // the default; change it to use a private gateway
  timeoutMs: 30_000,                   // per request
  maxRetries: 2,                       // extra attempts on transient failures; 0 turns retries off
  fetch: customFetch,                  // optional; defaults to the global fetch
});
```

### How retries work

A request is retried after a dropped connection, a timeout, or a `408`, `429`, `500`, `502`, `503` or `504` response. The wait starts near 500ms, roughly doubles each time with some jitter, and never exceeds 8 seconds. When the server sends `Retry-After`, the SDK waits that long instead.

Only requests that are safe to repeat are retried: every `GET`, every `DELETE`, and `transfers.create`, whose idempotency key makes a repeat harmless. Other `POST` and `PATCH` calls are sent once.

### Per-call options

Every method takes a last argument with an `AbortSignal` and a timeout, so you can adjust one call without touching the rest:

```ts
const controller = new AbortController();

const { transfers } = await glade.transfers.list(
  { status: "pending", limit: 50 },
  { signal: controller.signal, timeoutMs: 5_000 },
);

// Elsewhere: controller.abort() stops the request and any retries still queued.
```

`transfers.list` returns newest first. It accepts `limit` (20 by default, 100 at most), `offset`, `status`, and ISO 8601 `from` and `to` timestamps.

## Reference

| Namespace | Methods |
|---|---|
| `glade.accounts` | `me`, `balances`, `listAgents` |
| `glade.transfers` | `create`, `get`, `list` |
| `glade.agents` | `create`, `getSpendPolicy`, `updateSpendPolicy`, `listPendingTransactions`, `approveTransaction`, `rejectTransaction` |
| `glade.webhooks` | `create`, `list`, `delete`, `replay`, `deliveries`, `verifySignature`, `constructEvent` |

All request and response types are exported from the package. Request fields are written in camelCase, and the SDK converts them to the API's snake_case for you. The full REST reference is at [docs.useglade.org](https://docs.useglade.org).

## License

MIT
