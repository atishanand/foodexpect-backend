import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    hNo: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    pinCode: {
      type: Number,
      required: true,
    },
    phoneNo: {
      type: Number,
      required: true,
    },
  },

  orderedItems: {
    burger: {
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
    pizza: {
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
    milkshake: {
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
    thali: {
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
    softdrink: {
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
    chowmein: {
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

  paymentMethod: {
    type: String,
    enum: ["COD", "Online"],
    default: "COD",
  },

  itemsPrice: {
    type: Number,
    default: 0,
  },

  taxPrice: {
    type: Number,
    default: 0,
  },

  shippingCharge: {
    type: Number,
    default: 0,
  },

  totalAmount: {
    type: Number,
    default: 0,
  },

  orderStatus: {
    type: String,
    enum: ["Preparing", "Shipped", "Delivered"],
    default: "Preparing",
  },

  deliveredAt: Date,

  createdAt: {
    type: Date,
    default: new Date(Date.now()),
  },
});

export const Order = mongoose.model("Order", orderSchema);
