import Link from "next/link";
import CustomButton from "./ui/CustomButton";
import { AiOutlineUser } from "react-icons/ai";

function HeaderAuthBox() {
  return (
    <div className="flex items-center justify-center gap-3">
      <CustomButton
        href="/login"
        text="Login"
        iconPosition="left"
        bgColor="green"
        hoverBgColor="orange"
        textColor="white"
        icon={<AiOutlineUser />}
      />
    </div>
  );
}

export default HeaderAuthBox;
