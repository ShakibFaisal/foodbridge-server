const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const uri = "mongodb+srv://FoodBridge:i74SCY7uCCZ9F81G@cluster0.ro7vec0.mongodb.net/?appName=Cluster0";
const port = process.env.port || 3000;
app.get("/", (req, res) => {
  res.send("Welcomes");
});
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const foodDB = client.db("FoodBridge");
     const collection = foodDB.collection("Foods");
    app.get("/foods", async (req, res) => {
      const cursor = collection.find({});
      const result = await cursor.toArray();
      res.send(result)

    });
    app.post("/foods", async (req, res) => {
      const newFood = req.body;

      const result = await collection.insertOne(newFood);
      res.send(result);
    });
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
app.listen(port);