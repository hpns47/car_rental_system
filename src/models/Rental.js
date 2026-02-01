const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    pickupLocation: {
      branch: String,
      coordinates: {
        latitude: Number,
        longitude: Number,
      },
    },
    dropoffLocation: {
      branch: String,
      coordinates: {
        latitude: Number,
        longitude: Number,
      },
    },
    status: {
      type: String,
      enum: ["booked", "ongoing", "completed", "cancelled"],
      default: "booked",
    },
    dailyRate: {
      type: Number,
      required: true,
    },
    totalDays: Number,
    basePrice: Number,
    additionalCharges: [
      {
        description: String,
        amount: Number,
      },
    ],
    insuranceSelected: {
      type: String,
      enum: ["basic", "standard", "premium"],
      required: true,
    },
    insuranceCost: Number,
    totalPrice: Number,
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["credit_card", "debit_card", "bank_transfer"],
    },
    damagesToReport: [
      {
        description: String,
        images: [String],
        estimatedCost: Number,
        reportedDate: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    damageCharge: Number,
    finalMileage: Number,
    notes: String,
    cancelledAt: Date,
    cancelReason: String,
    rating: {
      score: Number,
      comment: String,
      ratedDate: Date,
    },
  },
  { timestamps: true },
);

rentalSchema.index({ customerId: 1, status: 1 });
rentalSchema.index({ carId: 1, status: 1 });
rentalSchema.index({ startDate: 1, endDate: 1 });
rentalSchema.index({ status: 1 });
rentalSchema.index({ paymentStatus: 1 });

module.exports = mongoose.model("Rental", rentalSchema);
