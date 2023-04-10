//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash")
const mongoose = require('mongoose')
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/blogDB", { useNewUrlParser: true });

const postSchema = {
  title: String,
  content: String
}

const Post = mongoose.model("Post", postSchema);

let posts = []; //for global variables, "let" is suitable

app.get("/", function (req, res) {
  //console.log(posts)
  // res.render("home", {AllPosts : posts})

  async function getPosts() {
    try {
      const result = await Post.find({});
      res.render("home", { AllPosts: result });
    } catch (err) {
      console.log(err);
    }
  }
  getPosts();


})
app.get("/about", function (req, res) {
  res.render("about", { AbContent: aboutContent })
})
app.get("/contact", function (req, res) {
  res.render("contact", { conContent: contactContent })
})
app.get("/compose", function (req, res) {
  res.render("compose")
})



app.post("/compose", function (req, res) {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });
  post.save();
  res.redirect("/");
})



app.get("/posts/:postId", function (req, res) {
  const reqPostId = req.params.postId
  // posts.forEach(function(post){
  //   const storedTitle = _.lowerCase(post.heading)
  //   if(storedTitle === title) {
  //     res.render("post", {TitleName : post.heading, postBodyContent : post.content})
  //   }
  //   else console.log("Not a match!!")
  // })
  console.log(reqPostId)
  async function getReqPosts() {
    try {
      const result = await Post.findOne({_id : reqPostId});  //see the diff b/w find() and findOne()
      res.render("post", {TitleName : result.title, postBodyContent : result.content})
    } catch (err) {
      console.log(err);
    }
  }
  getReqPosts();


})









app.listen(3000, function () {
  console.log("Server started on port 3000");
});
