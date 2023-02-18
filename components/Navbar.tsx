import Image from "next/image";
import React from "react";
import { Avatar } from "antd";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="shadow fixed inset-x-0 top-0 px-6 py-4 z-20 bg-white flex justify-between">
      <Link href="/">
        <Image width={30} height={30} src="/vercel.png" alt="logo" />
      </Link>

      <div className="flex gap-10 items-center">
        <Link href="/posts">
          <p className="font-bold text-lg hover:underline">Posts</p>
        </Link>
        <Avatar size={30}>U</Avatar>
      </div>
    </div>
  );
};

export default Navbar;
