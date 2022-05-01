const statesData = require("../models/states.json");
const mongoData = require("../models/States");

let mergedData = () => {
  return (req, res, next) => {
    let mergedStateData = {
      ...statesData,
      ...mongoData,
    };
    delete mergedData._id;
    res.send(mergedStateData);
    next();
  };
};

module.exports = mergedData;
