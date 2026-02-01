const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "customer"],
      default: "customer",
    },
    licenseNumber: {
      type: String,
      required: true,
      unique: true,
    },
    licenseExpiry: Date,
    address: {
      street: String,
      city: String,
      zipCode: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    totalRentals: {
      type: Number,
      default: 0,
    },
    ratings: [
      {
        rentalId: mongoose.Schema.Types.ObjectId,
        score: Number,
        comment: String,
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true },
);

userSchema.index({ email: 1 });
userSchema.index({ licenseNumber: 1 });

module.exports = mongoose.model("User", userSchema);
