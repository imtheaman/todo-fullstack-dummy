const express = require("express");
const bodyParser = require("body-parser");
const { insertDoc, readAllDoc } = require("../db/utils");

const app = express();
const port = process.env.PORT || 2000;

app.use(bodyParser.json());

app.get("/getalltodocards", async (req, res) => {
  await readAllDoc().then((response) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    res.json(response);
  });
});

app.post("/addtodocard", async (req, res) => {
  if (!req.body.taskName || !req.body.comment) {
    res.status(403).send({ error: "invalid input" });
    return;
  }
  await insertDoc(req.body).then((response) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    res.json(response);
  });
});

app.get("*", (req, res) => {
  res.status(404).send({ error: "route not available" });
});

app.listen(port, () => console.log("listening on port ", port));
