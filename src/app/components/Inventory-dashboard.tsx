"use client"

import { useState, useMemo } from "react"
import { Search, Filter, Download, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { InventoryTable } from "@/components/inventory-table"
import { inventoryData } from "@/lib/mock-data"

export function InventoryDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [brandFilter, setBrandFilter] = useState("all")

  // Get unique categories and brands for filter options
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(inventoryData.map((item) => item.category))]
    return uniqueCategories.sort()
  }, [])

  const brands = useMemo(() => {
    const uniqueBrands = [...new Set(inventoryData.map((item) => item.brandName))]
    return uniqueBrands.sort()
  }, [])

  // Filter data based on search term and filters
  const filteredData = useMemo(() => {
    return inventoryData.filter((item) => {
      const matchesSearch =
        item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
      const matchesBrand = brandFilter === "all" || item.brandName === brandFilter

      return matchesSearch && matchesCategory && matchesBrand
    })
  }, [searchTerm, categoryFilter, brandFilter])

  const clearFilters = () => {
    setSearchTerm("")
    setCategoryFilter("all")
    setBrandFilter("all")
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
            <p className="text-gray-600">Manage and track your inventory items</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2 bg-transparent">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4" />
              Add Item
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-64">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Products</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by product name, brand, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="min-w-48">
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="min-w-48">
            <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
            <Select value={brandFilter} onValueChange={setBrandFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Brands" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Brands</SelectItem>
                {brands.map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" onClick={clearFilters} className="gap-2 bg-transparent">
            <Filter className="w-4 h-4" />
            Clear Filters
          </Button>
        </div>

        {/* Results Summary */}
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredData.length} of {inventoryData.length} items
        </div>
      </div>

      {/* Table Container */}
      <div className="flex-1 overflow-hidden">
        <InventoryTable data={filteredData} />
      </div>
    </div>
  )
}
