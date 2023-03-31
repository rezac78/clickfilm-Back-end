const Mongoose = require("mongoose");
const RegisterSchema = require("../models/Register");
const bcrypt = require("bcrypt");
// handle get all user
exports.getUser = (req, res) => {
  RegisterSchema.find()
    .then((result) => {
      res.status(200).json({ UsersData: result });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
// handle get a user
exports.getUserbyID = (req, res) => {
  try {
    const _id = req.params.id;
    RegisterSchema.findById(_id).then((result) => {
      res.status(200).json({ UsersData: result });
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "error" });
  }
};
// handle deleted a user
exports.deletedUserbyID = (req, res) => {
  try {
    const _id = req.params.id;
    RegisterSchema.remove(_id).then((result) => {
      console.log(result);
      res.status(200).json({ message: "user deleted", result: result });
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err });
  }
};
// handle post user and save
exports.SingupUsers = async (req, res, next) => {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var confirmPassword = req.body.confirmPassword;
  const _id = req.params.id;
  const emailExists = await RegisterSchema.findOne({
    email: req.body.email,
    _id: { $ne: _id },
  });
  const UserNameExists = await RegisterSchema.findOne({
    username: req.body.username,
    _id: { $ne: _id },
  });
  if (UserNameExists) {
    res.json({ message: "Username already used" });
  } else if (emailExists) {
    res.json({ message: "Email already used" });
  } else if (password !== confirmPassword) {
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
        userDetalis
          .save()
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
