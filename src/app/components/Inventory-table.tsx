"use client"

import { useState } from "react"
import { ChevronUp, ChevronDown, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"

interface InventoryItem {
  serialNo: string
  productName: string
  brandName: string
  quantityAvailable: number
  category: string
  pricePerQuantity: number
}

interface InventoryTableProps {
  data: InventoryItem[]
}

type SortField = keyof InventoryItem
type SortDirection = "asc" | "desc"

export default function InventoryTable({ data }: InventoryTableProps) {
  const [sortField, setSortField] = useState<SortField>("serialNo")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    }

    return 0
  })

  const getStockStatus = (quantity: number) => {
    if (quantity === 0) return { label: "Out of Stock", className: "bg-red-100 text-red-800 border-red-200" }
    if (quantity < 10) return { label: "Low Stock", className: "bg-yellow-100 text-yellow-800 border-yellow-200" }
    return { label: "In Stock", className: "bg-green-100 text-green-800 border-green-200" }
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null
    return sortDirection === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
  }

  return (
    <div className="bg-white h-full flex flex-col">
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className="sticky top-0 bg-gray-50 z-10 border-b border-gray-200">
            <tr>
              <th
                className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none transition-colors duration-200"
                onClick={() => handleSort("serialNo")}
              >
                <div className="flex items-center gap-2">
                  Serial No
                  <SortIcon field="serialNo" />
                </div>
              </th>
              <th
                className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none transition-colors duration-200"
                onClick={() => handleSort("productName")}
              >
                <div className="flex items-center gap-2">
                  Product Name
                  <SortIcon field="productName" />
                </div>
              </th>
              <th
                className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none transition-colors duration-200"
                onClick={() => handleSort("brandName")}
              >
                <div className="flex items-center gap-2">
                  Brand Name
                  <SortIcon field="brandName" />
                </div>
              </th>
              <th
                className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none transition-colors duration-200"
                onClick={() => handleSort("quantityAvailable")}
              >
                <div className="flex items-center justify-center gap-2">
                  Quantity Available
                  <SortIcon field="quantityAvailable" />
                </div>
              </th>
              <th
                className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none transition-colors duration-200"
                onClick={() => handleSort("category")}
              >
                <div className="flex items-center gap-2">
                  Category
                  <SortIcon field="category" />
                </div>
              </th>
              <th
                className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none transition-colors duration-200"
                onClick={() => handleSort("pricePerQuantity")}
              >
                <div className="flex items-center gap-2">
                  Price per Quantity
                  <SortIcon field="pricePerQuantity" />
                </div>
              </th>
              <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.map((item) => {
              const stockStatus = getStockStatus(item.quantityAvailable)
              return (
                <tr key={item.serialNo} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">{item.serialNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.productName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.brandName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span
                      className={`text-sm font-medium ${
                        item.quantityAvailable === 0
                          ? "text-red-600"
                          : item.quantityAvailable < 10
                            ? "text-yellow-600"
                            : "text-green-600"
                      }`}
                    >
                      {item.quantityAvailable}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full border border-gray-200">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${item.pricePerQuantity.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${stockStatus.className}`}
                    >
                      {stockStatus.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center relative">
                    <button
                      onClick={() => setOpenDropdown(openDropdown === item.serialNo ? null : item.serialNo)}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                    {openDropdown === item.serialNo && (
                      <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                        <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                        <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                          <Edit className="w-4 h-4" />
                          Edit Item
                        </button>
                        <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200">
                          <Trash2 className="w-4 h-4" />
                          Delete Item
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {sortedData.length === 0 && (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          <div className="text-center">
            <p className="text-lg font-medium">No items found</p>
            <p className="text-sm mt-1">Try adjusting your search or filter criteria</p>
          </div>
        </div>
      )}
    </div>
  )
}
