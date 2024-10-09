const nodemailer = require("../config/nodemailer");

exports.newComment = (comment) => {
  console.log("inside newComment mailer********", comment);

  nodemailer.transporter.sendMail(
    {
      from: "mukeshsinha.ocsm@gmail.com",
      to: comment.user.email,
      subject: "new Comment published",
      html: "<h1> Yup  , your comment is now published </h1>",
    },
    (err, info) => {
      console.log(info);
      if (err) {
        console.log("Eror in sending email");
        return;
      }

      console.log("Message Sent", info);
      return;
    }
  );
};
