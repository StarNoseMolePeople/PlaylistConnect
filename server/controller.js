const {
  MainObject,
  UserObject,
  PlaylistObject,
  GroupObject,
} = require('./model.js');

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
          log: 'Error in controller.js/mainController.createUser',
          status: 400,
          message: { err: 'ERROR: unable to create user.' },
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
          log: 'Error in controller.js/mainController.getUser',
          status: 400,
          message: { err: 'ERROR: unable to retrieve user.' },
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
          log: 'Error in controller.js/mainController.createGroup',
          status: 400,
          message: { err: 'ERROR: unable to create group.' },
        });
      });
  },

  getGroup(req, res, next) {
    const { groupID } = req.params;
    GroupObject.findOne({ groupID: groupID })
      .then((group) => {
        res.locals.foundGroup = group;
        console.log('get worked this is the group : ', group);
        return next();
      })
      .catch((err) => {
        return next({
          log: 'Error in controller.js/mainController.getGroup',
          status: 400,
          message: { err: 'ERROR: unable to retrieve group.' },
        });
      });
  },
  addGroupToUser(req, res, next) {
    console.log('addGroupToUser');
    const { username, groupID } = req.body;
    UserObject.findOne({ username: username })
      .then((user) => {
        console.log('loggin user', user);
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
          log: 'Error in controller.js/mainController.getGroup',
          status: 400,
          message: { err: 'ERROR: unable to retrieve group.' },
        });
      });
  },

  // ---------------------------- PLAYLIST CONTROLLER ----------------------------
  // createPlaylist
  createPlaylist(req, res, next) {
    const { description, playlistID, playlistURL, groupID, playlistOwner } =
      req.body;
    // groups[groupID][playlist].push(create new object)
    //
    // GroupObject.findOne({ groupID: groupID }).then
    PlaylistObject.create({
      description,
      playlistID,
      playlistURL,
      groupID,
      playlistOwner,
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
          log: 'Error in controller.js/mainController.createPlaylist',
          status: 400,
          message: { err: 'ERROR: unable to create playlist.' },
        });
      });
  },

  // when adding playlist to group
  // need to find and update on group object ->
  // access playlists array and push the newly created playlist object to that array.
}; // mainController end curly bracket (DO NOT DELETE)
module.exports = mainController;
