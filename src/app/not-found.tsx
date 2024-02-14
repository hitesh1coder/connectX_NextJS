"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function notFound() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <Image src="/images/404.svg" alt="404-img" width={300} height={300} />
      <Link href="/">
        <Button>Go Home</Button>
      </Link>
    </div>
  );
}
