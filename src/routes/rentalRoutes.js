const express = require("express");
const { authenticate, authorize } = require("../middleware/auth");
const rentalController = require("../controllers/rentalController");

const router = express.Router();

router.post("/", authenticate, rentalController.createRental);
router.get(
  "/",
  authenticate,
  authorize(["admin"]),
  rentalController.getAllRentals,
);
router.get("/my-rentals", authenticate, rentalController.getCustomerRentals);
router.get(
  "/stats",
  authenticate,
  authorize(["admin"]),
  rentalController.getRentalStats,
);
router.get("/:id", authenticate, rentalController.getRentalById);
router.patch(
  "/:id/status",
  authenticate,
  authorize(["admin"]),
  rentalController.updateRentalStatus,
);
router.patch("/:id/cancel", authenticate, rentalController.cancelRental);
router.post("/:id/rate", authenticate, rentalController.rateRental);

module.exports = router;
