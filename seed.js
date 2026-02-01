const mongoose = require("mongoose");
require("dotenv").config();

const Car = require("./src/models/Car");

const sampleCars = [
  {
    make: "Toyota",
    model: "Corolla",
    year: 2023,
    licensePlate: "ABC-001",
    vin: "VIN001TOYOTA2023",
    category: "economy",
    dailyRate: 35,
    seats: 5,
    transmission: "automatic",
    fuelType: "petrol",
    mileage: 5000,
    status: "available",
    location: {
      branch: "Downtown",
      coordinates: { latitude: 40.7128, longitude: -74.006 },
    },
    features: ["Air Conditioning", "Power Windows", "Bluetooth"],
    images: [
      "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500&q=80",
    ],
    insuranceType: "basic",
    documents: {
      registrationExpiry: new Date("2025-12-31"),
      insuranceExpiry: new Date("2025-12-31"),
      inspectionExpiry: new Date("2025-06-30"),
    },
    totalRentals: 15,
    averageRating: 4.2,
  },
  {
    make: "Honda",
    model: "Civic",
    year: 2023,
    licensePlate: "ABC-002",
    vin: "VIN002HONDA2023",
    category: "economy",
    dailyRate: 38,
    seats: 5,
    transmission: "automatic",
    fuelType: "petrol",
    mileage: 3200,
    status: "available",
    location: {
      branch: "Downtown",
      coordinates: { latitude: 40.7128, longitude: -74.006 },
    },
    features: ["Air Conditioning", "Cruise Control", "USB Charging"],
    images: [
      "https://images.unsplash.com/photo-1590362891990-f8023e937390?w=500&q=80",
    ],
    insuranceType: "standard",
    documents: {
      registrationExpiry: new Date("2025-12-31"),
      insuranceExpiry: new Date("2025-12-31"),
      inspectionExpiry: new Date("2025-06-30"),
    },
    totalRentals: 22,
    averageRating: 4.5,
  },
  {
    make: "BMW",
    model: "X5",
    year: 2024,
    licensePlate: "ABC-003",
    vin: "VIN003BMW2024",
    category: "luxury",
    dailyRate: 120,
    seats: 7,
    transmission: "automatic",
    fuelType: "diesel",
    mileage: 1000,
    status: "available",
    location: {
      branch: "Airport",
      coordinates: { latitude: 40.7769, longitude: -73.874 },
    },
    features: [
      "Leather Seats",
      "Premium Sound System",
      "Panoramic Sunroof",
      "GPS Navigation",
    ],
    images: [
      "https://images.unsplash.com/photo-1619405399517-d4af1d4a01ce?w=500&q=80",
    ],
    insuranceType: "premium",
    documents: {
      registrationExpiry: new Date("2026-12-31"),
      insuranceExpiry: new Date("2026-12-31"),
      inspectionExpiry: new Date("2026-06-30"),
    },
    totalRentals: 8,
    averageRating: 4.8,
  },
  {
    make: "Toyota",
    model: "RAV4",
    year: 2023,
    licensePlate: "ABC-004",
    vin: "VIN004TOYOTA2023",
    category: "suv",
    dailyRate: 65,
    seats: 5,
    transmission: "automatic",
    fuelType: "hybrid",
    mileage: 4500,
    status: "available",
    location: {
      branch: "Downtown",
      coordinates: { latitude: 40.7128, longitude: -74.006 },
    },
    features: [
      "All-Wheel Drive",
      "Apple CarPlay",
      "Backup Camera",
      "Heated Seats",
    ],
    images: [
      "https://images.unsplash.com/photo-1605559424843-9e4c3ca4b7d1?w=500&q=80",
    ],
    insuranceType: "standard",
    documents: {
      registrationExpiry: new Date("2025-12-31"),
      insuranceExpiry: new Date("2025-12-31"),
      inspectionExpiry: new Date("2025-06-30"),
    },
    totalRentals: 18,
    averageRating: 4.6,
  },
  {
    make: "Mercedes",
    model: "C-Class",
    year: 2024,
    licensePlate: "ABC-005",
    vin: "VIN005MERC2024",
    category: "luxury",
    dailyRate: 110,
    seats: 5,
    transmission: "automatic",
    fuelType: "diesel",
    mileage: 800,
    status: "available",
    location: {
      branch: "Airport",
      coordinates: { latitude: 40.7769, longitude: -73.874 },
    },
    features: [
      "Leather Interior",
      "360 Camera",
      "Adaptive Cruise",
      "Premium Audio",
    ],
    images: [
      "https://images.unsplash.com/photo-1606611093246-8e6140f84180?w=500&q=80",
    ],
    insuranceType: "premium",
    documents: {
      registrationExpiry: new Date("2026-12-31"),
      insuranceExpiry: new Date("2026-12-31"),
      inspectionExpiry: new Date("2026-06-30"),
    },
    totalRentals: 12,
    averageRating: 4.7,
  },
  {
    make: "Hyundai",
    model: "Elantra",
    year: 2023,
    licensePlate: "ABC-006",
    vin: "VIN006HYUND2023",
    category: "economy",
    dailyRate: 32,
    seats: 5,
    transmission: "automatic",
    fuelType: "petrol",
    mileage: 6200,
    status: "available",
    location: {
      branch: "Downtown",
      coordinates: { latitude: 40.7128, longitude: -74.006 },
    },
    features: ["Air Conditioning", "Bluetooth", "USB Port"],
    images: [
      "https://images.unsplash.com/photo-1581355740032-922d2eef47fa?w=500&q=80",
    ],
    insuranceType: "basic",
    documents: {
      registrationExpiry: new Date("2025-12-31"),
      insuranceExpiry: new Date("2025-12-31"),
      inspectionExpiry: new Date("2025-06-30"),
    },
    totalRentals: 25,
    averageRating: 4.1,
  },
  {
    make: "Ford",
    model: "Transit",
    year: 2023,
    licensePlate: "ABC-007",
    vin: "VIN007FORD2023",
    category: "van",
    dailyRate: 75,
    seats: 8,
    transmission: "automatic",
    fuelType: "diesel",
    mileage: 8000,
    status: "available",
    location: {
      branch: "Downtown",
      coordinates: { latitude: 40.7128, longitude: -74.006 },
    },
    features: ["Cargo Space", "Air Conditioning", "Power Steering"],
    images: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500&q=80",
    ],
    insuranceType: "standard",
    documents: {
      registrationExpiry: new Date("2025-12-31"),
      insuranceExpiry: new Date("2025-12-31"),
      inspectionExpiry: new Date("2025-06-30"),
    },
    totalRentals: 30,
    averageRating: 4.3,
  },
  {
    make: "Audi",
    model: "A4",
    year: 2024,
    licensePlate: "ABC-008",
    vin: "VIN008AUDI2024",
    category: "luxury",
    dailyRate: 115,
    seats: 5,
    transmission: "automatic",
    fuelType: "diesel",
    mileage: 600,
    status: "available",
    location: {
      branch: "Airport",
      coordinates: { latitude: 40.7769, longitude: -73.874 },
    },
    features: [
      "Quattro AWD",
      "Virtual Cockpit",
      "Bang & Olufsen Audio",
      "LED Lights",
    ],
    images: [
      "https://images.unsplash.com/photo-1609406170564-d7c1f44eba5f?w=500&q=80",
    ],
    insuranceType: "premium",
    documents: {
      registrationExpiry: new Date("2026-12-31"),
      insuranceExpiry: new Date("2026-12-31"),
      inspectionExpiry: new Date("2026-06-30"),
    },
    totalRentals: 10,
    averageRating: 4.9,
  },
  {
    make: "Nissan",
    model: "Qashqai",
    year: 2023,
    licensePlate: "ABC-009",
    vin: "VIN009NISAN2023",
    category: "suv",
    dailyRate: 58,
    seats: 5,
    transmission: "automatic",
    fuelType: "petrol",
    mileage: 5500,
    status: "available",
    location: {
      branch: "Downtown",
      coordinates: { latitude: 40.7128, longitude: -74.006 },
    },
    features: [
      "Panoramic Roof",
      "Rear Camera",
      "Climate Control",
      "Apple CarPlay",
    ],
    images: [
      "https://images.unsplash.com/photo-1538640525-c570145cde4d?w=500&q=80",
    ],
    insuranceType: "standard",
    documents: {
      registrationExpiry: new Date("2025-12-31"),
      insuranceExpiry: new Date("2025-12-31"),
      inspectionExpiry: new Date("2025-06-30"),
    },
    totalRentals: 20,
    averageRating: 4.4,
  },
  {
    make: "Tesla",
    model: "Model 3",
    year: 2024,
    licensePlate: "ABC-010",
    vin: "VIN010TESLA2024",
    category: "luxury",
    dailyRate: 125,
    seats: 5,
    transmission: "automatic",
    fuelType: "electric",
    mileage: 400,
    status: "available",
    location: {
      branch: "Airport",
      coordinates: { latitude: 40.7769, longitude: -73.874 },
    },
    features: [
      "Autopilot",
      "Touchscreen Display",
      "Premium Audio",
      "Supercharging",
    ],
    images: [
      "https://images.unsplash.com/photo-1549399542-7e3f8b83ad38?w=500&q=80",
    ],
    insuranceType: "premium",
    documents: {
      registrationExpiry: new Date("2026-12-31"),
      insuranceExpiry: new Date("2026-12-31"),
      inspectionExpiry: new Date("2026-06-30"),
    },
    totalRentals: 15,
    averageRating: 4.8,
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    await Car.deleteMany({});
    console.log("Cleared existing cars");

    const result = await Car.insertMany(sampleCars);
    console.log(`Successfully added ${result.length} sample cars`);

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
