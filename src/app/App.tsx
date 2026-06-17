import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Forum } from "./components/Forum";
import { ReportCase } from "./components/ReportCase";
import { News } from "./components/News";
import { Stats } from "./components/Stats";
import { Causes } from "./components/Causes";
import { RegisterForm } from "./components/RegisterForm";
import { About } from "./components/About";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    /* MARKER-MAKE-KIT-INVOKED */
    <div
      style={{
        fontFamily: "Inter, sans-serif",
        scrollBehavior: "smooth",
      }}
    >
      <Navbar />
      <Hero />
      <Forum />
      <ReportCase />
      <Causes />
      <News />
      <Stats />
      <About />
      <RegisterForm />
      <Footer />
    </div>
  );
}
