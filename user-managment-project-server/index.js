const express = require('express');
const cors = require('cors');
// require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://userMangement:UoLrQZWmIVI34Urd@metleaf.k43zbyg.mongodb.net/?retryWrites=true&w=majority&appName=MetLeaf";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
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

        const userManagementCollection = client.db('userManagementDB').collection('users');


        // client side ar search data in useEffect--- fetch(`http://localhost:3000/users?searchParams=${search}`)
        app.get('/users', async (req, res) => {
            const { searchParams } = req.query;
            console.log(searchParams);
            let query = {};
            if (searchParams) {
                // Single filed search system
                // query = {
                //     name: {
                //         $regex: searchParams,
                //         $options: "i"
                //     }
                // }

                // Multi filed search system
                query = {
                    $or: [
                        { name: { $regex: searchParams, $options: "i" } },
                        { email: { $regex: searchParams, $options: "i" } }
                    ]
                };
            }
            const result = await userManagementCollection.find(query).toArray();
            res.send(result);
        })

        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await userManagementCollection.findOne(query);
            res.send(result);

        })

        app.post('/users', async (req, res) => {
            const userProfile = req.body;
            console.log(userProfile);
            const result = await userManagementCollection.insertOne(userProfile);
            res.send(result);
        })

        app.put('/users/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updateUser = req.body;
            const updateDoc = {
                $set: updateUser
            }
            const result = await userManagementCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        })

        app.patch('/users/:id', async (req, res) => {
            const id = req.params.id;
            const updatedFields = req.body;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };

            const updateDoc = {
                $set: updatedFields
            }
            const result = await userManagementCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        })

        app.patch('/users/dateUpdate/:id', async (req, res) => {
            const id = req.params.id;
            const updatedFields = req.body.dateUpdate;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            console.log(updatedFields);


            // req.body theke asa puro object ti jodi db te insert korte chai as a object
            // const updateDoc = {
            //     $set: updatedFields
            // }

            //req.body theke asa puro object single a single a jodi insert korte chai
            const updateDoc = {
                $set: {
                    hour: updatedFields.hour,
                    date: updatedFields.date,
                    title: updatedFields.title,
                    day: updatedFields.day
                }
            }
            const result = await userManagementCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        })

        app.get('/users/dateUpdate/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await userManagementCollection.findOne(query);
            res.send(result);
        })

        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await userManagementCollection.deleteOne(query);
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





app.get('/', (req, res) => {
    res.send('user managment server..')
})

app.listen(port, () => {
    console.log(`user managment server in running on port${port}`)
})