const Mongoose = require("mongoose");
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
// exports.postUserSave = async (req, res) => {
//   try {
//     const user = new User({
//       _id: new Mongoose.Types.ObjectId(),
//       user_name: req.body.user_name,
//       user_email: req.body.user_email,
//       message: req.body.message,
//     });
//     await user.save();
//     return res.status(200).json({ success: "true" });
//   } catch (err) {
//     console.log(err);
//     return res.status(400).json({ error: "error" });
//   }
// };
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
