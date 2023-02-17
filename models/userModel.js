const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

// DESIGNING USER SCHEMA
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Name is required.'],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, 'Email is required.'],
  },
  groups: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Group',
    },
  ],
  image: String,
  password: {
    type: String,
    required: [true, ''],
    minlength: [6, 'Password must be of atleast 8 character'],
  },
  active: {
    type: Boolean,
    default: true,
  },

  joinedOn: {
    type: Date,
    default: Date.now(),
  },
});

// ENCRYPTING THE PASSWORD
userSchema.pre('save', async function (next) {
  // IF THE PASSWORD IS NOT UPDATED WHILE UPDATING THE USER, WE DO NOT NEED TO ECRYPT IT
  if (!this.isModified('password')) next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// CREATING A INSTANCE METHOD ON USER SCHEMA TO VALIDATE PASSWORD
userSchema.methods.correctPassword = async (enteredPass, dbPass) =>
  await bcrypt.compare(enteredPass, dbPass);

const User = mongoose.model('User', userSchema);

module.exports = User;
