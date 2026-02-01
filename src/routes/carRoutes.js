const express = require("express");
const { authenticate, authorize } = require("../middleware/auth");
const carController = require("../controllers/carController");

const router = express.Router();

router.post("/", authenticate, authorize(["admin"]), carController.createCar);
router.get("/", carController.getAllCars);
router.get("/available", carController.getAvailableCars);
router.get("/:id", carController.getCarById);
router.put("/:id", authenticate, authorize(["admin"]), carController.updateCar);
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  carController.deleteCar,
);

module.exports = router;
