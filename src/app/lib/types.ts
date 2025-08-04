export interface InventoryItem {
  _id?: string // MongoDB will add this
  serialNo: string
  productName: string
  brandName: string
  quantityAvailable: number
  category: string
  pricePerQuantity: number
}
