import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between items-center px-8 py-6 bg-black">
      <Image width={90} height={25} src="/icons/ico_logo.png" alt="logo" />
      <div className="flex items-center gap-2.5">
        <p className="text-white text-base">이름</p>
        <Button className="bg-white text-black" title="로그아웃">로그아웃</Button>
      </div>
    </div>
  );
};

export default Header;
