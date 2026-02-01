require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/database");
const errorHandler = require("./src/middleware/errorHandler");

const authRoutes = require("./src/routes/authRoutes");
const carRoutes = require("./src/routes/carRoutes");
const rentalRoutes = require("./src/routes/rentalRoutes");
const invoiceRoutes = require("./src/routes/invoiceRoutes");
const maintenanceRoutes = require("./src/routes/maintenanceRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/rentals", rentalRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/maintenance", maintenanceRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
