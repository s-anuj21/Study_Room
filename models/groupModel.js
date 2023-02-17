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
  leader: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A group must have a leader.'],
  },
  members: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  studyMaterial: [
    {
      type: String,
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
  groupJoinToken: String,
  groupJoinTokenExpires: Date,
});

groupSchema.methods.createJoinToken = async function () {
  // GENERATING 16 CHARACTER STRING
  const token = crypto.randomBytes(8).toString('hex');
  this.groupJoinToken = await bcrypt.hash(token, 8);
  this.groupJoinTokenExpires = Date.now() + 6 * 60 * 60 * 1000;
  return token;
};

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
