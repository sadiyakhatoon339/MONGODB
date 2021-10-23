//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

//TODO

//wikiDB is a dbd already defined in robo t3
mongoose.connect("mongodb://localhost:27017/wikiDB", { useNewUrlParser: true, useUnifiedTopology: true });

//CREATE A NEW SCHEMA

const articleSchema = {
    title: String,
    content: String
};
//GET
//CREATE AN ARTICLE MODEL USING MONGOOSE




const Article = mongoose.model("Article", articleSchema);


///////////////////////////////////////REQUEST TARGETING ALL ARTICLES/////////////////////////////////

//USE APP.ROUTE METHOD T ABOID WRITING APP.ET APP.POST ETC

app.route("/articles")

    .get(function (req, res) {
        Article.find(function (err, foundArticles) {
            if (err) res.send(err);
            else
                res.send(foundArticles);
        });

    })

    .post(function (req, res) {
        console.log(req.body.title);
        console.log(req.body.content);

        //CREATE NEW ARTICLE

        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });
        newArticle.save(function (err) {
            if (!err) res.send("Successfully added a new article");
            else res.send(err);

        });
    })


    .delete(function (req, res) {
        Article.deleteMany(function (err) {
            if (!err) res.send("Successfull deleted")
            else res.send(err);
        })
    });

// FETCHES ALL THE ARTICLES
// app.get("/articles", function (req, res) {
//     Article.find(function (err, foundArticles) {
//         if (err) res.send(err);
//         else
//             res.send(foundArticles);
//     });

// });



//POST


// app.post("/articles", function (req, res) {
//     console.log(req.body.title);
//     console.log(req.body.content);

//     //CREATE NEW ARTICLE

//     const newArticle = new Article({
//         title: req.body.title,
//         content: req.body.content
//     });
//     newArticle.save(function (err) {
//         if (!err) res.send("Successfully added a new article");
//         else res.send(err);

//     });
// });




//DELETE

// app.delete("/articles", function (req, res) {
//     Article.deleteMany(function (err) {
//         if (!err) res.send("Successfull deleted")
//         else res.send(err);
//     })
// });




////////////////////////////////REQUEST TARGETING A SPECIFIC ARTICLES/////////////////////////////////

// GET USING APP.ROUTE
app.route("/articles/:articleTitle")

    .get(function (req, res) {

        //TO FIND THE ARTICLE WITH THE GIVEN NAME i.e aticleTitle
        Article.findOne({ title: req.params.articleTitle }, function (req, foundArticle) {
            if (foundArticle) res.send(foundArticle);
            if (err) res.send(err);
        })

    })

    //PUT  OR UPDATE
    .put(function (req, res) {
        Article.updateOne(
            { title: req.params.articleTitle },
            { title: req.body.title, content: req.body.content },
            { overwrite: true },
            function (err) {
                if (!err) res.send("Succesfully updated article");

            }

        );
    })


    //PATCH
    //IT UPDATES ONLY THE INFO THAT WE PROVIDE ELSE REMAINS THE SAME BUT ELSE GETS DELETED IF NOT PRO
    //VIDED WITH THE PUT OPEARTION

    .patch(function (req, res) {
        Article.updateOne(
            { title: req.params.articleTitle },
            //{$set:{title:"Chuck norris"}} if we want to upadte title
            { $set: req.body },//to make the changes whatever we want,
            function (err) {
                if (!err) res.send("Successfully updated !!!!!!");
                else res.send(err);
            }
        );

    })


    //DELETE

    .delete(function (req, res) {
        Article.deleteOne(
            { title: req.params.articleTitle },
            function (err) {
                if (!err) res.send("Successfullllyyyyy deleted the item");
                else res.send(err);
            }
        )
    })




app.listen(3000, function () {
    console.log("Server started on port 3000");
});