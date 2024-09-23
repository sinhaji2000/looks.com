const Post = require("../models/post");

exports.postPost = async (req, res) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });

    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error Posting ");
  }
};
