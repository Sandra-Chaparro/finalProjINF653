const statesData = require("../models/states.json"); //all states info from json
const mongoData = require("../models/States"); //funfacts for states mongodb

const verifyState = () => {
  return (req, res, next) => {
    const parameter = req.params.state;
    stateAbbr = parameter.toUpperCase(); //convert the state parameter to upper case
    const stateCodes = statesData.map((state) => state.code); //create array of state codes
    const isState = stateCodes.find((code) => code === stateAbbr); // if match a code from one of the states

    if (!isState)
      return res.status(400).json("Invalid state abbreviation parameter");
    if (isState == "undefined")
      return res.status(400).json("Invalid state abbreviation parameter");
    if (isState) req.params.state = stateAbbr;
    next();
  };
};

module.exports = verifyState;
