const Post = require("../../../models/post");
const Comment = require("../../../models/comment");

module.exports.index = async (req, res) => {
  try {
    const posts = await Post.find({})
      .sort("-createdAt")
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });
    return res.json(200, {
      message: "List of Post",
      post: posts,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).send("Post not found");
    }

    // Check if the user deleting the post is the owner
    // if (post.user.toString() === req.user.id.toString()) {
    // Use findByIdAndDelete instead of post.remove()
    await Post.findByIdAndDelete(req.params.id);

    // Remove all comments related to this post
    await Comment.deleteMany({ post: req.params.id });

    return res.json(200, {
      message: "post and associated commente deete succesfully",
    });
    // } else {
    //   return res.status(403).send("Unauthorized action");
    // }
  } catch (error) {
    // console.error("Error while deleting post:", error);
    return res.status(500, {
      message: "Iternal server problem",
    });
  }
};
