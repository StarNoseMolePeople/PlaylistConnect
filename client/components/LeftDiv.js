import React, { useEffect, useState } from 'react';
import CreateUserPopup from './CreateUserPopup'
const LeftDiv = (props) => {
  console.log(props)
  const dummObj = {
    username: 'test'
  }
  return (
    <div className="div-round left-div">
      <h1>{dummObj.username}</h1>
      <button className='div-round' onClick={() =>{ props.setUserOpen(true) }}>Create User</button>
      <CreateUserPopup open={props.isUserOpen} onClose={() => props.setUserOpen(false)}>
        Test PopUp
      </CreateUserPopup>
    </div>
  );
};

export default LeftDiv