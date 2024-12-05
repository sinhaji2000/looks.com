const { default: mongoose } = require("mongoose");
const User = require("./user");

const friendsSchema = mongoose.Schema(
  {
    from_user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    to_user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  {
    timeStamps: true,
  }
);

const friends = mongoose.model("Frind", friendsSchema);
module.exports = friends;
