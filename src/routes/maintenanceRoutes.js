const express = require("express");
const { authenticate, authorize } = require("../middleware/auth");
const maintenanceController = require("../controllers/maintenanceController");

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  maintenanceController.scheduleMaintenance,
);
router.get(
  "/",
  authenticate,
  authorize(["admin"]),
  maintenanceController.getAllMaintenance,
);
router.get(
  "/schedule",
  authenticate,
  authorize(["admin"]),
  maintenanceController.getMaintenanceSchedule,
);
router.get(
  "/costs",
  authenticate,
  authorize(["admin"]),
  maintenanceController.getMaintenanceCosts,
);
router.get(
  "/:id",
  authenticate,
  authorize(["admin"]),
  maintenanceController.getMaintenanceById,
);
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  maintenanceController.updateMaintenanceStatus,
);

module.exports = router;
