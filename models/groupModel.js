const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

// DESIGNING USER SCHEMA
const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A Group must have a name.'],
  },

  subject: {
    type: String,
    required: [true, 'A Group must have a subject.'],
  },

  admin: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A group must have a admin.'],
  },

  members: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],

  studyItems: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'StudyItem',
    },
  ],
  image: String,
  active: {
    type: Boolean,
    default: true,
  },

  startDate: {
    type: Date,
    default: Date.now(),
  },

  endDate: {
    type: String,
  },

  // THIS IS JUST FOR SHORT TERM PURPOSES, FOR JOINING GROUPS
  groupJoinToken: [{ type: String }],
  groupJoinTokenExpires: [{ type: Date }],
});

groupSchema.methods.createJoinToken = async function () {
  // GENERATING 16 CHARACTER STRING
  const token = crypto.randomBytes(8).toString('hex');

  if (this.groupJoinToken.length > 10) {
    this.groupJoinToken.shift();
    this.groupJoinTokenExpires.shift();
  }
  this.groupJoinToken.push(await bcrypt.hash(token, 8));

  this.groupJoinTokenExpires.push(Date.now() + 6 * 60 * 60 * 1000);
  await this.save();
  return token;
};

const compareJoinToken = async (enteredToken, dbTokens) => {
  let flag = false;
  for (let i = 0; i < dbTokens.length; i++)
    flag = flag || (await bcrypt.compare(enteredToken, dbTokens[i]));

  return flag;
};

// CREATING A INSTANCE METHOD ON GROUP SCHEMA TO VALIDATE TOKEN
groupSchema.methods.correctJoinToken = async (enteredToken, dbTokens) => {
  const flag = await compareJoinToken(enteredToken, dbTokens);
  return flag;
};

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
