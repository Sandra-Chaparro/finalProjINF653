const states = require("../models/states.json");
const statesFromMongo = require("../models/States");
const verifyState = require("../middleware/verifyState");

const data = {
  states: require("../models/states.json"),
};

const getAllStates = async (req, res) => {
  try {
    let count = 0;
    let contiguousStates = [];
    if (req.query.contig == "true") {
      for (let state in data.states) {
        if (
          data.states[state].code !== "AK" &&
          data.states[state].code !== "HI"
        ) {
          contiguousStates.push(data.states[state]);
        }
      }
      await res.send(contiguousStates);
    } else if (req.query.contig == "false") {
      for (let state in data.states) {
        if (
          data.states[state].code == "AK" ||
          data.states[state].code == "HI"
        ) {
          contiguousStates.push(data.states[state]);
        }
      }

      await res.send(contiguousStates);
    }

    let statesFromDB = await statesFromMongo.find().exec();

    const newStatesArray = data.states.map((individualState) => {
      let mergeStates;
      let statesMatch = statesFromDB.find(
        (st) => st.stateCode === individualState.code
      );
      if (statesMatch) {
        mergeStates = {
          ...individualState,
          funfacts: statesMatch.funfacts,
        };
      } else if (statesMatch == undefined) {
        return individualState;
      }
      return mergeStates;
    });

    await res.json(newStatesArray);
  } catch (err) {
    const status = err.status || 500;
    res.status(status);
  }
};

const getState = async (req, res) => {
  const state = data.states.find((state) => state.code === req.params.state);
  if (!req.params.state) {
    return await res
      .status(400)
      .json({ message: `code  ${req.params.state} not found` });
  }
  await res.json(state);
};

const getStateFunFact = async (req, res) => {
  const state = data.states.find((state) => state.code === req.params.state);
  if (!req.params.state) {
    return await res
      .status(400)
      .json({ message: `code  ${req.params.state} not found` });
  }
  await res.json(state);
};

module.exports = {
  getAllStates,
  getState,
  getStateFunFact,
};
