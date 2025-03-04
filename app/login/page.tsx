"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useActionState } from "react";
import { signin } from "../action/auth/signin";
import { Label } from "@/components/ui/label";

const Login = () => {
  const [state, action, pending] = useActionState(signin, undefined);

  return (
    <div className="flex justify-center items-center h-screen">
      <form action={action}>
        <Card
          className="gap-5 border-none shadow-none"
          style={{ width: "575px" }}
        >
          <div className="flex flex-col gap-2.5">
            <Label>ID</Label>
            <Input name="email" placeholder="E-mail을 입력해 주세요." />
            {state?.errors?.email && (
              <div className="text-red-500">{state.errors.email}</div>
            )}
          </div>
          <div className="flex flex-col gap-2.5">
            <Label>PW</Label>
            <Input
              name="password"
              placeholder="비밀번호를 입력해 주세요."
              type="password"
            />
            {state?.errors?.password && (
              <div className="text-red-500">{state.errors.password}</div>
            )}
          </div>
          {/* <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label htmlFor="terms">아이디 기억하기</label>
            </div> */}
          <Button aria-disabled={pending} type="submit">
            로그인
          </Button>
        </Card>
      </form>
    </div>
  );
};

export default Login;
