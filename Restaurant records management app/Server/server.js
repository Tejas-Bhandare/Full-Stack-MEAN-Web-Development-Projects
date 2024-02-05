const{MongoClient} = require('mongodb');
const URL = "mongodb://localhost:27017";
const client = new MongoClient(URL);
const dbName = "RestaurantMasterDatabase";

express = require('express');
const eobj = express();
const port = 3000;

// To handle CORS
// Cross Origin Resource Sharing
eobj.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin",
    "http://localhost:4200");

    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content-Type, Accept");

    // Accessing request headers
    //const origin = req.headers.origin || "http://localhost:4200";

    next();
});


// function to connect database and mongodb
async function getConnection()
{
    let conn = await client.connect();
    let db = conn.db(dbName);
    return db.collection("RestaurantDetails");
}

//starter function to get know that server is running....
function Starter()
{
    console.log("Server is running on port: " + port);
    console.log("Client-srever-connection eshtablished successfully");
}

// function to get all the data from database
async function getAllRestData(req,res)
{
    let data = await getConnection();
    data = await data.find().toArray();
    console.log("Data is accessed from " +dbName+" database.....");
    res.send(data);
}

// function to insert the data into database
async function InsertData(req,res)
{
    let data = await getConnection();
    let result = await data.insertOne(req.body);

    if(result.acknowledged)
    {
        console.log("Data gets succesfully inserted");
    }
}
// Main function to start the server
function main()
{
    let ret;
    ret = getConnection();
    console.log("Connection eshtablished successfully with RestaurantMasterDatabase database....");
}

main();

eobj.listen(port, Starter);


eobj.get("/RestaurantData", getAllRestData);
eobj.post("/addRestaurant", InsertData);
