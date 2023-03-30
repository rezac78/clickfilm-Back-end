const Mongoose = require("mongoose");
const RegisterSchema = require("../models/Register");
const bcrypt = require("bcrypt");

// handle get all user
exports.getUser = (req, res) => {
  console.log("hello word");
};
// // handle get a user
// exports.getUserbyID = (req, res) => {
//   try {
//     const _id = req.params.id;
//     User.findById(_id).then((result) => {
//       res.status(200).json({ User: result });
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(400).json({ error: "error" });
//   }
// };
// // handle post user and save
exports.postUserSave = (req, res, next) => {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var confirmPassword = req.body.confirmPassword;
  if (password !== confirmPassword) {
    res.json({ message: "Password Not Matched!!!" });
  } else {
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) {
        return res.json({
          message: "Something Wrong , try Later!",
          error: err,
        });
      } else {
        const userDetalis = new RegisterSchema({
          _id: new Mongoose.Types.ObjectId(),
          username: username,
          email: email,
          password: hash,
        });
        userDetalis.save()
          .then((doc) => {
            res
              .status(201)
              .json({ message: "User Registered SuccessFully", results: doc });
          })
          .catch((err) => {
            res.json(err);
          });
      }
    });
  }
};
// // handle delete user
// exports.DeleteUser = (req, res) => {
//   try {
//     User.remove({ _id: req.params.id }).then((result) => {
//       res.status(200).json({ message: "user deleted", result: result });
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(400).json({ error: "error" });
//   }
// };
