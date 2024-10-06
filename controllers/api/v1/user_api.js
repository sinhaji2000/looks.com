const User = require("../../../models/user");
const jwt = require("jsonwebtoken");

exports.postSignIn = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user || user.password != req.body.password) {
      return res.json(422, {
        message: "invaid user or passowrd",
      });
    }

    return res.json(200, {
      message: "sigin in succefully plz keep it safe ur token",
      data: {
        token: jwt.sign(user.toJSON(), "secret", { expiresIn: "100000" }),
      },
    });
  } catch (error) {
    return res.status(500, {
      message: "Iternal server problem",
    });
  }
};
