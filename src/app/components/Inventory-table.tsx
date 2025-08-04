"use client"

import { useState } from "react"
import { ChevronUp, ChevronDown, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

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

export function InventoryTable({ data }: InventoryTableProps) {
  const [sortField, setSortField] = useState<SortField>("serialNo")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")

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
    if (quantity === 0) return { label: "Out of Stock", variant: "destructive" as const }
    if (quantity < 10) return { label: "Low Stock", variant: "secondary" as const }
    return { label: "In Stock", variant: "default" as const }
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null
    return sortDirection === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
  }

  return (
    <div className="bg-white h-full flex flex-col">
      <div className="flex-1 overflow-auto">
        <Table>
          <TableHeader className="sticky top-0 bg-gray-50 z-10">
            <TableRow>
              <TableHead
                className="cursor-pointer hover:bg-gray-100 select-none"
                onClick={() => handleSort("serialNo")}
              >
                <div className="flex items-center gap-2">
                  Serial No
                  <SortIcon field="serialNo" />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-gray-100 select-none"
                onClick={() => handleSort("productName")}
              >
                <div className="flex items-center gap-2">
                  Product Name
                  <SortIcon field="productName" />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-gray-100 select-none"
                onClick={() => handleSort("brandName")}
              >
                <div className="flex items-center gap-2">
                  Brand Name
                  <SortIcon field="brandName" />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-gray-100 select-none"
                onClick={() => handleSort("quantityAvailable")}
              >
                <div className="flex items-center gap-2">
                  Quantity Available
                  <SortIcon field="quantityAvailable" />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-gray-100 select-none"
                onClick={() => handleSort("category")}
              >
                <div className="flex items-center gap-2">
                  Category
                  <SortIcon field="category" />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-gray-100 select-none"
                onClick={() => handleSort("pricePerQuantity")}
              >
                <div className="flex items-center gap-2">
                  Price per Quantity
                  <SortIcon field="pricePerQuantity" />
                </div>
              </TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((item) => {
              const stockStatus = getStockStatus(item.quantityAvailable)
              return (
                <TableRow key={item.serialNo} className="hover:bg-gray-50">
                  <TableCell className="font-mono text-sm">{item.serialNo}</TableCell>
                  <TableCell className="font-medium">{item.productName}</TableCell>
                  <TableCell>{item.brandName}</TableCell>
                  <TableCell className="text-center">
                    <span
                      className={`font-medium ${
                        item.quantityAvailable === 0
                          ? "text-red-600"
                          : item.quantityAvailable < 10
                            ? "text-orange-600"
                            : "text-green-600"
                      }`}
                    >
                      {item.quantityAvailable}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.category}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">${item.pricePerQuantity.toFixed(2)}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={stockStatus.variant}>{stockStatus.label}</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2">
                          <Eye className="w-4 h-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Edit className="w-4 h-4" />
                          Edit Item
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-red-600">
                          <Trash2 className="w-4 h-4" />
                          Delete Item
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      {sortedData.length === 0 && (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          <div className="text-center">
            <p className="text-lg font-medium">No items found</p>
            <p className="text-sm">Try adjusting your search or filter criteria</p>
          </div>
        </div>
      )}
    </div>
  )
}
