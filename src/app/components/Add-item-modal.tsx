"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { InventoryItem } from "@/app/lib/types";

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (item: InventoryItem) => void;
}

export function AddItemModal({
  isOpen,
  onClose,
  onAddItem,
}: AddItemModalProps) {
  const [formData, setFormData] = useState<InventoryItem>({
    serialNo: "",
    productName: "",
    brandName: "",
    quantityAvailable: 0,
    category: "",
    pricePerQuantity: 0,
  });

  useEffect(() => {
    if (!isOpen) {
      // Reset form data when modal closes
      setFormData({
        serialNo: "",
        productName: "",
        brandName: "",
        quantityAvailable: 0,
        category: "",
        pricePerQuantity: 0,
      });
    }
  }, [isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "quantityAvailable" || name === "pricePerQuantity"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Error adding item:", data.error || res.statusText);
        alert(data.error || "Failed to add item.");
        return;
      }

      console.log("Item added:", data);
      onAddItem(data); // Update mock/local state
      onClose();
    } catch (error) {
      console.error("Request failed:", error);
      alert("An unexpected error occurred.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative animate-fade-in-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Add New Inventory Item
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="serialNo"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Serial No.
            </label>
            <input
              type="text"
              id="serialNo"
              name="serialNo"
              value={formData.serialNo}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
            />
          </div>
          <div>
            <label
              htmlFor="productName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
            />
          </div>
          <div>
            <label
              htmlFor="brandName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Brand Name
            </label>
            <input
              type="text"
              id="brandName"
              name="brandName"
              value={formData.brandName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
            />
          </div>
          <div>
            <label
              htmlFor="quantityAvailable"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Quantity Available
            </label>
            <input
              type="number"
              id="quantityAvailable"
              name="quantityAvailable"
              value={formData.quantityAvailable}
              onChange={handleChange}
              required
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
            />
          </div>
          <div>
            <label
              htmlFor="pricePerQuantity"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Price per Quantity
            </label>
            <input
              type="number"
              id="pricePerQuantity"
              name="pricePerQuantity"
              value={formData.pricePerQuantity}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 shadow-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
