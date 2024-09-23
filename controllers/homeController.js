const Post = require("../models/post");

module.exports.home = async (req, res) => {
  try {
    const posts = await Post.find({}).populate("user");

    return res.render("home", {
      title: "Codial | Home",
      posts: posts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error");
  }
};
