const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  alignment: {
    type: String
  },
  race: {
    type: String
  },
  height: {
    type: Number
  },
  birthdate: {
    type: Date,
  },
  location: {
    type: String
  },
  skills: {
    type: [String],
  },
  bio: {
    type: String
  },
  social: [{
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    instagram: {
      type: String
    }
  }],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
