"use client";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black bg-[url(/images/hero-mobile-poster.jpg)] bg-cover bg-center lg:bg-[url(/images/hero-desktop-poster.jpg)]">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/hero-desktop.mp4" type="video/mp4" media="(min-width: 1024px)" />
        <source src="/videos/hero-mobile.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-transparent h-1/4" />
    </section>
  );
};

export default HeroSection;
