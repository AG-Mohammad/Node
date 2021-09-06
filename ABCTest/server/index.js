const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models");

app.use(express.json());
app.use(cors());

//Routers
const userRouter = require("./routes/users");
app.use("/api/users", userRouter);

const complaintsRouter = require("./routes/complaints");
app.use("/api/complaints", complaintsRouter);

db.sequelize.sync().then(() => {
  app.listen(4000, () => {
    console.log("Server Port 4000");
  });
});
