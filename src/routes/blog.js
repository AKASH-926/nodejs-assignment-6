const router = require("express").Router();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Blog = require("../models/Blog");

// Your routing code goes here
// router.use(bodyParser.json());
router.get("/blog", async (req, res) => {
  try {
    const query = require("url").parse(req.url, true).query;
    let page = query.page;
    const search = query.search;
    let blog;
    if (search) {
      if (parseInt(page) > 5) {
        blog = await Blog.find({ topic: search }).limit(5);
      } else {
        blog = await Blog.find({ topic: search }).limit(parseInt(page));
      }
    } else {
      blog = await Blog.find();
    }
    // console.log(blog);
    if (blog.length) {
      res.status(200).json({
        status: "Success",
        result: blog,
      });
    } else {
      res.status(400).json({
        status: "Failure",
        message: "Query not found",
      });
    }
  } catch (e) {
    res.status(400).json({
      status: "Failure",
      message: e.message,
    });
  }
});

router.post("/blog", async (req, res) => {
  try {
    const blog = await Blog.create({
      topic: req.body.topic,
      description: req.body.description,
      posted_at: Date.now(),
      posted_by: req.body.posted_by,
    });
    res.status(200).json({
      status: "Success",
      result: blog,
    });
  } catch (e) {
    res.status(400).json({
      status: "Failure",
      message: e.message,
    });
  }
});
router.put("/blog/:id", async (req, res) => {
  try {
    const blog = await Blog.updateOne({ _id: req.params.id }, req.body);
    res.status(200).json({
      status: "Success",
      result: blog,
    });
  } catch (e) {
    res.status(400).json({
      status: "Failure",
      message: e.message,
    });
  }
});
router.delete("/blog/:id", async (req, res) => {
  try {
    const blog = await Blog.deleteOne({ _id: req.params.id });
    res.status(200).json({
      status: "Success",
      result: blog,
    });
  } catch (e) {
    res.status(400).json({
      status: "Failure",
      message: e.message,
    });
  }
});
module.exports = router;
