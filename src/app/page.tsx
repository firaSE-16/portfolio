import Hero from '@/sections/Hero';
import SciFiUI from '@/components/SciFiUI';
import About from '@/sections/About';
import Project from '@/sections/Project';
import Service from '@/sections/Service';
import Contact from '@/sections/Contact';
import {Poppins} from 'next/font/google'

export const poppins = Poppins({
  subsets:['latin'],
  weight:['400','600']
})
export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <Hero />
      <About/>
      <Project/>
      <Service/>
      <Contact/>
      
     
     
    </main>
  );
}