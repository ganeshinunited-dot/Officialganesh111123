import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import About from './components/About';
import Articles from './components/Articles';
import Faq from './components/Faq';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div id="top" className="min-h-screen bg-paper font-serif-body text-ink">
      <Header />
      <main>
        <Hero />
        <Services />
        <Projects />
        <About />
        <Articles />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
