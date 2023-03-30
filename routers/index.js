const { Router } = require("express");
const indexController = require("../controllers/index");

const router = new Router();
//* get all data
// route GET /api/
router.get("/", indexController.getUser);
// //* get a data
// // route GET /api/id
// router.get("/:id", indexController.getUserbyID);
// // * Send data to database and save
// // route POST /api/
router.post("/signup", indexController.postUserSave);
// // * Delete a data
// // route DELETE /api/id
// router.delete("/:id", indexController.DeleteUser);

module.exports = router;
