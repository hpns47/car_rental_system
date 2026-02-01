const express = require("express");
const { authenticate, authorize } = require("../middleware/auth");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);

router.get("/profile", authenticate, authController.getProfile);
router.put("/profile", authenticate, authController.updateProfile);

router.get(
  "/users",
  authenticate,
  authorize(["admin"]),
  authController.getAllUsers,
);
router.get("/users/:id", authenticate, authController.getUserById);
router.delete(
  "/users/:id",
  authenticate,
  authorize(["admin"]),
  authController.deleteUser,
);

module.exports = router;
