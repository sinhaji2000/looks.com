const Post = require("../models/post");
const Comment = require("../models/comment");
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

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).send("Post not found");
    }

    console.log("Post User ID: ", post.user.toString());
    console.log("Logged-in User ID: ", req.user.id.toString());

    // Check if the user deleting the post is the owner
    if (post.user.toString() === req.user.id.toString()) {
      // Use findByIdAndDelete instead of post.remove()
      await Post.findByIdAndDelete(req.params.id);

      // Remove all comments related to this post
      await Comment.deleteMany({ post: req.params.id });

      return res.redirect("/");
    } else {
      return res.status(403).send("Unauthorized action");
    }
  } catch (error) {
    console.error("Error while deleting post:", error);
    return res.status(500).send("Error while Deleting Post");
  }
};