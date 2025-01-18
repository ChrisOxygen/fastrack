function AboutHeader() {
  return (
    <main
      className="relative z-10 mt-16 h-[15rem] bg-cover bg-center sm:mt-[4.5rem] sm:h-[20rem]"
      style={{
        backgroundImage: 'url("assets/pages-header-bgg1.jpg")',
      }}
    >
      <div
        className="absolute inset-0 -z-50 sm:px-16"
        style={{
          background: "linear-gradient(90deg, #004838 0%, #FFB000 1100%)",
          opacity: 0.8, // Set overall opacity of the gradient
        }}
      >
        <div className="flex h-[15rem] flex-col items-center justify-center gap-6 text-white sm:h-[25rem] sm:justify-end sm:pb-40 md:items-start">
          <h2 className="text-4xl sm:text-5xl">About Us</h2>
          <div className="flex w-fit items-center gap-3 rounded-full border-[1px] border-white border-opacity-20 px-6 py-2 text-sm font-light text-white text-opacity-50 sm:text-[16px]">
            <h3>Home</h3>
            <span>&#62;</span>
            <h3 className="text-white">About Us</h3>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AboutHeader;
