"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import SigninInput from "./signin-input";

const SigninForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 클라이언트 로그인 요청 (로그인 함수)
  const login = async () => {
    setPending(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // 로그인 성공 시 Access Token을 클라이언트에 저장
        localStorage.setItem("accessToken", data.accessToken);
        // 리디렉션 또는 기타 후속 처리를 여기에 추가
        window.location.href = "/home";
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setPending(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        login();
      }}
    >
      <Card
        className="gap-5 border-none shadow-none"
        style={{ width: "575px" }}
      >
        <SigninInput
          placeholder="E-mail을 입력해 주세요."
          label="ID"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <SigninInput
          type="password"
          placeholder="비밀번호를 입력해 주세요."
          label="PW"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex items-center space-x-2">
          <Checkbox id="saveEmail" />
          <label htmlFor="saveEmail">아이디 기억하기</label>
        </div>
        <Button aria-disabled={pending} type="submit">
          로그인
        </Button>
      </Card>

      {error && (
        <div className="text-red-500 mt-2">
          {error} {/* 오류 메시지 표시 */}
        </div>
      )}
    </form>
  );
};

export default SigninForm;
