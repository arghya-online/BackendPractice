import mongoose from "mongoose";

//This is a mini schema model for structuruing ther order items in the order model, just a mini model to make the task easier
const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  postalCode: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
});

//This is the main model for the order
const orderSchema = new mongoose.Schema({
  orderPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderItems: [orderItemSchema],
  address: {
    type: addressSchema,
    ref: "Address",
    required: true,
  },
  status: {
    type: String,
    enum: ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"],
    default: "PENDING",
  },
});

export const Order = mongoose.model("Order", orderSchema);
