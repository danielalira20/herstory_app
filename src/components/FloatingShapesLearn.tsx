const FloatingShapesLearn = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large gradient orbs */}
      <div 
        className="absolute top-20 left-[10%] w-72 h-72 rounded-full bg-pink-400/20 blur-3xl animate-float"
        style={{ animationDelay: '0s' }}
      />
      <div 
        className="absolute top-40 right-[15%] w-96 h-96 rounded-full bg-fuchsia-400/15 blur-3xl animate-float-slow"
        style={{ animationDelay: '2s' }}
      />
      <div 
        className="absolute bottom-40 left-[20%] w-80 h-80 rounded-full bg-rose-400/20 blur-3xl animate-float"
        style={{ animationDelay: '4s' }}
      />

      {/* Smaller accent shapes */}
      <div 
        className="absolute top-1/4 right-[25%] w-24 h-24 rounded-full border border-pink-400/20 animate-float"
        style={{ animationDelay: '1s' }}
      />
      <div 
        className="absolute top-1/3 left-[30%] w-16 h-16 rounded-full border border-fuchsia-300/15 animate-float-slow"
        style={{ animationDelay: '3s' }}
      />
      <div 
        className="absolute bottom-1/3 right-[10%] w-20 h-20 rounded-full bg-pink-400/10 animate-pulse-glow"
      />

      {/* Abstract geometric shapes */}
      <div 
        className="absolute top-[15%] left-[5%] w-32 h-32 rotate-45 border border-pink-500/10 rounded-2xl animate-float-slow"
        style={{ animationDelay: '1.5s' }}
      />
      <div 
        className="absolute bottom-[20%] right-[5%] w-40 h-40 rotate-12 border border-fuchsia-400/10 rounded-3xl animate-float"
        style={{ animationDelay: '2.5s' }}
      />

      {/* Faint silhouettes at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-pink-200/20 to-transparent" />
      <svg
        className="absolute bottom-0 left-0 right-0 w-full h-32 opacity-[0.03]"
        viewBox="0 0 1200 200"
        preserveAspectRatio="xMidYMax slice"
      >
        <ellipse cx="200" cy="200" rx="60" ry="100" fill="currentColor" />
        <ellipse cx="350" cy="200" rx="50" ry="90" fill="currentColor" />
        <ellipse cx="480" cy="200" rx="55" ry="95" fill="currentColor" />
        <ellipse cx="620" cy="200" rx="45" ry="85" fill="currentColor" />
        <ellipse cx="750" cy="200" rx="58" ry="98" fill="currentColor" />
        <ellipse cx="880" cy="200" rx="52" ry="92" fill="currentColor" />
        <ellipse cx="1000" cy="200" rx="48" ry="88" fill="currentColor" />
      </svg>
    </div>
  );
};

export default FloatingShapesLearn;