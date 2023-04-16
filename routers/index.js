const { Router } = require("express");
const indexController = require("../controllers/index");

const router = new Router();
//* get all data
// route GET /api/
router.get("/", indexController.getUser);
// route GET /api/Film
router.post("/Film", indexController.getFilm);
// //* get a data
// route GET /api/id
router.get("/:id", indexController.getUserbyID);
// route Deleted /api/id
router.delete("/:id", indexController.deletedUserbyID);
// * Send data to database and save
// route POST /api/signup
router.post("/signup", indexController.SingupUsers);
// route POST /api/login
router.post("/login", indexController.LoginUsers);
// route POST /api/change-password
router.post("/change-password", indexController.ChangePasswordUsers);
// // * Delete a data
// // route DELETE /api/id
// router.delete("/:id", indexController.DeleteUser);

module.exports = router;
