const mongoose = require("mongoose");

const uri = `mongodb+srv://${process.env.MONGO_USER}:${encodeURIComponent(
  process.env.MONGO_PASS
)}@${process.env.MONGO_CLUSTER}.5irakc7.mongodb.net/${
  process.env.MONGO_DATABASE
}?retryWrites=true&w=majority`;
mongoose.set("strictQuery", false);
mongoose
  .connect(uri)
  .then((_) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const schema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: [true, "Name is required"],
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /^\d{2,3}-\d{6,}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, "User phone number required"],
  },
});

schema.set("toJSON", {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", schema);
