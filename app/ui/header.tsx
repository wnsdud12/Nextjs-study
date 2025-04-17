"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Header = () => {
  const [email, setEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/auth/me");
      const data = await res.json();

      if (res.status === 401) {
        // 로그인 안 되어 있으면 리디렉션
        router.push("/");
        return;
      }

      setEmail(data.data?.email || null);
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    const data = await res.json();
  
    if (res.ok) {
      // Access Token 삭제
      localStorage.removeItem("accessToken");
      // 로그아웃 후 리디렉션
      window.location.href = "/";
    } else {
      alert(data.message || "Logout failed");
    }
  };

  return (
    <div className="flex justify-between items-center px-8 py-6 bg-black">
      <Image width={90} height={25} src="/icons/ico_logo.png" alt="logo" />
      <div className="flex items-center gap-2.5">
        <p className="text-white text-base">{email || "이름"}</p>
        <Button className="bg-white text-black" title="로그아웃" onClick={handleLogout}>
          로그아웃
        </Button>
      </div>
    </div>
  );
};

export default Header;
