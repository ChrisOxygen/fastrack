import Link from "next/link";
import Menu from "./Menu";
import CustomButton from "./ui/CustomButton";

function LandingMenuContent() {
  return (
    <>
      <div className="w-full">
        <nav className="w-full">
          <Menu location="mobile" />
        </nav>
      </div>

      <div className={`flex items-center justify-center gap-3`}>
        <CustomButton
          href="/login"
          text="Login"
          iconPosition="left"
          bgColor="green"
          hoverBgColor="orange"
          textColor="white"
        />
        <CustomButton
          href="/signup"
          text="Sign up"
          iconPosition="left"
          bgColor="orange"
          hoverBgColor="green"
          textColor="black"
        />
      </div>
    </>
  );
}

export default LandingMenuContent;
