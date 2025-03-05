import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'


interface SigninInputProps extends React.ComponentProps<"input"> {
  label?: string;
  error?: string[] | undefined;
}
const SigninInput = ({
  label,
  error,
  ...props
}: SigninInputProps) => {
  return (
    <div className="flex flex-col gap-2.5">
    <Label>{label}</Label>
    <Input name="email" {...props} />
    {error && (
      <p className="text-red-500">{error}</p>
    )}
  </div>
  )
}

export default SigninInput;
