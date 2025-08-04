import { NextResponse } from "next/server";
import { connectToDB } from "@/app/lib/db";
import { Inventory } from "@/app/lib/models/inventory";

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

    // Basic validation
    if (
      !serialNo ||
      !productName ||
      !brandName ||
      quantityAvailable == null ||
      !category ||
      pricePerQuantity == null
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const existing = await Inventory.findOne({ serialNo });
    if (existing) {
      return NextResponse.json(
        { error: "Item with this serial number already exists" },
        { status: 409 }
      );
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
    console.error("Error adding inventory:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
