import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import FeaturedCars from '../components/FeaturedCars';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-dark-blue-gray text-light-gray">
      <Header />
      <main className="flex-grow">
        <Hero />
        <FeaturedCars />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}

export default Landing;