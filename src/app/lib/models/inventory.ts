import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  serialNo: {
    type: String,
    required: true,
    unique: true,
  },
  productName: {
    type: String,
    required: true,
  },
  brandName: {
    type: String,
    required: true,
  },
  quantityAvailable: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
  },
  pricePerQuantity: {
    type: Number,
    required: true,
    min: 0,
  },
});

export const Inventory =
  mongoose.models.Inventory || mongoose.model('Inventory', inventorySchema);
