const User = require("../models/user");
const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.createComment = async (req, res) => {
  try {
    const post = await Post.findById(req.body.post);
    if (post) {
      const comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });

      post.comments.push(comment);
      await post.save();
      return res.redirect("/");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error");
  }
};
