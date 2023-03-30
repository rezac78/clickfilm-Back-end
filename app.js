const path = require("path");

const express = require("express");
const dotEnv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const indexRoutes = require("./routers");

//* Load Config
dotEnv.config({ path: "./config/ENV.env" });

//* Database connection
connectDB();

const app = express();

//* Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
//* Static Folder
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

//* Routes
app.use("/api", indexRoutes);

//* Select a port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
