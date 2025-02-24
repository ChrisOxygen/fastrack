import Link from "next/link";
import Menu from "./Menu";
import CustomButton from "./ui/CustomButton";

type LandingMenuContentProps = {
  handleMenuToggle: () => void;
};

function LandingMenuContent({ handleMenuToggle }: LandingMenuContentProps) {
  return (
    <>
      <div className="w-full">
        <nav className="w-full">
          <Menu handleMenuToggle={handleMenuToggle} location="mobile" />
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
