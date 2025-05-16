import { useId, useState } from "react";
import iconEyeOpen from "@/assets/icons/ico_eye_open.png";
import iconEyeClose from "@/assets/icons/ico_eye_close.png";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import SigninInput from "./signin-input";

interface SigninInputProps extends React.ComponentProps<"input"> {
  type: "text" | "password";
  label?: string;
  error?: string[] | undefined;
}
const SigninInputContainer = ({ label, type, error, ...props }: SigninInputProps) => {
  const id = useId();
  const [showPassword, setShowPassword] = useState(false);

  // 비밀번호 보기/숨기기 토글 함수
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col pc-g-10">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <SigninInput
          name="email"
          id={id}
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute pc-w-25 pc-h-25 pc-right-16 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {/* <img
              src={showPassword ? iconEyeOpen : iconEyeClose}
              alt="password toggle"
            /> */}
            <Image
              src={showPassword ? iconEyeOpen : iconEyeClose} alt="password toggle" />
          </button>
        )}
      </div>
      {error && <p className="text-red">{error}</p>}
    </div>
  );
};

export default SigninInputContainer;
