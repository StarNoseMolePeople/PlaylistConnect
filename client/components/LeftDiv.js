import React, { useEffect, useState } from 'react';
import CreateUserPopup from './CreateUserPopup';
const LeftDiv = (props) => {
  console.log('this is the currentUser', props.currentUser);
  const [allGroups, getallGroups] = useState();
  const dummObj = {
    username: 'test',
  };
  console.log('this is gen groups', Array.isArray(props.currentUser.groups));
  useEffect(() => {
    const arr = props.currentUser.groups;
    console.log('loggin inside userEffect', arr);
    generateAllPlaylist(arr);
  }, [props.currentUser]);

  function generateAllPlaylist(arr) {
    function getGroup(id) {
      console.log('calling get palylist');
      fetch(`http://localhost:3000/playlist?playlistID=${id}`)
        .then((res) => {
          console.log('there is a res');
          return res.json();
        })
        .then((res) => {
          console.log(res, 'hitting me');
          props.updatePlaylist(res);
          console.log(res);
        });
    }
    const groupDiv = arr?.map((id) => (
      <div
        key={`groupID_${id}`}
        id={`groupID_${id}`}
        onClick={() => getGroup(id)}
      >
        {id}
      </div>
    ));
    getallGroups(groupDiv);
  }
  return (
    <div className="div-round left-div">
      <h3>{props.currentUser.username}</h3>
      {allGroups}
      <button
        className="div-round"
        onClick={() => {
          props.setUserOpen(true);
        }}
      >
        Create User
      </button>
      <CreateUserPopup
        open={props.isUserOpen}
        onClose={() => props.setUserOpen(false)}
      >
        Testing PopUp
      </CreateUserPopup>
    </div>
  );
};

export default LeftDiv;
