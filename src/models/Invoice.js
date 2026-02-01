const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    rentalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rental",
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    invoiceNumber: {
      type: String,
      unique: true,
      required: true,
    },
    carDetails: {
      make: String,
      model: String,
      licensePlate: String,
    },
    rentalPeriod: {
      startDate: Date,
      endDate: Date,
    },
    itemizedCharges: [
      {
        description: String,
        amount: Number,
        quantity: Number,
      },
    ],
    subtotal: Number,
    tax: Number,
    totalAmount: Number,
    amountPaid: {
      type: Number,
      default: 0,
    },
    remainingBalance: Number,
    issueDate: {
      type: Date,
      default: Date.now,
    },
    dueDate: Date,
    paymentDate: Date,
    status: {
      type: String,
      enum: ["draft", "issued", "paid", "overdue", "cancelled"],
      default: "draft",
    },
  },
  { timestamps: true },
);

invoiceSchema.index({ invoiceNumber: 1 });
invoiceSchema.index({ customerId: 1 });
invoiceSchema.index({ rentalId: 1 });
invoiceSchema.index({ status: 1 });

module.exports = mongoose.model("Invoice", invoiceSchema);
