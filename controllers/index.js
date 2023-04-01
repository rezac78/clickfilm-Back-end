const Mongoose = require("mongoose");
const Users = require("../models/Register");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// handle get all user
exports.getUser = (req, res) => {
  Users.find()
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
    Users.findById(_id).then((result) => {
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
    Users.remove(_id).then((result) => {
      console.log(result);
      res.status(200).json({ message: "user deleted", result: result });
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err });
  }
};
// handle singup user
exports.SingupUsers = async (req, res, next) => {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var confirmPassword = req.body.confirmPassword;
  const _id = req.params.id;
  const emailExists = await Users.findOne({
    email: req.body.email,
    _id: { $ne: _id },
  });
  const UserNameExists = await Users.findOne({
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
        const userDetalis = new Users({
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
// handle login user
exports.LoginUsers = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email }).lean();
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!user) {
    return res.json({ status: "error", message: "Invalid username/password" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      JWT_SECRET
    );
    return res.json({ status: "ok", token: token });
  } else {
    return res.json({ status: "error", message: "Invalid password" });
  }
};
// handle ChangePassword user
exports.ChangePasswordUsers = async (req, res, next) => {
  const { token, newPassword } = req.body;
  const JWT_SECRET = process.env.JWT_SECRET;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const _id = user.id;
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    console.log(hashedPassword);
    await Users.updateOne(
      { _id },
      {
        $set: { password: hashedPassword },
      }
    );
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error", error: ";))" });
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
