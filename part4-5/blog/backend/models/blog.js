const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minLength: 5,
  },
  author: {
    type: String,
    required: [true, "Author is required"],
    minLength: 5,
  },
  url: {
    type: String,
    required: [true, "URL is required"],
    minLength: 5,
  },
  likes: {
    type: Number,
    required: [true, "Number is required"],
    validate: {
      validator: function (v) {
        return v >= 0;
      },
      message: (props) => `${props.value} must be positive.`,
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
