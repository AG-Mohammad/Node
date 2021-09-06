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
  useFindAndModify: false
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Connected to MongoDB");
});

const usersRouter = require("./routers/users");
const rolesRouter = require("./routers/role");
const permsRouter = require("./routers/permission");
const rolePermsRouter = require("./routers/rolePerms");

app.use("/api/users", usersRouter);
app.use("/api/roles", rolesRouter);
app.use("/api/permission", permsRouter);
app.use("/api/roleperms", rolePermsRouter);

app.listen(port, () => {
  console.log(`Server Port : ${port}`);
});
