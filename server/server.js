const express = require('express');
const app = express();
const path = require('path');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri ='mongodb+srv://carlosfrev123:d3KkR6wrS8ZWDkQN@maindb.kcu0qnr.mongodb.net/?retryWrites=true&w=majority';
const db = require('./model.js');
const mongoose = require('mongoose');
const cors = require('cors');
const mainController = require('./controller.js');
// const PORT = 3000;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../client')));

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

// createUser
app.post('/user', mainController.createUser, (req, res) => {
  return res.status(200).json(res.locals.newUser);
});
app.post('/group', mainController.createGroup, (req, res) => {
  return res.status(200).json(res.locals.newGroup);
});
app.post('/playlist', mainController.createPlaylist, (req, res) => {
  return res.status(200).json(res.locals.newPlaylist);
});
app.post('/addGroup', mainController.addGroupToUser, (req, res) => {
  return res.status(200).json(res.locals.groupArr);
});
// in body add user object that you want to get
app.get('/user/:username', mainController.getUser, (req, res) => {
  return res.status(200).json(res.locals.foundUser);
});
//localhost:3000/group/1
app.get('/group/:groupID', mainController.getGroup, (req, res) => {
  return res.status(200).json(res.locals.foundGroup);
});
app.get('/playlist', mainController.getPlaylist, (req, res) => {
  return res.status(200).json(res.locals.foundPlaylist);
});
// // DELETE ALL GROUPS,PLAYLISTS, USERS
  // deleteAllGroups
app.delete('/group', mainController.deleteAllGroups, (req,res)=>{
  return res.status(200).json(res.locals.deletedGroups);
})
// deleteAllUsers
app.delete('/user', mainController.deleteAllUsers, (req,res)=>{
  return res.status(200).json(res.locals.deletedUsers);
})
// deleteAllPlay
app.delete('/playlist', mainController.deleteAllPlaylists, (req,res)=>{
  return res.status(200).json(res.locals.deletedPlaylists);
})



// app.get("/playlist",mainController.getPlaylist, (req, res) => {
//   return res.status(200);
// });

if (process.env.NODE_ENV === 'production') {
  // statically serve everything in the build folder on the route '/build'
  app.use('/build', express.static(path.join(__dirname, '../build/')));
  // serve index.html on the route '/'
  app.get('/', (req, res) => {
    return res
      .status(200)
      .sendFile(path.join(__dirname, '../client/index.html'));
  });
}

// Global error handler
app.use((err, req, res, next) => {
  console.log(err);
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

app.listen(3000, () => {
  console.log('server started on 3000', process.env.NODE_ENV);
});

module.exports = app;
