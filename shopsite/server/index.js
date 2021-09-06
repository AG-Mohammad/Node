const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models");

app.use(express.json());
app.use(cors());

const userRouter = require("./routers/users");
app.use("/api/users", userRouter);

const prodRouter = require("./routers/Productes");
app.use("/api/products", prodRouter);

app.use("/uploads", express.static("uploads"));

db.sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log("======>Server Port 4400<======");
  });
});
