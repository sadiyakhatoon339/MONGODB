
//MONGODB
//const MongoClient = require('mongodb').MongoClient;
//const assert = require('assert');//assert validates our data entry


//MONGOOSE
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true, useUnifiedTopology: true });//to connect,


//INSERTION USING MONGOOSE(SCHEMA)
//ADD VALIDATION USING MIN AND MAX


const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please check your entry,no name specified"]
        //it will display an error if name is not entered in dbs

    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String,


});

//CREATING A MODEL NAMED FRUIT WHICH SHOULD HAVE THE SCHEMA SAME AS fruitSchema
const Fruit = mongoose.model("Fruit", fruitSchema);//MONGOOSE PLURALISEZ collection "Fruit" to fruits

//CREATING A DOCUMENT USING THE ABOVE MODEL
const fruit = new Fruit(
    {
        name: "Apple",
        rating: 7,
        review: "Pretty solid as fruit"
    }
);


const fruit1 = new Fruit(
    {
        name: "Mango",
        rating: 10,
        review: "I love it"
    }
);


const fruit2 = new Fruit(
    {
        name: "Banana",
        rating: 6,
        review: "Healthy"
    }
);

const fruit3 = new Fruit(
    {

        rating: 8,
        review: "Peaches are Yummy"
    }
);
//fruit3.save();

//SAVE OUR FRUIT DATABASE IN OUR Fruit COLLECTION INSIDE FruitTDB
//fruit1.save();


//CREATE COLLECTION OF PEOPLE
const peopleSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema//EMBEDDING THE TWO SCHEMAS of fruits and object  **

});

const Person = mongoose.model("Person", peopleSchema);

//**EMBEDDING THE TWO SCHEMAS
const pineapple = new Fruit({
    name: 'pineapple',
    score: 9,
    review: "great Fruit"
});

//pineapple.save();

const person = new Person(
    {
        name: "Aibak",
        age: 1000,
        favouriteFruit: pineapple
    }
);

const person1 = new Person(
    {
        name: "John",
        age: 10,
        favouriteFruit: pineapple
    }
);

//person1.save();//person IS A CONSTATNT


//UPDATE THE ALREADY EXISTING PERSON WITH FAVOURITE FRUITS

const orange = new Fruit({
    name: 'orange',
    score: 6,
    review: "khatta khatta"
});
orange.save();


Person.updateOne({ name: "Qutub-ud-din Aibak" }, { favouriteFruit: orange }, function (err) {
    if (err) console.log(err);
    else
        console.log("successfully updated Qutub-ud-din Aibak's favourite fruit");
});



//FIND USING MONGOOSE

Person.find(function (err, persons) {
    if (err)
        console.log(err);
    else {
        mongoose.connection.close();//ONCE THE CALL HAS BEEN MADE SWITCH OUT
        //scehma               //collection  
        persons.forEach(function (person) {
            console.log(person.name);
        });
    }
});




//DELETE THE DOCUMENT

// Person.deleteMany({ name: "Aibak" }, function (err) {
//     if (err) {
//         console.log(err);
//     }

//     else {
//         console.log("Successfully deleted the document")
//     }
// });




//UPDATE THE MISSING NAME
//UPDATEONE function

Fruit.updateOne({ _id: "6121ec7fd285b92b8cc439e1" }, { name: "Peach" }, function (err) {
    if (err) {
        console.log(err);
    }

    else {
        //   console.log("Successfully updated the document")
    }
})





/* To create a new connection for a new database*/
// Connection URL
//const url = 'mongodb://$[username]:$[password]@$[hostlist]/$[database]?authSource=$[authSource]';
// const url = 'mongodb://localhost:27017';

// //database name
// const dbName = 'fruitsDB';

// // Use connect method to connect to the Server

// MongoClient.connect(url, function (err, client) {
//     assert.equal(null, err);
//     console.log("Connected successfully to server");
//     const db = client.db(dbName);
//     findDocuments(db, function () {//to find the records inside the dtabase
//         client.close();
//     });
// });
/******* */



// Replace the uri string with your MongoDB deployment's connection string.
/*const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?writeConcern=majority"; */

//inserting a new data

//const client = new MongoClient(url);


//await client.connect();

// const insetDocument = function (db, callback) {
//     const collection = db.collection("fruits");

//     // create an array of documents to insert
//     const docs = ([
//         { name: "cake", healthy: false },
//         { name: "lettuce", healthy: true },
//         { name: "donut", healthy: false }
//     ],
//         function (err, result) {
//             assert.equal(err, null);
//             assert.equal(3, result.result.n);
//             assert.equal(3, result.ops.length);
//             console.log("Inserted 3 documents into the collection");
//             callback(result);
//         });

//     // this option prevents additional documents from being inserted if one fails


// }








const findDocuments = function (db, callback) {
    const collection = db.collection('fruits');
    collection.find({}).toArray(function (err, fruits) {
        assert.equal(err, null);

        console.log("Found fruits");
        console.log(fruits);
        callback(fruits);
    })
}
