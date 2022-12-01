require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(express.json());
app.use(cors());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.eaa9w7x.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        const categoryCollection = client.db('foneSell').collection('categories');
        const productsCollection = client.db('foneSell').collection('products');


        app.get('/category', async (req, res) => {
            const query = {}
            const cursor = categoryCollection.find(query);
            const category = await cursor.toArray();
            res.send(category);
        });


        app.get("/category/:id", async (req, res) => {
            const id = req.params.id;
            const query = { categoryId: id };
            const cursor = productsCollection.find(query);
            const product = await cursor.toArray();
            res.send(product);
        });


        app.post('/products', async (req, res) => {
            const product = req.body.addProductInfo;
            console.log(product);
            const result = await productsCollection.insertOne(product);
            res.send(result)
        })


    }
    finally {

    }
}
run().catch(error => console.error(error));




app.get("/", (req, res) => {
    res.send("server is runing");
});


app.listen(port, () => {
    console.log(`Server is running on port, ${port}`);
})