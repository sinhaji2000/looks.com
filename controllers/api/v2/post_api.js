const Post = require("../../../models/post");

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
  } catch (error) {}

  return res.json(200, {
    message: "List of Post",
    post: post,
  });
};
