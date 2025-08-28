import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  ShoppingCart,
  ShipWheel,
} from "lucide-react";
import { tyres } from "../../api/common";

const Tyresss = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allTyres, setAllTyres] = useState([]); // store full list
  const [filteredTyres, setFilteredTyres] = useState([]); // filtered list
  const [selectedFilters, setSelectedFilters] = useState({
    brand: [],
    type: [],
  });
  const [showFilters, setShowFilters] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);

  // Fetch tyres once
  useEffect(() => {
    const fetchTyres = async () => {
      try {
        const response = await tyres({}); // API call
        if (Array.isArray(response)) {
          const activeTyres = response.filter((tyre) => tyre.status === true);
          setAllTyres(activeTyres);
          setFilteredTyres(activeTyres);
        }
      } catch (err) {
        console.error("Error fetching tyres:", err);
      }
    };
    fetchTyres();
  }, []);

  // Extract unique brands and types from all tyres
  const brands = [...new Set(allTyres.map((product) => product.brand))];
  const types = [...new Set(allTyres.map((product) => product.type))];

  // Handle search input change
  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    applyFilters(value, selectedFilters);
  };

  // Toggle filter selection
  const toggleFilter = (filterType, value) => {
    setSelectedFilters((prev) => {
      const updatedFilters = { ...prev };
      if (updatedFilters[filterType].includes(value)) {
        updatedFilters[filterType] = updatedFilters[filterType].filter(
          (item) => item !== value
        );
      } else {
        updatedFilters[filterType] = [...updatedFilters[filterType], value];
      }
      return updatedFilters;
    });
  };

  // Apply both search and filters
  const applyFilters = (search, filters) => {
    let filtered = [...allTyres]; // start with full list

    if (search) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(search) ||
          product.size?.width?.toString().includes(search) ||
          product.size?.height?.toString().includes(search) ||
          product.size?.radius?.toString().includes(search) ||
          product.brand.toLowerCase().includes(search)
      );
    }

    if (filters.brand.length > 0) {
      filtered = filtered.filter((product) =>
        filters.brand.includes(product.brand)
      );
    }

    if (filters.type.length > 0) {
      filtered = filtered.filter((product) =>
        filters.type.includes(product.type)
      );
    }

    setFilteredTyres(filtered);
  };

  // Re-apply filters when selectedFilters change
  useEffect(() => {
    applyFilters(searchTerm, selectedFilters);
  }, [selectedFilters]);

  return (
    <div className="bg-gray-50">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <ShipWheel className="h-8 w-8" />
            <h1 className="text-4xl font-bold">Premium Tyres Collection</h1>
          </div>
          <p className="text-xl mb-6">
            Find the perfect tyre for your vehicle from top brands
          </p>

          {/* Search bar */}
          <div className="relative max-w-lg">
            <input
              type="text"
              placeholder="Search by tyre name, size or brand..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full bg-white text-gray-800 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <Search
              className="absolute left-3 top-3.5 text-gray-500"
              size={18}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filter section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Our Tyre Products
            </h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <Filter size={18} />
              Filters
              {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>

          {showFilters && (
            <div className="bg-white p-4 rounded-lg shadow-md mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Brand filters */}
              <div>
                <h3 className="font-semibold mb-3 text-gray-700">Brands</h3>
                <div className="flex flex-wrap gap-2">
                  {brands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => toggleFilter("brand", brand)}
                      className={`px-3 py-1.5 rounded-full text-sm ${
                        selectedFilters.brand.includes(brand)
                          ? "bg-blue-100 text-blue-800 border border-blue-300"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent"
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>

              {/* Type filters */}
              <div>
                <h3 className="font-semibold mb-3 text-gray-700">
                  Vehicle Type
                </h3>
                <div className="flex flex-wrap gap-2">
                  {types.map((type) => (
                    <button
                      key={type}
                      onClick={() => toggleFilter("type", type)}
                      className={`px-3 py-1.5 rounded-full text-sm ${
                        selectedFilters.type.includes(type)
                          ? "bg-blue-100 text-blue-800 border border-blue-300"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Results count */}
          <p className="text-gray-600 mb-4">
            Showing {filteredTyres.length} products
          </p>
        </div>

        {/* Products grid */}
        {filteredTyres.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredTyres.map((product) => (
              <div
                key={product._id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden transition duration-300 hover:shadow-lg"
                onMouseEnter={() => setActiveProduct(product._id)}
                onMouseLeave={() => setActiveProduct(null)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end transition-opacity duration-300 ${
                      activeProduct === product._id
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  >
                    <button className="m-3 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 hover:bg-blue-700 transition">
                      <ShoppingCart size={16} />
                      Enquire Now
                    </button>
                  </div>
                  <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {product.brand}
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex items-center mb-1">
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded mr-2">
                      {product.type}
                    </span>
                  </div>
                  <h3 className="font-medium text-gray-800 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 font-mono">
                    {product.size?.width} / {product.size?.height} R
                    {product.size?.radius}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No tyres found matching your search criteria.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedFilters({ brand: [], type: [] });
                setFilteredTyres(allTyres); // reset to all
              }}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tyresss;
