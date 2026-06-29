import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Education from './components/Education';
import Research from './components/Research';
import Projects from './components/Projects';
import CTA from './components/CTA';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider>
      <Header />
      <main>
        <Hero />
        <Education />
        <Research />
        <Projects />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
