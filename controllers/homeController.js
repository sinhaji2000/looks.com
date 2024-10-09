const Like = require("../models/like");
const Post = require("../models/post");
const User = require("../models/user");

module.exports.home = async (req, res) => {
  try {
    const posts = await Post.find({})
      .sort("-createdAt")
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
        populate: {
          path: "likes",
        },
      })
      .populate("likes");

    const users = await User.find({});

    return res.render("home", {
      title: "Codial | Home",
      posts: posts,
      users: users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error");
  }
};
