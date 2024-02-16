import MobileNavBar from "@/components/common/MobileNavBar";
import Navbar from "@/components/common/Navbar";
import { createClient } from "@/lib/supabase/supabasServer";
import { cookies } from "next/headers";
export default async function FrontEndLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient(cookies());
  const { data } = await supabase.auth.getSession();
  return (
    <div className="p-2 md:container relative h-screen">
      <MobileNavBar />
      <Navbar user={data?.session?.user!} />
      <div className="flex flex-col items-center h-full">
        <div className="w-full lg:w-2/5">{children}</div>
      </div>
    </div>
  );
}
