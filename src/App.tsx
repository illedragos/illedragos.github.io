import { DarkModeProvider } from "./context/DarkModeContext";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Hobbies from "./components/Hobbies";
import Footer from "./components/Footer";

function App() {
  return (
    <DarkModeProvider>
      <div className="min-h-screen bg-white dark:bg-neutral-900 transition-colors duration-300">
        <Navigation />
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Hobbies />
        </main>
        <Footer />
      </div>
    </DarkModeProvider>
  );
}

export default App;
