const mongoose = require("mongoose");
const AdminSchema = mongoose.Schema;

const adminModule = new AdminSchema({
  userName: {
      type: "string",
      required: true,
      min:6
  },
  email: {
    type: String,
     match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min:8
  },
  refreshToken: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    required: true,
  },
  uniqid:{
    type:String,
    default:""
  }
});

module.exports = mongoose.model("zoomadmins", adminModule);
