'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const Login = () => {

  const loginMutate = async (email: string, password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include", // 쿠키를 포함하여 요청
    });
    console.log(res);
    
    if (!res.ok) throw new Error("Login failed");

    const data = await res.json();
    console.log(data.message);
  };
  const handleLogin = () => {
    loginMutate("qwe", "qwe");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card
        className="gap-5 border-none shadow-none"
        style={{ width: "575px" }}
      >
        <div className="flex flex-col gap-2.5">
          <Label>ID</Label>
          <Input placeholder="E-mail을 입력해 주세요." />
        </div>
        <div className="flex flex-col gap-2.5">
          <Label>PW</Label>
          <Input placeholder="비밀번호를 입력해 주세요." />
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              아이디 기억하기
            </label>
          </div>
        </div>
        <Button onClick={handleLogin}>로그인</Button>
      </Card>
    </div>
  );
};

export default Login;
