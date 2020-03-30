const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Load models
const Bootcamp = require("./models/Bootcamps");

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

// Read JSON files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);

// Import into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);

    console.log("Data imported...".green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete Data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    console.log("Data Destroyed...".red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Reading i/p from console for checking the action
if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
} else {
  console.error("Please choose a correct flag".red);
  process.exit();
}
