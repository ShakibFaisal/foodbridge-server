const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require('dotenv').config()
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
// const uri = "mongodb+srv://FoodBridge:i74SCY7uCCZ9F81G@cluster0.ro7vec0.mongodb.net/?appName=Cluster0";
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ro7vec0.mongodb.net/?appName=Cluster0`;
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
      const cursor = collection.find({ food_status: "Available" });
      const result = await cursor.toArray();
      res.send(result)

    });
     app.get("/highestfoods", async (req, res) => {
      const cursor = collection.find().sort({food_quantity:-1}).limit(6);
      const result = await cursor.toArray();
      res.send(result)

    });
     app.get('/foods/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await collection.findOne(query);
            res.send(result);
        })
    app.post("/foods", async (req, res) => {
      const newFood = req.body;

      const result = await collection.insertOne(newFood);
      res.send(result);
    });
    // manage Food
     app.get("/userfood",async (req,res)=>{
           const email = req.query.email;
            const query = {};
            if (email) {
                query.donator_email = email;
            }
            const cursor =collection.find(query);
            const result = await cursor.toArray();
            res.send(result);

     })
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