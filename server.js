const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = 5000;

//use cors
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend URL in production
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"], // Allow these headers
  })
);

// Bodyparser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
const authRoutes = require("./routes/auth");
const serviceCategoriesRoutes = require("./routes/serviceCategories");

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/snay3iya", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Use Routes
app.use("/api", authRoutes);
app.use("/api/service-categories", serviceCategoriesRoutes);
