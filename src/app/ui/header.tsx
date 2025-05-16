"use client";
import { Button } from "@/src/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInsstance";

const Header = () => {
  const [email, setEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/api/auth/me");
        const data = res.data;

        if (res.status === 401) {
          // 로그인 안 되어 있으면 리디렉션
          router.push("/");
          return;
        }

        setEmail(data.data?.email || null);
      } catch (error) {
        console.error("Error fetching user", error);
        router.push("/");
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    try {
      const res = await axiosInstance.post(
        "/api/auth/logout",
        {},
      );

      if (res.status === 200) {
        // refresh Token 삭제
        localStorage.removeItem("refreshToken");
        // 로그아웃 후 리디렉션
        window.location.href = "/";
      } else {
        alert(res.data.message || "Logout failed");
      }
    } catch (error) {
      console.error("Error during logout", error);
      alert("An error occurred while logging out.");
    }
  };

  return (
    <div className="flex justify-between items-center px-8 py-6 bg-black">
      <Image width={90} height={25} src="/icons/ico_logo.png" alt="logo" />
      <div className="flex items-center gap-2.5">
        <p className="text-white text-base">{email || "이름"}</p>
        <Button
          className="bg-white text-black"
          title="로그아웃"
          onClick={handleLogout}
        >
          로그아웃
        </Button>
      </div>
    </div>
  );
};

export default Header;
