const express = require("express");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config({ path: "./config/config.env" });

const app = express();

const PORT = process.env.PORT || 5000;

// Mounting bootcamps routes
app.use("/api/v1/bootcamps/", require("./routes/bootcamps.routes"));

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port: ${PORT}`)
);
