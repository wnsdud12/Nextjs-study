import { useId, useState } from "react";
import iconEyeOpen from "@/assets/icons/ico_eye_open.png";
import iconEyeClose from "@/assets/icons/ico_eye_close.png";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface SigninInputProps extends React.ComponentProps<"input"> {
  type: "text" | "password";
  label?: string;
  error?: string[] | undefined;
}
const SigninInput = ({ label, type, error, ...props }: SigninInputProps) => {
  const id = useId();
  const [showPassword, setShowPassword] = useState(false);

  // 비밀번호 보기/숨기기 토글 함수
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-2.5">
      <Label htmlFor={id}>{label}</Label>
      <Input
        name="email"
        id={id}
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        {...props}
      />
      {type === "password" && (
        <button
          type="button"
          // className={cx("toggle__password")}
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
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default SigninInput;
