const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: "587",
  secure: false,
  auth: {
    user: "sinhaoffcial@gmail.com",
    pass: "Lumia540!!",
  },
});

let renderTemplate = (data, relativePath) => {
  let mailHTML;
  ejs.renderFile(
    path.join(__dirname, "../views/mailers", relativePath),
    data,
    function (err, template) {
      if (err) {
        console.log("error in rendering in mailer template");
        return;
      }
      mailHTML = template;
    }
  );

  return mailHTML;
};

module.exports = {
  transporter: transporter,
  renderTemplate: renderTemplate,
};

// const nodemailer = require("nodemailer");
// const { google } = require("googleapis");

// const OAuth2 = google.auth.OAuth2;

// const oauth2Client = new OAuth2(
//   process.env.GOOGLE_CLIENT_ID, // Client ID
//   process.env.GOOGLE_CLIENT_SECRET, // Client Secret
//   "https://developers.google.com/oauthplayground" // Redirect URL
// );

// // oauth2Client.setCredentials({
// //   refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
// // });

// async function sendMail(comment) {
//   try {
//     const accessToken = await oauth2Client.getAccessToken();

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         type: "OAuth2",
//         user: "your-email@gmail.com",
//         clientId: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
//         accessToken: accessToken.token,
//       },
//     });

//     const mailOptions = {
//       from: "your-email@gmail.com",
//       to: comment.user.email,
//       subject: "New Comment Published",
//       html: "<h1>Your comment is now published</h1>",
//     };

//     let info = await transporter.sendMail(mailOptions);
//     console.log("Email sent:", info);
//   } catch (error) {
//     console.log("Error sending email:", error);
//   }
// }

// module.exports = { sendMail };
