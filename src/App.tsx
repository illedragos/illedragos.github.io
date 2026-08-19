import { DarkModeProvider } from "./context/DarkModeContext";
import { HackerModeProvider, useHackerMode } from "./context/HackerModeContext";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Hobbies from "./components/Hobbies";
import Footer from "./components/Footer";
import MatrixRain from "./components/MatrixRain";
import ScanlineOverlay from "./components/ScanlineOverlay";

/**
 * In hacker mode the section backgrounds turn transparent (see index.css), so
 * this viewport-fixed rain falls behind the entire page instead of just the hero.
 */
const GlobalRain = () => {
  const { isHackerMode } = useHackerMode();
  if (!isHackerMode) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-0 opacity-40">
      <MatrixRain intensity={1.1} green />
    </div>
  );
};

function App() {
  return (
    <DarkModeProvider>
      <HackerModeProvider>
        <div className="app-shell relative min-h-screen bg-white dark:bg-neutral-900 transition-colors duration-300">
          <GlobalRain />

          <div className="relative z-10">
            <Navigation />
            <main>
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Experience />
              <Education />
              <Hobbies />
            </main>
            <Footer />
          </div>

          <ScanlineOverlay />
        </div>
      </HackerModeProvider>
    </DarkModeProvider>
  );
}

export default App;
