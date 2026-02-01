const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    make: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    licensePlate: {
      type: String,
      required: true,
      unique: true,
    },
    vin: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      enum: ["economy", "comfort", "luxury", "suv", "van"],
      required: true,
    },
    dailyRate: {
      type: Number,
      required: true,
    },
    seats: {
      type: Number,
      required: true,
    },
    transmission: {
      type: String,
      enum: ["manual", "automatic"],
      required: true,
    },
    fuelType: {
      type: String,
      enum: ["petrol", "diesel", "hybrid", "electric"],
      required: true,
    },
    mileage: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["available", "rented", "maintenance"],
      default: "available",
    },
    location: {
      branch: String,
      coordinates: {
        latitude: Number,
        longitude: Number,
      },
    },
    features: [String],
    images: [String],
    insuranceType: {
      type: String,
      enum: ["basic", "standard", "premium"],
    },
    maintenanceHistory: [
      {
        date: Date,
        description: String,
        cost: Number,
      },
    ],
    documents: {
      registrationExpiry: Date,
      insuranceExpiry: Date,
      inspectionExpiry: Date,
    },
    totalRentals: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

carSchema.index({ licensePlate: 1 });
carSchema.index({ status: 1, category: 1 });
carSchema.index({ "location.branch": 1 });
carSchema.index({ dailyRate: 1 });

module.exports = mongoose.model("Car", carSchema);
