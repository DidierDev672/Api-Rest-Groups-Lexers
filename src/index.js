require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 1234;

const sequelize = require("./config");

const employee = require("./Controllers/Employee");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize.sync()
.then(() => {
    console.log(`Models synchronized with the database`);
})
.catch((error) => {
    console.log(`Error when synchronizing models with the database: ${error.message}`);
});

app.use("/api/employee", employee);

app.listen(PORT, () => {
    console.log(`The application is running on htt://localhost:${PORT}`);
});