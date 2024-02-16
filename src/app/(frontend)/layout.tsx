import MobileNavBar from "@/components/common/MobileNavBar";
import Navbar from "@/components/common/Navbar";
import { createClient } from "@/lib/supabase/supabasServer";
import { cookies } from "next/headers";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient(cookies());
  const { data } = await supabase.auth.getSession();
  return (
    <div className="container relative h-screen">
      <MobileNavBar />
      <Navbar user={data?.session?.user!} />
      {children}
    </div>
  );
}
