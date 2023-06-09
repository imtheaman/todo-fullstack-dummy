const express = require('express');
const bodyParser = require('body-parser');
const {insertDoc, readAllDoc} = require('../db/utils');
const {v4: uuid} = require('uuid');

const app = express();
const port = process.env.PORT || 2000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/getalltodocards', async (req, res) => {
  await readAllDoc().then((response) => {
    res.setHeader('Content-Type', 'application/json');
    res.json(response);
  });
});

app.post('/addtodocard', async (req, res) => {
  console.log(req.body);
  console.log(req.headers['content-type']);
  if (!req.body.taskName || !req.body.comment) {
    res.status(403).send({error: 'invalid input'});
    return;
  }
  const data = {
    ...req.body,
    _id: uuid(),
    date: new Date()
  };
  await insertDoc(data).then((response) => {
    res.setHeader('Content-Type', 'application/json');
    res.json(response);
  });
});

app.get('*', (req, res) => {
  res.status(404).send({error: 'route not available'});
});

app.listen(port, () => console.log('listening on port ', port));
