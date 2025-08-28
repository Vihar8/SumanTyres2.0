import React from "react";
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactsUs = () => {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="mx-auto max-w-3xl px-4 md:px-8 py-8 space-y-8">
        <div className="text-center">
        <h1 className="text-4xl text-gray-800 animate-bounce"><strong>Contact Us</strong></h1>
        <p className="mt-4 text-lg font-semibold text-red-700">Get in touch with our team for any inquiries or support.</p>
        <div className="mx-auto w-24 border-t-2 border-black my-6" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Information Card */}
          <div className="space-y-6 bg-white p-6 duration-300">
            <div className="flex items-center space-x-4">
              <MapPin size={24} className="text-red-800" />
              <div>
                <h2 className="text-xl font-semibold text-black">Address</h2>
                <p className="text-gray-900">Sec 11, Suman Tower, Suman Tyres</p>
                <p className="text-gray-900">Near Cinemax Gandhinagar, Gujarat</p>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center space-x-4">
                <Phone size={24} className="text-red-800" />
                <div>
                  <h2 className="text-xl font-semibold text-black">Phone No</h2>
                  <p className="text-gray-900">
                    <a href="tel:+919426636250" className="hover:text-red-800 text-lg transition-colors duration-300">
                      (+91) 9426636250
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center space-x-4">
                <Mail size={24} className="text-red-800" />
                <div>
                  <h2 className="text-xl font-semibold text-black">Email</h2>
                  <p className="text-gray-900">
                    <a href="mailto:sumantyres@gmail.com" className="hover:text-red-800 text-lg transition-colors duration-300">
                      sumantyres@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Image Container - Improved for mobile */}
          <div className="flex items-center justify-center">
            <div className="w-full h-64 md:h-80 overflow-hidden rounded-lg">
              <img
                src="/assets/sumantyresshop.jpg"
                alt="Company Location"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactsUs;