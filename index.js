require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 1234;
const app = express();
const cors = require("cors");
const customer = require("./postgres");

customer.connect();
const logger = require("./middleware/loggermiddleware");
const notFound = require("./middleware/notFound");

const employee = require("./Controllers/Employee");
const section = require("./Controllers/Section");

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use(logger);
app.use(notFound);
app.use(cors());
app.use(express.json());
app.use("/api/employee", employee);
app.use("/api/section", section);

app.use((req, res) => {
  res.status(404).json({
    error: "Not found"
  });
});


app.listen(PORT, () => {
  console.log(`Serving running at http://localhost:${PORT}`);
});
