const states = require("../models/states.json"); //allstates info
const statesFromMongo = require("../models/States"); //funfacts states from mongodb
const verifyState = require("../middleware/verifyState");
const States = require("../models/States");

const data = {
  states: require("../models/states.json"),
};

const getAllStates = async (req, res) => {
  try {
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

    let contiguousStates = [];
    if (req.query.contig == "true") {
      for (let state in newStatesArray) {
        if (
          newStatesArray[state].code !== "AK" &&
          newStatesArray[state].code !== "HI"
        ) {
          contiguousStates.push(newStatesArray[state]);
        }
      }
      await res.send(contiguousStates);
    } else if (req.query.contig == "false") {
      for (let state in newStatesArray) {
        if (
          newStatesArray[state].code == "AK" ||
          newStatesArray[state].code == "HI"
        ) {
          contiguousStates.push(newStatesArray[state]);
        }
      }

      await res.json(contiguousStates);
    }

    // A L L        S T A T E S

    await res.json(newStatesArray);
  } catch (err) {
    const status = err.status || 500;
    res.status(status);
  }
};

const getState = async (req, res) => {
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
  if (!req.params.state) {
    return await res
      .status(400)
      .json({ message: `code  ${req.params.state} not found` });
  }
  const state = newStatesArray.find((state) => state.code === req.params.state);
  await res.json(state);
};

const getStateFunFact = async (req, res) => {
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
  if (!req.params.state) {
    return await res
      .status(400)
      .json({ message: `code  ${req.params.state} not found` });
  }
  const state = newStatesArray.find((state) => state.code === req.params.state);
  let factArray = [];
  let funfact = "";
  if (state.funfacts) {
    factArray = [...state.funfacts];
    funfact = factArray[Math.floor(Math.random() * factArray.length)];
  } else {
    return res
      .status(404)
      .json({ message: `No Fun Facts found for ${req.params.state}` });
  }

  await res.json(funfact);
};

const getStateCapital = async (req, res) => {
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
  if (!req.params.state) {
    return await res
      .status(400)
      .json({ message: `code  ${req.params.state} not found` });
  }
  const state = newStatesArray.find((state) => state.code === req.params.state);

  await res.json({ state: state.state, capital: state.capital_city });
};

const getStateNickname = async (req, res) => {
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
  if (!req.params.state) {
    return await res
      .status(400)
      .json({ message: `code  ${req.params.state} not found` });
  }
  const state = newStatesArray.find((state) => state.code === req.params.state);

  await res.json({ state: state.state, nickname: state.nickname });
};

const getStatePopulation = async (req, res) => {
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
  if (!req.params.state) {
    return await res
      .status(400)
      .json({ message: `code  ${req.params.state} not found` });
  }
  const state = newStatesArray.find((state) => state.code === req.params.state);

  await res.json({
    state: state.state,
    population: state.population.toLocaleString(),
  });
};

const getStateAdmission = async (req, res) => {
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
  if (!req.params.state) {
    return await res
      .status(400)
      .json({ message: `code  ${req.params.state} not found` });
  }
  const state = newStatesArray.find((state) => state.code === req.params.state);

  await res.json({ state: state.state, admitted: state.admission_date });
};

const addFunFact = async (req, res) => {
  console.log(req?.body?.funfacts);
  if (!req?.body?.funfacts) {
    //verify if you have received this "funfacts" data
    return res.status(400).json({ message: "State fun facts value required" });
  }
  if (!Array.isArray(req?.body?.funfacts))
    //verify this data is provided as an array.
    return res
      .status(400)
      .json({ message: "State fun facts value must be an array" });

  //find the requested state in MongoDB collection.
  const stateInMongo = await States.findOne({
    stateCode: req.params.state,
  }).exec();

  if (!stateInMongo) {
    try {
      const result = await States.create({
        stateCode: req.params.state,
        funfact: req.body.funfacts,
      });

      res.status(201).json(result);
    } catch (err) {
      console.error(err);
    }
  } else {
    try {
      stateInMongo.funfacts.push(...req.body.funfacts);
      const result = await stateInMongo.save();
      res.status(200).json(result);
    } catch (err) {
      console.error(err);
    }
  }
};

const patchFunFact = async (req, res) => {
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
  const state = newStatesArray.find((state) => state.code === req.params.state);
  const index = req?.body?.index;
  const funfact = req?.body?.funfact;
  //if there is no index
  if (!index) {
    return res
      .status(400)
      .json({ message: "State fun facts index value required" });
  } else if (!funfact) {
    return res.status(400).json({ message: "State fun facts value required" });
  }
  const stateInMongo = await States.findOne({
    stateCode: req.params.state,
  }).exec();
  if (!stateInMongo?.funfacts) {
    return res
      .status(400)
      .json({ message: `No fun facts found for ${states?.state}` });
  } else if (index < 1 || index > stateInMongo?.funfacts?.length) {
    return res.status(400).json({ message: `No fun fact found at that index` });
  }
  let newFunFacts = stateInMongo.funfacts;
  newFunFacts[index - 1] = funfact;
  await States.updateOne(
    { stateCode: req.params.state.toUpperCase() },
    { funfacts: newFunFacts }
  ).exec();
  const response = await States.findOne({
    stateCode: req.params.state.toUpperCase(),
  }).exec();
  res.send(response);
};

const deleteFunFact = async (req, res) => {
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
  const state = newStatesArray.find((state) => state.code === req.params.state);
  const index = req?.body?.index;
  //if there is no index
  if (!index) {
    return res
      .status(400)
      .json({ message: "State fun facts index value required" });
  }
  const stateInMongo = await States.findOne({
    stateCode: req.params.state,
  }).exec();
  if (!stateInMongo?.funfacts) {
    return res
      .status(400)
      .json({ message: `No fun facts found for ${states?.state}` });
  } else if (index < 1 || index > stateInMongo?.funfacts?.length) {
    return res.status(400).json({ message: `No fun fact found at that index` });
  }
  let newFunFacts = stateInMongo.funfacts;
  newFunFacts.splice(index - 1, 1);
  await States.updateOne(
    { stateCode: req.params.state.toUpperCase() },
    { funfacts: newFunFacts }
  ).exec();
  const response = await States.findOne({
    stateCode: req.params.state.toUpperCase(),
  }).exec();
  res.send(response);
};

module.exports = {
  getAllStates,
  getState,
  getStateFunFact,
  getStateCapital,
  getStateNickname,
  getStatePopulation,
  getStateAdmission,
  addFunFact,
  patchFunFact,
  deleteFunFact,
};
