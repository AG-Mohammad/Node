const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();
const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Connected to MongoDB");
});

const usersRouter = require("./routers/users");
const rolesRouter = require("./routers/role");
const permsRouter = require("./routers/permission");

app.use("/users", usersRouter);
app.use("/roles", rolesRouter);
app.use("/permission", permsRouter);

app.listen(port, () => {
  console.log(`Server Port : ${port}`);
});
