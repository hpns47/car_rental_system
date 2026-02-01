const express = require("express");
const { authenticate, authorize } = require("../middleware/auth");
const invoiceController = require("../controllers/invoiceController");

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  invoiceController.createInvoice,
);
router.get(
  "/",
  authenticate,
  authorize(["admin"]),
  invoiceController.getAllInvoices,
);
router.get("/my-invoices", authenticate, invoiceController.getCustomerInvoices);
router.get(
  "/report",
  authenticate,
  authorize(["admin"]),
  invoiceController.getInvoiceReport,
);
router.get("/:id", authenticate, invoiceController.getInvoiceById);
router.patch("/:id/pay", authenticate, invoiceController.markInvoiceAsPaid);

module.exports = router;
