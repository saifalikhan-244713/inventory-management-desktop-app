import { NextResponse } from "next/server";
import { connectToDB } from "@/app/lib/db";
import { Inventory } from "@/app/lib/models/inventory";

// GET: fetch inventory items
export async function GET() {
  try {
    await connectToDB();
    const items = await Inventory.find().sort({ createdAt: -1 });
    return NextResponse.json(items);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch inventory" }, { status: 500 });
  }
}

// POST: add new inventory item
export async function POST(req: Request) {
  try {
    await connectToDB();
    const body = await req.json();

    const {
      serialNo,
      productName,
      brandName,
      quantityAvailable,
      category,
      pricePerQuantity,
    } = body;

    if (
      !serialNo ||
      !productName ||
      !brandName ||
      quantityAvailable == null ||
      !category ||
      pricePerQuantity == null
    ) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const existing = await Inventory.findOne({ serialNo });
    if (existing) {
      return NextResponse.json({ error: "Item with this serial number already exists" }, { status: 409 });
    }

    const item = await Inventory.create({
      serialNo,
      productName,
      brandName,
      quantityAvailable,
      category,
      pricePerQuantity,
    });

    return NextResponse.json(item, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
