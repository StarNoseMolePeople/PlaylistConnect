const {
  MainObject,
  UserObject,
  PlaylistObject,
  GroupObject,
} = require("./model.js");

//add controllers below

// post
const mainController = {
  // ---------------------------- USER CONTROLLER ----------------------------
  createUser(req, res, next) {
    const { username, password } = req.body;
    UserObject.create({ username, password })
      .then((user) => {
        res.locals.newUser = user;
        // console.log(user);
        return next();
      })
      .catch((err) => {
        return next({
          log: "Error in controller.js/mainController.createUser",
          status: 400,
          message: { err: "ERROR: unable to create user." },
        });
      });
  },
  //http://localhost:3000/user/dummyUser1
  getUser(req, res, next) {
    const { username } = req.params;
    //console.log(username);
    UserObject.findOne({ username: username })
      .then((user) => {
        res.locals.foundUser = user;
        return next();
      })
      .catch((err) => {
        return next({
          log: "Error in controller.js/mainController.getUser",
          status: 400,
          message: { err: "ERROR: unable to retrieve user." },
        });
      });
  },

  // ---------------------------- GROUP CONTROLLER ----------------------------
  // createGroup
  createGroup(req, res, next) {
    const { groupName, groupID } = req.body;
    GroupObject.create({ groupName, groupID })
      .then((group) => {
        res.locals.newGroup = group;
        console.log(group);
        return next();
      })
      .catch((err) => {
        return next({
          log: "Error in controller.js/mainController.createGroup",
          status: 400,
          message: { err: "ERROR: unable to create group." },
        });
      });
  },

  getGroup(req, res, next) {
    const { groupID } = req.params;
    GroupObject.findOne({ groupID: groupID })
      .then((group) => {
        res.locals.foundGroup = group;
        console.log("get worked this is the group : ", group);
        return next();
      })
      .catch((err) => {
        return next({
          log: "Error in controller.js/mainController.getGroup",
          status: 400,
          message: { err: "ERROR: unable to retrieve group." },
        });
      });
  },
  addGroupToUser(req, res, next) {
    console.log("addGroupToUser");
    const { username, groupID } = req.body;
    UserObject.findOne({ username: username })
      .then((user) => {
        console.log("loggin user", user);
        user.groups.push(groupID);
        return user.save();
        //user.updateOne({ $push: { groups: groupID } });
        // res.locals.groupArr = user.groups;
      })
      .then((user) => {
        return next();
      })
      .catch((err) => {
        console.log(err);
        return next({
          log: "Error in controller.js/mainController.getGroup",
          status: 400,
          message: { err: "ERROR: unable to retrieve group." },
        });
      });
  },

  // ---------------------------- PLAYLIST CONTROLLER ----------------------------
  // createPlaylist
  createPlaylist(req, res, next) {
    const {
      description,
      playlistID,
      playlistURL,
      groupID,
      playlistOwner,
      genre,
    } = req.body;
    // groups[groupID][playlist].push(create new object)
    //
    // GroupObject.findOne({ groupID: groupID }).then
    PlaylistObject.create({
      description,
      playlistID,
      playlistURL,
      groupID,
      playlistOwner,
      genre,
    })
      .then((playlist) => {
        GroupObject.findOne({ groupID: groupID })
          .then((obj) => {
            obj.playlists.push(playlist);
            return obj.save();
          })
          .then((obj) => {
            res.locals.newPlaylist = obj.playlists;
            return next();
          });
      })
      .catch((err) => {
        console.log(err);
        return next({
          log: "Error in controller.js/mainController.createPlaylist",
          status: 400,
          message: { err: "ERROR: unable to create playlist." },
        });
      });
  },

  // FOR DELETING ALL - JUST FOR DEBUGGING AND ORGANIZATION PURPOSES

  deleteAllUsers(req, res, next) {
    console.log("deleteAllUsers");
    UserObject.deleteMany({})
      .then((users) => {
        console.log(users);
        res.locals.deletedUsers = users;
        next();
      })
      .catch((err) => {
        console.log(err);
        return next({
          log: "Error in controller.js/mainController.deleteAllUsers",
          status: 500,
          message: { err: "ERROR: unable to delete all users" },
        });
      });
  },
  deleteAllGroups(req, res, next) {
    console.log("deleteAllGroups");
    GroupObject.deleteMany({})
      .then((groups) => {
        console.log(groups);
        res.locals.deletedGroups = groups;
        next();
      })
      .catch((err) => {
        console.log(err);
        return next({
          log: "Error in controller.js/mainController.deleteAllGroups",
          status: 500,
          message: { err: "ERROR: unable to delete all groups" },
        });
      });
  },

  deleteAllPlaylists(req, res, next) {
    console.log("deleteAllPlaylist");
    PlaylistObject.deleteMany({})
      .then((playlists) => {
        console.log(playlists);
        res.locals.deletedPlaylists = playlists;
        next();
      })
      .catch((err) => {
        console.log(err);
        return next({
          log: "Error in controller.js/mainController.deleteAllPlaylists",
          status: 500,
          message: { err: "ERROR: unable to delete all playlists" },
        });
      });
  },

  // add functionality to delete all playlists from a group

  // deletePlaylist

  // deleteAll for organization purposes

  // when adding playlist to group
  // need to find and update on group object ->
  // access playlists array and push the newly created playlist object to that array.
  // playlist/:groupID
  getPlaylist(req, res, next) {
    const groupID = req.query.playlistID;
    console.log(req.query.playlistID);
    GroupObject.findOne({ groupID: groupID })
      .then((group) => {
        res.locals.foundPlaylist = group.playlists;
        console.log(group.playlists);
        return next();
      })
      .catch((err) => {
        console.log(err);
        return next({
          log: "Error in controller.js/mainController.getPlaylist",
          status: 400,
          message: { err: "ERROR: unable to retrieve user." },
        });
      });
  },
}; // mainController end curly bracket (DO NOT DELETE)
module.exports = mainController;
