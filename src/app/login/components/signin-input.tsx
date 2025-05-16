import { Input } from "@/components/ui/input";
import React from "react";

function SigninInput({
  type,
  ...props
}: React.ComponentProps<"input">) {
  return <Input type={type} className="pc-py-16 pc-px-16 pc-h-54" {...props} />;
}

export default SigninInput;
