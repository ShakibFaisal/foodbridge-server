const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
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
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const foodDB = client.db("FoodBridge");
    const collection = foodDB.collection("Foods");
    const request_collection = foodDB.collection("Request-Foods");
    app.get("/foods", async (req, res) => {
      const cursor = collection.find({ food_status: "Available" });
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/highestfoods", async (req, res) => {
      const cursor = collection.find().sort({ food_quantity: -1 }).limit(6);
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/foods/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await collection.findOne(query);
      res.send(result);
    });
    app.post("/foods", async (req, res) => {
      const newFood = req.body;

      const result = await collection.insertOne(newFood);
      res.send(result);
    });
    // manage Food
    app.get("/userfood", async (req, res) => {
      const email = req.query.email;
      const query = {};
      if (email) {
        query.donator_email = email;
      }
      const cursor = collection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    app.patch("/userfood/:id", async (req, res) => {
      const id = req.params.id;
      const updatedFood = req.body;
      const query = { _id: new ObjectId(id) };
      const update = {
        $set: {
          food_name: updatedFood.food_name,
          food_image: updatedFood.food_image,
          food_quantity: updatedFood.food_quantity,
          pickup_location: updatedFood.pickup_location,
          expire_date: updatedFood.expire_date,
          additional_notes: updatedFood.additional_notes,
        },
      };
      const result = await collection.updateOne(query, update);
      res.send(result);
    });

    //  Delete
    app.delete("/food/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await collection.deleteOne(query);
      res.send(result);
    });
    // chalange part
    app.post("/requestfoods", async (req, res) => {
      const newFood = req.body;

      const result = await request_collection.insertOne(newFood);
      res.send(result);
    });
    app.get("/foods/request/:productId", async (req, res) => {
      const productId = req.params.productId;
      const query = { productcID: productId };
      const cursor = request_collection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/food/myrequest", async (req, res) => {
      const email = req.query.email;
      const query = {};
      if (email) {
        query.donator_email = email;
      }
      const cursor = request_collection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    app.patch("/food/myrequest/:id", async (req, res) => {
      const id = req.params.id;
      const updatedFood = req.body;
      
      const query = { _id: new ObjectId(id) };
      const update = {
        $set: {
          status: updatedFood.status,
        },
      };
      const result = await request_collection.updateOne(query, update);
      res.send(result);
    });
    app.patch("/food/status/:id", async(req, res) => {
      const id = req.params.id;
      const { status } = req.body;
      
      const query = { _id: new ObjectId(id) };
    const update = { $set: { food_status:status} };
    const result = await collection.updateOne(query, update);
    res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
app.listen(port);
