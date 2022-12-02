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
        const ordersCollection = client.db('foneSell').collection('orders');
        const usersCollection = client.db('foneSell').collection('users');


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


        app.get('/myproducts', async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const cursor = productsCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        });


        app.get('/orders', async (req, res) => {
            const email = req.query.buyersEmail;
            const query = { email: email };
            const cursor = ordersCollection.find(query);
            const orders = await cursor.toArray();
            res.send(orders);
        });


        app.get('/allseller', async (req, res) => {
            const query = { role: "Seller" };
            const cursor = usersCollection.find(query);
            const allseller = await cursor.toArray();
            res.send(allseller);
        });



        app.get('/allbuyer', async (req, res) => {
            const query = { role: "Buyer" };
            const cursor = usersCollection.find(query);
            const allbuyer = await cursor.toArray();
            res.send(allbuyer);
        });



        app.post('/products', async (req, res) => {
            const product = req.body.addProductInfo;
            const result = await productsCollection.insertOne(product);
            res.send(result)
        });


        app.post('/orders', async (req, res) => {
            const order = req.body;
            const result = await ordersCollection.insertOne(order);
            res.send(result)
        });


        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
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


app.listen(port, () =>
})