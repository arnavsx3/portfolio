import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import CodingProfiles from "./components/CodingProfiles";
import Socials from "./components/Socials";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-arcade-bg min-h-screen">
      <div className="crt-overlay" />
      <Hero />
      <About />
      <Projects />
      <CodingProfiles />
      <Socials />
      <Footer />
    </div>
  );
}

export default App;
