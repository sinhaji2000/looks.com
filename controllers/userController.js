const User = require("../models/user");

exports.getSignUp = (req, res) => {

  if(req.isAuthenticated()){
    return res.redirect('/user/userProfile')
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

  if(req.isAuthenticated()){
    return res.redirect('/user/userProfile')
  }
    return res.render("signIn", {
      title: "signIn",
      path: "css/signIn.css",
    });
  
  
};

exports.postSignIn = (req, res) => {

  // This will work with passport.js authentication
  return res.redirect('/');
};

// Profile rendering
exports.getUserProfile = async (req, res) => {
  try {
   // check all by passport which we makw chckAuthticated in pass-locak-stratrgy.js file like user is sighin or not etc

    return res.render('userProfile' , {
      title: "userProfile",
        path: "css/userProfile.css",
    })
    
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error loading profile");
  }
};

exports.postSignOut = (req , res) =>{

  req.logout(err => {
    if(err){
      return res.status(500).send('Logout failed');
    }
    return res.redirect('/');
  })
  // return res.redirect('/')
}

