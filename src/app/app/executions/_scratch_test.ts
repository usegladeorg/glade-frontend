import type { SupabaseClient } from "@supabase/supabase-js";

type FixedDatabase = {
  public: {
    Tables: {
      accounts: {
        Row: { id: string; owner_id: string };
        Insert: { id?: string; owner_id: string };
        Update: { id?: string; owner_id?: string };
        Relationships: [];
      };
    };
    Views: {};
    Functions: {};
  };
};

declare const client: SupabaseClient<FixedDatabase>;
async function f() {
  const { data } = await client.from("accounts").select("id");
  console.log(data?.[0]?.id);
}
