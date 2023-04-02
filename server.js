require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const indexRouter = require("./routes/Index");

const app = express();


mongoose.connect(process.env.DB_URL);
mongoose.set('strictQuery', true);
const db = mongoose.connection;
db.on("error", () => console.log("Can't connect"));
db.once("open", () => console.log("Connected to Mongoose"));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);

app.use("/", indexRouter);

// serving static files here:
app.use(express.static(__dirname + "/public"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Listening at: http://localhost:${PORT}/`);
});
