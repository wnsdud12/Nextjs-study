"use client";

import React, { useState } from "react";
import SigninInputContainer from "./signin-input-container";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInsstance";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const SigninForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // 클라이언트 로그인 요청 (로그인 함수)
  const login = async () => {
    setPending(true);
    setError(null);

    try {
      const res = await axiosInstance.post(
        "/api/auth/signin",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = res.data;

      if (res.status === 200) {
        // 로그인 성공 시 Access Token을 클라이언트에 저장
        console.log(res);

        const newToken = res.headers["authorization"];
        localStorage.setItem("refreshToken", newToken.replace("Bearer ", ""));
        // 리디렉션 또는 기타 후속 처리를 여기에 추가
        router.replace("/home");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error: unknown) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ||
            "An error occurred. Please try again.",
        );
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
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
      <div className="pc-w-575 pc-g-20 flex flex-col border-none shadow-none">
        <SigninInputContainer
          type="text"
          placeholder="E-mail을 입력해 주세요."
          label="ID"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <SigninInputContainer
          type="password"
          placeholder="비밀번호를 입력해 주세요."
          label="PW"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex items-center space-x-2">
          <Checkbox id="saveEmail" />
          <label htmlFor="saveEmail">자동 로그인</label>
        </div>
        <Button aria-disabled={pending} type="submit">
          로그인
        </Button>
      </div>

      {error && (
        <div className="mt-2 text-red-500">
          {error} {/* 오류 메시지 표시 */}
        </div>
      )}
    </form>
  );
};

export default SigninForm;
