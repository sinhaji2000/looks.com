const User = require("../models/user");
const Comment = require("../models/comment");
const Post = require("../models/post");
const commentMailer = require("../mailers/comments_mailer");
const Like = require("../models/like");
module.exports.createComment = async (req, res) => {
  try {
    const post = await Post.findById(req.body.post);
    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });

      post.comments.push(comment);
      await post.save();
      // Populate the user field of the newly created comment
      const populatedComment = await Comment.findById(comment._id).populate(
        "user",
        "name email"
      );

      // Send the populated comment in the mail
      commentMailer.newComment(populatedComment);

      return res.redirect("/");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error");
  }
};

module.exports.destroyComments = async (req, res) => {
  try {
    // Fetch the comment by ID
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).send("Comment not found");
    }

    // Check if the user deleting the comment is the owner
    if (comment.user.toString() === req.user.id.toString()) {
      let postId = comment.post;

      // Delete the comment using findByIdAndDelete or deleteOne
      await Comment.findByIdAndDelete(comment._id);
      await Like.deleteMany({ likeable: comment._id, onModel: "Comment" });

      // Pull the comment ID from the post's comments array
      await Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      });

      return res.redirect("/");
    } else {
      return res.status(403).send("Unauthorized action");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error deleting comment");
  }
};