
require("dotenv").config();
const express = require("express");
const sequelize = require("./config/database");
const app = express();
app.use(express.json());
const orderRoutes = require("./routes/order.routes");

app.use("/api/v1", orderRoutes);


app.get("/health", (_,res)=>res.json({status:"OK"}));

sequelize.authenticate()
  .then(() => {
    console.log("Database connected.");
    app.listen(process.env.PORT, () =>
      console.log(`QuickBite running on port ${process.env.PORT}`)
    );
  })
  .catch(err => {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  });

