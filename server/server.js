const express = require("express");
const app = express();
const path = require("path");
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://carlosfrev123:d3KkR6wrS8ZWDkQN@maindb.kcu0qnr.mongodb.net/";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

use("mainDB");
db.users.insertOne({
  username: "dummyUser",
  password: "1234",
  groupIDs: ["1"],
});
console.log(db.users.find({ username: "dummyUser" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "../client")));

app.get("/", (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, "../client/index.html"));
});

if (process.env.NODE_ENV === "production") {
  // statically serve everything in the build folder on the route '/build'
  app.use("/build", express.static(path.join(__dirname, "../build/")));
  // serve index.html on the route '/'
  app.get("/", (req, res) => {
    return res
      .status(200)
      .sendFile(path.join(__dirname, "../client/index.html"));
  });
}

app.listen(3000, () => {
  console.log("server started on 3000", process.env.NODE_ENV);
});

module.exports = app;
