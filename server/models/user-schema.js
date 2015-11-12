var db = require('../config/db');

// Define a Schema.
var UserSchema = db.Schema({
  username: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  password_digest: { type: String, required: true },
  updated_at: { type: Date, default: Date.now() }
});
// Define pre-execution steps for the specified method.
UserSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  // Continue on with the next action.
  next();
});

UserSchema.methods.toJSON = function() {
  // .toObject() allows alteration of the schema object in mongoose.
  var object = this.toObject();
  delete object.password_digest;
  delete object.__v;
  return object;
};

// Allow the Schema to be returned when calling require('thisfile.js')
module.exports = UserSchema;
