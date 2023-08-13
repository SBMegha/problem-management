const mongoose = require("mongoose");

const deptSchema = new mongoose.Schema({
  deptCode: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    taluk: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true
    },
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  problems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
    },
  ],
  govtSchemes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GovtScheme",
    },
  ],
  employees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Department = mongoose.model("Department", deptSchema);
module.exports = Department;
