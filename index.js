require('dotenv').config();
const express = require("express");
const app = express();
const path = require("path");
const sendEmail = require("./utils/sendMail");

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", async (req, res, next) => {
  res.render("nodemail" ,{result : ''});
});

app.post("/send-email", async (req, res, next) => {
  try {
    const { userEmail, userText, userSubject } = req.body;
    const result = await sendEmail(userEmail, userText, userSubject);
    res.render("nodemail", {result});
  } catch (err) {
    console.log(err);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is connected Successfully on PORT ${process.env.PORT}`);
});
