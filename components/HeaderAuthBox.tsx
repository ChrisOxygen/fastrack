import Link from "next/link";
import CustomButton from "./ui/CustomButton";
import { AiOutlineUser } from "react-icons/ai";
import { useSession } from "next-auth/react";

function HeaderAuthBox() {
  const { data: session } = useSession();
  return (
    <div className="flex items-center justify-center gap-3">
      {session ? (
        <CustomButton
          href="/dashboard"
          text="Dashboard"
          iconPosition="left"
          bgColor="green"
          hoverBgColor="orange"
          textColor="white"
          icon={<AiOutlineUser />}
        />
      ) : (
        <CustomButton
          href="/login"
          text="Login"
          iconPosition="left"
          bgColor="green"
          hoverBgColor="orange"
          textColor="white"
          icon={<AiOutlineUser />}
        />
      )}
    </div>
  );
}

export default HeaderAuthBox;
