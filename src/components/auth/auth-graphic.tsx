
export function AuthGraphic() {
  return (
    <div className="relative hidden h-full w-full items-center justify-center overflow-hidden bg-primary-gradient p-4 text-white md:p-10 lg:flex">
      <div className="absolute inset-0 bg-black/20" />

      {/* Abstract shapes */}
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/5 animate-float md:h-96 md:w-96" />
      <div className="absolute -bottom-32 -right-12 h-72 w-72 rounded-full bg-white/5 animate-float [animation-delay:-3s] md:h-96 md:w-96" />
      
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="mb-4 flex h-56 w-56 items-center justify-center rounded-full bg-white/10 p-4 shadow-2xl backdrop-blur-md sm:h-60 sm:w-60 md:mb-8 md:h-72 md:w-72 md:p-8">
            <div className="text-center text-white/90">
                <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl mb-4">Vibe Trail</h1>
                 <p className="font-light leading-relaxed text-xs sm:text-sm md:text-base">
                    From Vibe to Vision Instantly Animated.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}
