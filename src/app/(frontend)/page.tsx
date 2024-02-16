import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/supabasServer";
import { cookies } from "next/headers";

export default async function Home() {
  const supabase = createClient(cookies());
  const { data } = await supabase.auth.getSession();
  return <div></div>;
}
