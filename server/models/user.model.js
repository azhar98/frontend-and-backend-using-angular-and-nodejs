const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    default:false
  }
});

UserSchema.methods.setPassword = function (password) {
  this.hash = bcrypt.hashSync(password, 10);
}

UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.hash);
}

UserSchema.methods.generateJwt = function () {
  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    admin: this.admin
  }, config.JWT_SECRET, { expiresIn: '1h' });
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
