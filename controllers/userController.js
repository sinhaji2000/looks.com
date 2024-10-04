const User = require("../models/user");
const fs = require("fs");
const path = require("path");

exports.getSignUp = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/user/userProfile");
  }
  return res.render("signUp", {
    title: "signUp",
    path: "css/signUp.css",
  });
};

exports.postSignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const isUserExists = await User.findOne({ email: email });

    if (isUserExists) {
      return res.redirect("/user/signIn");
    }

    const user = await User.create({
      name: name,
      email: email,
      password: password,
    });

    console.log(user);
    return res.redirect("/user/signIn"); // Redirect to signIn after signUp
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error creating user");
  }
};

exports.getSignIn = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/user/userProfile");
  }
  return res.render("signIn", {
    title: "signIn",
    path: "css/signIn.css",
  });
};

exports.postSignIn = (req, res) => {
  // This will work with passport.js authentication
  return res.redirect("/");
};

// Profile rendering
exports.getUserProfile = async (req, res) => {
  try {
    // check all by passport which we makw chckAuthticated in pass-locak-stratrgy.js file like user is sighin or not etc
    const user = await User.findById(req.params.id);
    return res.render("userProfile", {
      title: "userProfile",
      path: "css/userProfile.css",
      profile_user: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error loading profile");
  }
};

exports.postSignOut = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send("Logout failed");
    }
    return res.redirect("/");
  });
  // return res.redirect('/')
};
exports.updateUserProfile = async (req, res) => {
  if (req.user.id == req.params.id) {
    try {
      let user = await User.findById(req.params.id);

      // Use multer to upload the avatar
      User.uploadedAvatar(req, res, (err) => {
        if (err) {
          console.log("***********multer error", err);
          return res.redirect("back"); // Handle error properly
        }

        // Update user details from the request body
        user.name = req.body.name;
        user.email = req.body.email;

        // Update the avatar only if a file is uploaded
        if (req.file) {
          // Check if avatar already exists and delete it (if necessary)

          // if user.avatar already exits then previos avatar should be delete or replaced
          if (user.avatar) {
            fs.unlinkSync(path.join(__dirname, "..", user.avatar));
          }
          if (user.avatar) {
            // TODO: You might want to delete the old avatar from the file system here
          }

          // Update the avatar path in the user model
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }

        // Save the updated user data to the database
        user.save();
        return res.redirect("/");
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Error while updating profile");
    }
  } else {
    res.status(401).send("Unauthorized to update this profile");
  }
};

