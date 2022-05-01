const statesData = require("../models/states.json");
const mongoData = require("../models/States");

const verifyState = (...statesData) => {
  return (req, res, next) => {
    stateAbbr = req.params.state.toUpperCase();
    const stateCodes = statesData.map((state) => state.code); //create array of state codes
    const isState = stateCodes.find((code) => code === stateCodes); // if match a code from one of the states

    if (!isState)
      return res.status(400).json("Invalid state abbreviation parameter");
    if (isState) req.params.state = stateAbbr;
    next();
  };
};

module.exports = verifyState;
