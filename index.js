const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send({ hi: "Emma you are a freak" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log('Running on :', PORT));
