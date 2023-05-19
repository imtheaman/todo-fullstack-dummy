const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.username}:${process.env.password}@cluster0.ltcbygp.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let todos;
const connection = async () => {
  await client.connect();
  todos = client.db("db").collection("todos");
};

connection();

const readAllDoc = async () => {
  if (!todos) await connection();
  const doc = await todos.find({}).toArray(function (err, result) {
    if (err) throw err;
  });
  return doc;
};

const insertDoc = async (doc) => {
  if (!todos) await connection();
  const insertedId = await todos.insertOne(doc).then((res) => res.insertedId);
  return insertedId;
};

module.exports = { readAllDoc, insertDoc };
