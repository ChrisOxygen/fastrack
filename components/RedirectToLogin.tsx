import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const RedirectToLogin = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 1) {
          clearInterval(timer);
          router.push("/login");
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <p className="-mt-3 max-w-[400px] text-center text-siteText">
      Redirecting to login page in {countdown}...
    </p>
  );
};

export default RedirectToLogin;
