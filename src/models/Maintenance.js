const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema(
  {
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
    type: {
      type: String,
      enum: ["routine", "repair", "inspection", "cleaning", "urgent"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["scheduled", "in_progress", "completed", "cancelled"],
      default: "scheduled",
    },
    scheduledDate: Date,
    startDate: Date,
    completedDate: Date,
    estimatedCost: Number,
    actualCost: Number,
    mechanic: String,
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    notes: String,
    partsReplaced: [String],
  },
  { timestamps: true },
);

maintenanceSchema.index({ carId: 1, status: 1 });
maintenanceSchema.index({ status: 1 });
maintenanceSchema.index({ scheduledDate: 1 });

module.exports = mongoose.model("Maintenance", maintenanceSchema);
