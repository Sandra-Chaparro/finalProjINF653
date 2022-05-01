const express = require("express");
const router = express.Router();
const statesController = require("../../controllers/statesController");
router.route("/").get(statesController.getAllStates);
router.route("/states/:state").get(statesController.getState);
router.route("/states/:state/funfact").get(statesController.getState);

module.exports = router;
