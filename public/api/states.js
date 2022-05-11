const express = require("express");
const router = express.Router();
const verifyState = require("../../middleware/verifyState");
const statesController = require("../../controllers/statesController");

router.route("/states").get(statesController.getAllStates);

router.route("/states/:state").get(verifyState(), statesController.getState);
router
  .route("/states/:state/funfact")
  .get(verifyState(), statesController.getStateFunFact)
  .post(verifyState(), statesController.addFunFact)
  .patch(verifyState(), statesController.patchFunFact)
  .delete(verifyState(), statesController.deleteFunFact);
router
  .route("/states/:state/capital")
  .get(verifyState(), statesController.getStateCapital);
router
  .route("/states/:state/nickname")
  .get(verifyState(), statesController.getStateNickname);
router
  .route("/states/:state/population")
  .get(verifyState(), statesController.getStatePopulation);
router
  .route("/states/:state/admission")
  .get(verifyState(), statesController.getStateAdmission);

module.exports = router;
