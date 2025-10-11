import Link from 'next/link';
import { ArrowUpRight, Mail, Phone, MapPin, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: 'Social Media Management', href: '#services' },
      { name: 'Influencer Marketing', href: '#services' },
      { name: 'Hoardings & Offline Marketing', href: '#services' },
      { name: 'Performance Marketing', href: '#services' },
      { name: 'Website/SEO Development', href: '#services' },
      { name: 'Event Curation/B2B', href: '#services' },
    ],
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Our Work', href: '#portfolio' },
      { name: 'Contact', href: '#contact' },
      { name: 'Industries', href: '#about' },
      { name: 'Case Studies', href: '#portfolio' },
    ],
    industries: [
      { name: 'F&B', href: '#portfolio' },
      { name: 'Hospitality', href: '#portfolio' },
      { name: 'Healthcare', href: '#portfolio' },
      { name: 'Fashion', href: '#portfolio' },
      { name: 'Finance', href: '#portfolio' },
      { name: 'Utility/Stores', href: '#portfolio' },
    ]
  };

  const contactInfo = [
    { icon: MapPin, text: 'Porvorim, Goa' },
    { icon: Mail, text: 'ino.erayaexp@gmail.com' },
    { icon: Phone, text: '+91 9272166475' },
    { icon: Instagram, text: '@Erayaexperience' },
  ];

  return (
    <footer className="bg-eraya-navy text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full filter blur-3xl"></div>
      
      <div className="container-modern py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Company Info */}
          <div className="lg:col-span-5">
            <Link href="/" className="text-3xl font-medium text-white mb-2 block hover:opacity-80 transition-opacity duration-300">
              ERAYA
            </Link>
            <div className="text-sm font-light tracking-widest text-white/60 mb-8">EXPERIENCE</div>
            
            <p className="text-white/70 font-light leading-relaxed mb-8 max-w-md text-lg">
              We help brands grow with social media management and influencer marketing that boost visibility. 
              From creative campaigns to ROI-driven results.
            </p>
            
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center text-white/60 hover:text-white transition-colors duration-300">
                  <item.icon className="w-5 h-5 mr-4 flex-shrink-0" />
                  <span className="font-light">{item.text}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10">
              <h3 className="text-xl font-medium text-white mb-3">Ready to boost your brand?</h3>
              <p className="text-white/70 font-light mb-6">Let's create something amazing together.</p>
              <Link
                href="#contact"
                className="inline-flex items-center px-6 py-3 bg-eraya-beige text-eraya-navy rounded-xl font-medium hover:bg-eraya-beige/90 transition-all duration-300 group"
              >
                Start your project
                <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h3 className="font-medium text-white mb-6 text-lg">Services</h3>
            <ul className="space-y-4">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-white/60 font-light hover:text-white transition-colors duration-300 group flex items-center"
                  >
                    {link.name}
                    <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h3 className="font-medium text-white mb-6 text-lg">Company</h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-white/60 font-light hover:text-white transition-colors duration-300 group flex items-center"
                  >
                    {link.name}
                    <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div className="lg:col-span-3">
            <h3 className="font-medium text-white mb-6 text-lg">Industries</h3>
            <ul className="space-y-4 mb-8">
              {footerLinks.industries.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-white/60 font-light hover:text-white transition-colors duration-300 group flex items-center"
                  >
                    {link.name}
                    <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Newsletter */}
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <h4 className="font-medium text-white mb-3">Stay updated</h4>
              <p className="text-white/60 font-light text-sm mb-4">Get the latest marketing insights.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-l-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors duration-300"
                />
                <button className="px-4 py-2 bg-eraya-beige text-eraya-navy rounded-r-lg hover:bg-eraya-beige/90 transition-colors duration-300">
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/50 text-sm font-light">
              © {currentYear} Eraya Experience. All rights reserved.
            </p>
            <div className="flex items-center mt-4 md:mt-0">
              <p className="text-white/50 text-sm font-light mr-6">
                Crafted with ❤️ in Goa
              </p>
              <div className="flex space-x-4">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white/50 text-sm font-light">All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;