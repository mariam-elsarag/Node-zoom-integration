const Hero = () => {
  return (
    <div className="hero w-full object-cover h-[200px] md:h-[250px] lg:h-[280px] rounded-2xl">
      <header className="py-5 sm:py-9 pl-5 sm:pl-10 h-full flex flex-col justify-between">
        <div className="bg-white/5 w-fit py-2.5 px-3.5 rounded-sm">
          <span>Upcoming Meeting at:</span>
        </div>
        <div className="flex flex-col gap-2.5">
          <strong className="text-white font-bold text-3xl md:text-5xl">
            {new Date().toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </strong>
          <p className="text-blue-50 text-sm sm:text-base">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </header>
    </div>
  );
};

export default Hero;
