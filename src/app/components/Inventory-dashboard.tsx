"use client";

import { useState, useMemo } from "react";
import { Search, Filter, Download, Plus, ChevronDown } from "lucide-react";
import InventoryTable  from "@/app/components/Inventory-table";
import {AddItemModal} from "@/app/components/Add-item-modal"; // Import the new modal
import { inventoryData as initialInventoryData } from "@/app/lib/mock-data"; // Rename import
import type { InventoryItem } from "@/app/lib/types"; // Import InventoryItem type

export function InventoryDashboard() {
  const [inventoryItems, setInventoryItems] =
    useState<InventoryItem[]>(initialInventoryData); // Use state for inventory data
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [brandFilter, setBrandFilter] = useState("all");
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [brandDropdownOpen, setBrandDropdownOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State for modal visibility

  // Get unique categories and brands for filter options
  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(inventoryItems.map((item) => item.category)),
    ];
    return uniqueCategories.sort();
  }, [inventoryItems]);

  const brands = useMemo(() => {
    const uniqueBrands = [
      ...new Set(inventoryItems.map((item) => item.brandName)),
    ];
    return uniqueBrands.sort();
  }, [inventoryItems]);

  // Filter data based on search term and filters
  const filteredData = useMemo(() => {
    return inventoryItems.filter((item) => {
      const matchesSearch =
        item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === "all" || item.category === categoryFilter;
      const matchesBrand =
        brandFilter === "all" || item.brandName === brandFilter;

      return matchesSearch && matchesCategory && matchesBrand;
    });
  }, [searchTerm, categoryFilter, brandFilter, inventoryItems]);

  const clearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("all");
    setBrandFilter("all");
  };

  const handleAddItem = (newItem: InventoryItem) => {
    // In a real app, you'd send this to your backend API
    // For now, we'll just add it to the local state with a mock ID
    setInventoryItems((prevItems) => [
      ...prevItems,
      {
        ...newItem,
        _id: `mock-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      },
    ]);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Inventory Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage and track your inventory items
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 shadow-sm">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)} // Open modal on click
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md"
            >
              <Plus className="w-4 h-4" />
              Add Item
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-64">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Products
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by product name, brand, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
              />
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="min-w-48 relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <div className="relative">
              <button
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
              >
                <span className="text-gray-900">
                  {categoryFilter === "all" ? "All Categories" : categoryFilter}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              {categoryDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                  <button
                    onClick={() => {
                      setCategoryFilter("all");
                      setCategoryDropdownOpen(false);
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors duration-200"
                  >
                    All Categories
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setCategoryFilter(category);
                        setCategoryDropdownOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors duration-200"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Brand Dropdown */}
          <div className="min-w-48 relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brand
            </label>
            <div className="relative">
              <button
                onClick={() => setBrandDropdownOpen(!brandDropdownOpen)}
                className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
              >
                <span className="text-gray-900">
                  {brandFilter === "all" ? "All Brands" : brandFilter}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              {brandDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                  <button
                    onClick={() => {
                      setBrandFilter("all");
                      setBrandDropdownOpen(false);
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors duration-200"
                  >
                    All Brands
                  </button>
                  {brands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => {
                        setBrandFilter(brand);
                        setBrandDropdownOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors duration-200"
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={clearFilters}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 shadow-sm"
          >
            <Filter className="w-4 h-4" />
            Clear Filters
          </button>
        </div>

        {/* Results Summary */}
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredData.length} of {inventoryItems.length} items
        </div>
      </div>

      {/* Table Container */}
      <div className="flex-1 overflow-hidden">
        <InventoryTable data={filteredData} />
      </div>

      {/* Add Item Modal */}
      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddItem={handleAddItem}
      />
    </div>
  );
}
