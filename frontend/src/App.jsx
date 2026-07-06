import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Research from './components/Research';
import Projects from './components/Projects';
import CTA from './components/CTA';
import QuoteOfDay from './components/QuoteOfDay';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider>
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Education />
        <Research />
        <Projects />
        <CTA />
        <QuoteOfDay />
        <Contact />
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
