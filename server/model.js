const mongoose = require('mongoose');

// add schemas here
const playlistObjectSchema = new mongoose.Schema({
  playlistName: { type: String },
  description: { type: String, required: true },
  genre: { type: String },
  playlistID: { type: String, required: true },
  playlistURL: { type: String, required: true },
  groupID: { type: String, required: true },
  playlistOwner: { type: String, required: true },
});

const groupObjectSchema = new mongoose.Schema({
  groupName: { type: String, required: true },
  groupID: { type: String, required: true },
  playlists: [playlistObjectSchema],
});

const userObjectSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, require: true },
  // userID: {type: String, required: true},
  groups: [String],
});

const mainObjectSchema = new mongoose.Schema({
  groups: [groupObjectSchema],
  users: [userObjectSchema],
  playlists: [playlistObjectSchema],
});
const MainObject = mongoose.model('MainObject', mainObjectSchema);
const UserObject = mongoose.model('UserObject', userObjectSchema);
const PlaylistObject = mongoose.model('playlistObject', playlistObjectSchema);
const GroupObject = mongoose.model('groupObject', groupObjectSchema);

module.exports = { MainObject, UserObject, PlaylistObject, GroupObject };

// https://excalidraw.com/#room=a7782a1ad376492ae05c,waDbJmSwnQ6M8FN9FN8YgA
