const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }
  ],
  register_date: { type: Date, default: Date.now },
  followers: {
    type: []
  },
  following: {
    type: []
  }
});

module.exports = mongoose.model('User', UserSchema);
