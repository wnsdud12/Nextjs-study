import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import React, { useActionState } from 'react'
import { signin } from '../action/auth/signin'
import { Checkbox } from '@/components/ui/checkbox'
import SigninInput from './signin-input'

const SigninForm = () => {
  const [state, action, pending] = useActionState(signin, undefined)
 
  return (
    <form action={action}>
        <Card
          className="gap-5 border-none shadow-none"
          style={{ width: "575px" }}
        >
          <SigninInput 
            placeholder="E-mail을 입력해 주세요."
            label="ID"
            error={state?.errors?.email}
          /> 
          <SigninInput 
            type="password"
            placeholder="비밀번호를 입력해 주세요."
            label="PW"
            error={state?.errors?.password}
          />
          <div className="flex items-center space-x-2">
              <Checkbox id="saveEmail" />
              <label htmlFor="saveEmail">아이디 기억하기</label>
            </div>
          <Button aria-disabled={pending} type="submit">
            로그인
          </Button>
        </Card>
      </form>
  )
}

export default SigninForm