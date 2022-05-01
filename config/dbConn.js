const mongoose = require("mongoose");
const statesSchema = require("../models/States");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    // const funfacts = {
    //   stateCode: "CO",
    //   funfacts:
    //     "In Colorado, it is unlawful to mutilate a rock in a state park",
    // };

    // await new statesSchema(funfacts).save();
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;
