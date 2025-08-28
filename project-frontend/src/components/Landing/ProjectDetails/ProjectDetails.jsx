import React, { useState, useEffect } from "react";

function DealershipShowcase() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [animatedBrands, setAnimatedBrands] = useState([]);
  
  const brands = [
    { src: "/assets/ceatlogo.jpg", alt: "Ceat", category: "tyre" },
    { src: "/assets/michelinlogo.jpg", alt: "Michelin", category: "tyre" },
    { src: "/assets/bridgestonelogo.jpg", alt: "Bridgestone", category: "tyre" },
    { src: "/assets/apollologo.jpeg", alt: "Apollo", category: "tyre" },
    { src: "/assets/jklogo.png", alt: "JK Tyre", category: "tyre" },
    { src: "/assets/shelllogo.jpeg", alt: "Shell", category: "oil" },
    { src: "/assets/castrollogo.jpeg", alt: "Castrol", category: "oil" },
    { src: "/assets/repsollogo.jpg", alt: "Repsol", category: "oil" },
    { src: "/assets/servologo.jpg", alt: "Servo", category: "oil" },
    { src: "/assets/amaronlogo.jpg", alt: "Amaron", category: "battery" },
    { src: "/assets/exidelogo.jpeg", alt: "Exide", category: "battery" },
    { src: "/assets/eloficlogo.jpeg", alt: "Elofic", category: "filter" },
  ];

  // Animation for brands appearing sequentially
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedBrands(brands.map((_, i) => i));
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Filter brands based on selected category
  const filteredBrands = activeCategory === "all" 
    ? brands 
    : brands.filter(brand => brand.category === activeCategory);

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section header with accent decoration */}
        <div className="relative mb-12 text-center">
          <h2 className="text-4xl font-bold mt-6 text-gray-800">Our Brand Partners</h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            We partner with the world's leading brands to provide you with top-quality automotive products.
          </p>
        </div>

        {/* Category filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {["all", "tyre", "oil", "battery", "filter"].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category === "all" ? "All Brands" : category.charAt(0).toUpperCase() + category.slice(1) + "s"}
            </button>
          ))}
        </div>

        {/* Brands grid with staggered animation */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {filteredBrands.map((brand, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg p-4 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center ${
                animatedBrands.includes(index) ? "opacity-100" : "opacity-0"
              }`}
              style={{ 
                transitionDelay: `${index * 50}ms`,
                transitionProperty: "opacity, transform, box-shadow"
              }}
            >
              <div className="relative group w-full h-24 flex items-center justify-center">
                <img
                  src={brand.src}
                  alt={brand.alt}
                  title={brand.alt}
                  className="h-16 max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-16 flex flex-col items-center">
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-2">
              <div className="bg-green-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm text-gray-700">Authorized Dealer </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-green-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm text-gray-700">Warranty Support</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-green-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm text-gray-700">Expert Advice</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DealershipShowcase;