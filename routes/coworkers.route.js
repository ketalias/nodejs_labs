const express = require("express");
const router = express.Router();

const controllers = require("../controllers/coworkers.controller");
const middlewares = require("../middlewares/coworkers.middleware");
console.log("middlewares:", middlewares);


router
  .route("/")
  .post(middlewares.coworkerCreationDataValidation, controllers.createCoworker);

router.route("/").get(controllers.getAllCoworkers);

router
  .route("/:id")
  .get(controllers.getCoworkerById)
  .patch(middlewares.coworkerUpdateDataValidation, controllers.updateCoworker)
  .delete(controllers.deleteCoworker);

module.exports = router;
