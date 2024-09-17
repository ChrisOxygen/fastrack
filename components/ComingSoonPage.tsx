import Link from "next/link";

function ComingSoonPage() {
  return (
    <div className="grid h-full min-h-[500px] w-full place-items-center">
      <div className="flex h-full max-h-[400px] w-full max-w-[400px] flex-col items-center justify-center gap-3 rounded-2xl border border-siteHeadingDark/25 px-7 py-6 text-siteHeadingDark">
        <div className="flex flex-col items-center gap-1 text-center">
          <span className="font-syne text-2xl font-bold">Coming Soon</span>
          <span className="font-dm_sans text-sm">
            we are working on this feature
          </span>
          <Link
            href="/dashboard"
            className="mt-4 grid w-full place-items-center rounded-xl bg-siteGreen px-6 py-3 font-dm_sans text-lg font-bold text-white"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ComingSoonPage;
