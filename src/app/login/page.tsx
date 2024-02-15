import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginUser from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import Image from "next/image";

export default function Login() {
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col mt-8">
      <Image src="/images/logo_512.png" alt="404-img" width={80} height={100} />
      <h2 className="text-xl font-bold">ConnectX</h2>
      <Tabs defaultValue="login" className=" w-full md:w-[500px]">
        <TabsList className="grid w-full  grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginUser />
        </TabsContent>
        <TabsContent value="register">
          <Register />
        </TabsContent>
      </Tabs>
    </div>
  );
}
