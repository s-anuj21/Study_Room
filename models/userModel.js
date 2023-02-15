const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

// Designing User Schema
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
    validate: [validator.isEmail, 'Please enter a valid email'],
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
    // select: false, // to avoid sending password, while sending other data via api
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

// Encrypting the password
userSchema.pre('save', async function (next) {
  // If the password is not updated while updating the user, we do not need to ecrypt it
  if (!this.isModified('password')) next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Creating a instance method on user schema to validate password
userSchema.methods.correctPassword = async (enteredPass, dbPass) =>
  await bcrypt.compare(enteredPass, dbPass);

const User = mongoose.model('User', userSchema);

module.exports = User;

// const user = new User({
//   name: 'Anuj',
//   email: 'anuj21@gmail.com',
// });

// user.save().then((doc) => {
//   console.log(doc);
// });
