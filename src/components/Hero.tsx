import React, { useEffect, useState } from "react";

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // AI Neural Network Animation - Dynamic network with moving connections
  const AIBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 dark:opacity-30">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Gradient for connections */}
          <linearGradient
            id="neuralGradient1"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient
            id="neuralGradient2"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.8" />
          </linearGradient>

          {/* Glow filter for neurons */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Animated connection lines */}
        <line
          x1="12"
          y1="18"
          x2="38"
          y2="12"
          stroke="url(#neuralGradient1)"
          strokeWidth="0.2"
          strokeOpacity="0.3"
          filter="url(#glow)"
        >
          <animate
            attributeName="x1"
            values="12;14;12"
            dur="8s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y1"
            values="18;20;18"
            dur="7s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-opacity"
            values="0.1;0.5;0.1"
            dur="2s"
            repeatCount="indefinite"
          />
        </line>
        <line
          x1="18"
          y1="35"
          x2="42"
          y2="28"
          stroke="url(#neuralGradient1)"
          strokeWidth="0.2"
          strokeOpacity="0.3"
          filter="url(#glow)"
        >
          <animate
            attributeName="x1"
            values="18;16;18"
            dur="9s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y1"
            values="35;37;35"
            dur="8s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-opacity"
            values="0.1;0.5;0.1"
            dur="2.5s"
            repeatCount="indefinite"
            begin="0.2s"
          />
        </line>
        <line
          x1="10"
          y1="52"
          x2="35"
          y2="45"
          stroke="url(#neuralGradient1)"
          strokeWidth="0.2"
          strokeOpacity="0.3"
          filter="url(#glow)"
        >
          <animate
            attributeName="x1"
            values="10;12;10"
            dur="10s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y1"
            values="52;50;52"
            dur="9s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-opacity"
            values="0.1;0.5;0.1"
            dur="2.2s"
            repeatCount="indefinite"
            begin="0.4s"
          />
        </line>
        <line
          x1="15"
          y1="68"
          x2="40"
          y2="62"
          stroke="url(#neuralGradient1)"
          strokeWidth="0.2"
          strokeOpacity="0.3"
          filter="url(#glow)"
        >
          <animate
            attributeName="x1"
            values="15;17;15"
            dur="7s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y1"
            values="68;66;68"
            dur="8s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-opacity"
            values="0.1;0.5;0.1"
            dur="2.8s"
            repeatCount="indefinite"
            begin="0.1s"
          />
        </line>
        <line
          x1="20"
          y1="85"
          x2="45"
          y2="78"
          stroke="url(#neuralGradient1)"
          strokeWidth="0.2"
          strokeOpacity="0.3"
          filter="url(#glow)"
        >
          <animate
            attributeName="x1"
            values="20;18;20"
            dur="8.5s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y1"
            values="85;83;85"
            dur="7.5s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-opacity"
            values="0.1;0.5;0.1"
            dur="2.4s"
            repeatCount="indefinite"
            begin="0.3s"
          />
        </line>

        {/* Middle connections */}
        <line
          x1="38"
          y1="12"
          x2="62"
          y2="22"
          stroke="url(#neuralGradient2)"
          strokeWidth="0.2"
          strokeOpacity="0.3"
          filter="url(#glow)"
        >
          <animate
            attributeName="stroke-opacity"
            values="0.1;0.5;0.1"
            dur="2.1s"
            repeatCount="indefinite"
            begin="0.6s"
          />
        </line>
        <line
          x1="42"
          y1="28"
          x2="68"
          y2="38"
          stroke="url(#neuralGradient2)"
          strokeWidth="0.2"
          strokeOpacity="0.3"
          filter="url(#glow)"
        >
          <animate
            attributeName="stroke-opacity"
            values="0.1;0.5;0.1"
            dur="2.4s"
            repeatCount="indefinite"
            begin="0.3s"
          />
        </line>
        <line
          x1="35"
          y1="45"
          x2="60"
          y2="55"
          stroke="url(#neuralGradient2)"
          strokeWidth="0.2"
          strokeOpacity="0.3"
          filter="url(#glow)"
        >
          <animate
            attributeName="stroke-opacity"
            values="0.1;0.5;0.1"
            dur="2.9s"
            repeatCount="indefinite"
          />
        </line>
        <line
          x1="40"
          y1="62"
          x2="65"
          y2="72"
          stroke="url(#neuralGradient2)"
          strokeWidth="0.2"
          strokeOpacity="0.3"
          filter="url(#glow)"
        >
          <animate
            attributeName="stroke-opacity"
            values="0.1;0.5;0.1"
            dur="2.3s"
            repeatCount="indefinite"
            begin="0.4s"
          />
        </line>

        {/* Output connections */}
        <line
          x1="62"
          y1="22"
          x2="88"
          y2="30"
          stroke="url(#neuralGradient1)"
          strokeWidth="0.2"
          strokeOpacity="0.3"
          filter="url(#glow)"
        >
          <animate
            attributeName="x1"
            values="62;64;62"
            dur="6.5s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y1"
            values="22;20;22"
            dur="7.2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-opacity"
            values="0.1;0.5;0.1"
            dur="2.7s"
            repeatCount="indefinite"
            begin="0.3s"
          />
        </line>
        <line
          x1="68"
          y1="38"
          x2="85"
          y2="48"
          stroke="url(#neuralGradient1)"
          strokeWidth="0.2"
          strokeOpacity="0.3"
          filter="url(#glow)"
        >
          <animate
            attributeName="x2"
            values="85;87;85"
            dur="8.1s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y2"
            values="48;46;48"
            dur="6.8s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-opacity"
            values="0.1;0.5;0.1"
            dur="2.1s"
            repeatCount="indefinite"
            begin="0.6s"
          />
        </line>
        <line
          x1="60"
          y1="55"
          x2="85"
          y2="48"
          stroke="url(#neuralGradient1)"
          strokeWidth="0.2"
          strokeOpacity="0.3"
          filter="url(#glow)"
        >
          <animate
            attributeName="x1"
            values="60;58;60"
            dur="7.7s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y1"
            values="55;53;55"
            dur="6.3s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-opacity"
            values="0.1;0.5;0.1"
            dur="2.9s"
            repeatCount="indefinite"
            begin="0.2s"
          />
        </line>
        <line
          x1="65"
          y1="72"
          x2="90"
          y2="65"
          stroke="url(#neuralGradient1)"
          strokeWidth="0.2"
          strokeOpacity="0.3"
          filter="url(#glow)"
        >
          <animate
            attributeName="x2"
            values="90;92;90"
            dur="8.9s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y2"
            values="65;63;65"
            dur="7.6s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-opacity"
            values="0.1;0.5;0.1"
            dur="2.5s"
            repeatCount="indefinite"
            begin="0.4s"
          />
        </line>

        {/* Additional diagonal connections with movement */}
        <line
          x1="15"
          y1="50"
          x2="65"
          y2="38"
          stroke="url(#neuralGradient1)"
          strokeWidth="0.15"
          strokeOpacity="0.2"
          filter="url(#glow)"
        >
          <animate
            attributeName="x1"
            values="15;13;15"
            dur="9.2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y1"
            values="50;48;50"
            dur="8.4s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-opacity"
            values="0.1;0.4;0.1"
            dur="3.1s"
            repeatCount="indefinite"
            begin="0.5s"
          />
        </line>
        <line
          x1="20"
          y1="65"
          x2="62"
          y2="55"
          stroke="url(#neuralGradient2)"
          strokeWidth="0.15"
          strokeOpacity="0.2"
          filter="url(#glow)"
        >
          <animate
            attributeName="x2"
            values="62;64;62"
            dur="7.8s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y2"
            values="55;53;55"
            dur="8.7s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-opacity"
            values="0.1;0.4;0.1"
            dur="2.6s"
            repeatCount="indefinite"
            begin="0.7s"
          />
        </line>
        <line
          x1="40"
          y1="15"
          x2="85"
          y2="30"
          stroke="url(#neuralGradient1)"
          strokeWidth="0.15"
          strokeOpacity="0.2"
          filter="url(#glow)"
        >
          <animate
            attributeName="x1"
            values="40;42;40"
            dur="6.9s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y1"
            values="15;13;15"
            dur="7.4s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-opacity"
            values="0.1;0.4;0.1"
            dur="2.8s"
            repeatCount="indefinite"
            begin="0.2s"
          />
        </line>
        <line
          x1="42"
          y1="75"
          x2="88"
          y2="65"
          stroke="url(#neuralGradient2)"
          strokeWidth="0.15"
          strokeOpacity="0.2"
          filter="url(#glow)"
        >
          <animate
            attributeName="x2"
            values="88;90;88"
            dur="8.3s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y2"
            values="65;67;65"
            dur="7.1s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-opacity"
            values="0.1;0.4;0.1"
            dur="3.3s"
            repeatCount="indefinite"
            begin="0.4s"
          />
        </line>

        {/* Cross connections with subtle movement */}
        <line
          x1="18"
          y1="25"
          x2="60"
          y2="72"
          stroke="url(#neuralGradient1)"
          strokeWidth="0.1"
          strokeOpacity="0.15"
          filter="url(#glow)"
        >
          <animate
            attributeName="x1"
            values="18;16;18"
            dur="9.7s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y1"
            values="25;27;25"
            dur="8.2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-opacity"
            values="0.05;0.3;0.05"
            dur="3.5s"
            repeatCount="indefinite"
            begin="0.8s"
          />
        </line>
        <line
          x1="12"
          y1="80"
          x2="68"
          y2="22"
          stroke="url(#neuralGradient2)"
          strokeWidth="0.1"
          strokeOpacity="0.15"
          filter="url(#glow)"
        >
          <animate
            attributeName="x2"
            values="68;70;68"
            dur="10.1s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y2"
            values="22;20;22"
            dur="9.5s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-opacity"
            values="0.05;0.3;0.05"
            dur="3.8s"
            repeatCount="indefinite"
            begin="0.3s"
          />
        </line>
        <line
          x1="35"
          y1="12"
          x2="90"
          y2="70"
          stroke="url(#neuralGradient1)"
          strokeWidth="0.1"
          strokeOpacity="0.15"
          filter="url(#glow)"
        >
          <animate
            attributeName="x1"
            values="35;37;35"
            dur="8.6s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y1"
            values="12;14;12"
            dur="9.3s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-opacity"
            values="0.05;0.3;0.05"
            dur="4.1s"
            repeatCount="indefinite"
            begin="0.6s"
          />
        </line>

        {/* Small data packets flowing through network */}
        <circle r="0.5" fill="#0ea5e9" filter="url(#glow)">
          <animateMotion
            dur="6s"
            repeatCount="indefinite"
            path="M 12,18 L 38,12 L 62,22 L 88,30"
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            dur="6s"
            repeatCount="indefinite"
          />
        </circle>
        <circle r="0.5" fill="#22c55e" filter="url(#glow)">
          <animateMotion
            dur="7s"
            repeatCount="indefinite"
            begin="1s"
            path="M 18,35 L 42,28 L 68,38 L 85,48"
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            dur="7s"
            repeatCount="indefinite"
            begin="1s"
          />
        </circle>
        <circle r="0.5" fill="#0ea5e9" filter="url(#glow)">
          <animateMotion
            dur="6.5s"
            repeatCount="indefinite"
            begin="2s"
            path="M 10,52 L 35,45 L 60,55 L 85,48"
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            dur="6.5s"
            repeatCount="indefinite"
            begin="2s"
          />
        </circle>
        <circle r="0.5" fill="#22c55e" filter="url(#glow)">
          <animateMotion
            dur="7.5s"
            repeatCount="indefinite"
            begin="0.5s"
            path="M 15,68 L 40,62 L 65,72 L 90,65"
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            dur="7.5s"
            repeatCount="indefinite"
            begin="0.5s"
          />
        </circle>
        <circle r="0.5" fill="#0ea5e9" filter="url(#glow)">
          <animateMotion
            dur="8s"
            repeatCount="indefinite"
            begin="1.5s"
            path="M 20,85 L 45,78 L 65,72 L 90,65"
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            dur="8s"
            repeatCount="indefinite"
            begin="1.5s"
          />
        </circle>

        {/* Additional data packets with varied paths */}
        <circle r="0.4" fill="#22c55e" filter="url(#glow)">
          <animateMotion
            dur="9s"
            repeatCount="indefinite"
            begin="2.5s"
            path="M 15,50 L 42,45 L 68,55 L 88,48"
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            dur="9s"
            repeatCount="indefinite"
            begin="2.5s"
          />
        </circle>
        <circle r="0.4" fill="#0ea5e9" filter="url(#glow)">
          <animateMotion
            dur="7.8s"
            repeatCount="indefinite"
            begin="3s"
            path="M 18,25 L 40,18 L 65,28 L 90,35"
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            dur="7.8s"
            repeatCount="indefinite"
            begin="3s"
          />
        </circle>
        <circle r="0.4" fill="#22c55e" filter="url(#glow)">
          <animateMotion
            dur="8.5s"
            repeatCount="indefinite"
            begin="0.8s"
            path="M 12,75 L 38,68 L 62,72 L 85,65"
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            dur="8.5s"
            repeatCount="indefinite"
            begin="0.8s"
          />
        </circle>
        <circle r="0.45" fill="#0ea5e9" filter="url(#glow)">
          <animateMotion
            dur="6.8s"
            repeatCount="indefinite"
            begin="1.8s"
            path="M 10,40 L 35,35 L 68,45 L 90,52"
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            dur="6.8s"
            repeatCount="indefinite"
            begin="1.8s"
          />
        </circle>
        <circle r="0.45" fill="#22c55e" filter="url(#glow)">
          <animateMotion
            dur="7.2s"
            repeatCount="indefinite"
            begin="2.8s"
            path="M 20,60 L 45,55 L 70,62 L 88,58"
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            dur="7.2s"
            repeatCount="indefinite"
            begin="2.8s"
          />
        </circle>
      </svg>
    </div>
  );

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center section-padding relative"
    >
      <AIBackground />

      <div className="container-max text-center">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="relative z-10">
            <p className="text-primary-600 dark:text-primary-400 font-medium text-lg mb-4 tracking-wide transition-colors">
              Hello, I'm
            </p>

            <h1 className="text-5xl md:text-7xl font-bold text-neutral-900 dark:text-white mb-6 leading-tight transition-colors">
              Dragos Ille
            </h1>

            <h2 className="text-2xl md:text-3xl text-neutral-600 dark:text-neutral-100 mb-8 font-light transition-colors">
              Full-Stack Developer
            </h2>

            <p className="text-lg text-neutral-500 dark:text-neutral-300 max-w-2xl mx-auto mb-12 leading-relaxed transition-colors">
              Crafting elegant digital experiences with 4+ years of expertise in
              modern web technologies. Passionate about building scalable
              solutions that make a difference.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#about" className="btn-primary group">
                <span className="group-hover:translate-x-1 transition-transform inline-block">
                  Get to know me
                </span>
              </a>
              <a href="#experience" className="btn-secondary group">
                <span className="group-hover:translate-x-1 transition-transform inline-block">
                  View my work
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-neutral-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
