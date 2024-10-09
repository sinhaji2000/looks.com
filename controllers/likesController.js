const Like = require("../models/like");
const Comment = require("../models/comment");
const Post = require("../models/post");

exports.toggleLike = async (req, res) => {
  try {
    let likeable;
    let deleted = false;

    // Determine if the like is for a Post or Comment
    if (req.query.type === "Post") {
      likeable = await Post.findById(req.query.id).populate("likes");
    } else if (req.query.type === "Comment") {
      likeable = await Comment.findById(req.query.id).populate("likes");
    }

    if (!likeable) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Check if the like already exists
    let existingLike = await Like.findOne({
      likeable: req.query.id,
      onModel: req.query.type,
      user: req.user._id,
    });

    if (existingLike) {
      // If like exists, remove it
      likeable.likes.pull(existingLike._id);
      await likeable.save();

      // Use deleteOne instead of remove
      await Like.deleteOne({ _id: existingLike._id });
      deleted = true;
    } else {
      // If like doesn't exist, create a new one
      let newLike = await Like.create({
        user: req.user._id,
        likeable: req.query.id,
        onModel: req.query.type,
      });

      likeable.likes.push(newLike._id);
      await likeable.save();
    }

    return res.status(200).json({
      message: "Request successful",
      data: {
        deleted: deleted,
      },
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
