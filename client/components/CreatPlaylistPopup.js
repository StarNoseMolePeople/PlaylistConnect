import React from "react";

const STYLE = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: "50px",
  backgroundColor: "#FFF",
  zIndex: 1000,
};

const OVERLAY_STYLE = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .7)",
  zIndex: 1000,
};

/*

  playlistName: { type: String },
  description: { type: String, required: true },
  genre: { type: String },
  playlistID: { type: String, required: true },
  playlistURL: { type: String, required: true },
  groupID: { type: String, required: true },
  playlistOwner: { type: String, required: true },
});

*/
export default function CreatePlaylistPopup({ open, children, onClose }) {
  const buttonClick = () => {
    // 1
    grabFormFields();
    // 2
    // (onClose());
  };
  function regexGetID(url) {
    console.log(url, "this is the url");
    //https://open.spotify.com/playlist/1CGWsx59an7hhc0SWZWsoG?si=07a7832e0e9f411d
    //https://open.spotify.com/playlist/0njqI80SiF1vxq5QVyyFP2
    const regex1 = /.+(?=\?)/gi;
    const regex2 = /(?<=playlist\/).+/gi;
    const str = regex1.exec(url);
    console.log(str, "this is the first");
    let str2;
    if (str === null) {
      str2 = regex2.exec(url);
    } else {
      str2 = regex2.exec(str[0]);
    }
    console.log(str2);
    return str2[0];
  }
  const grabFormFields = () => {
    const form = document.getElementById("createPlaylistForm");

    form.addEventListener("submit", (event) => {
      console.log("listner is listening");
      event.preventDefault();
      const playlistName = document.getElementById("playlistName").value;
      const description = document.getElementById("description").value;
      const genre = document.getElementById("genre").value;
      const playlistURL = document.getElementById("URL").value;
      const playlistID = regexGetID(playlistURL);
      const groupID = document.getElementById("Group ID").value;
      const playlistOwner = document.getElementById("Playlist Owner").value;
      //   console.log(playlistName);

      const playlistData = {
        playlistName,
        description,
        genre,
        playlistID,
        playlistURL,
        groupID,
        playlistOwner,
      };
      fetch("http://localhost:8080/playlist", {
        method: "POST",
        body: JSON.stringify(playlistData),
        headers: { "Content-type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Playlist Obj Created: ", data);
          form.reset();
          onClose();
        })
        .catch((error) => console.error("Not created.", error));
    });
  };
  if (!open) return null;

  return (
    <>
      <div style={OVERLAY_STYLE}>
        <div style={STYLE}>
          <form id="createPlaylistForm" action="/playlist" method="post">
            <h2>Add Playlist to Group</h2>
            <div>
              <label htmlFor="playlistName">Playlist Name:</label>
              <input
                type="text"
                id="playlistName"
                placeholder="enter playlist name"
              />
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                placeholder="enter description"
              />
              <label htmlFor="genre">Genre:</label>
              <input type="text" id="genre" placeholder="enter genre" />
              {/* <label htmlFor="Playlist ID">ID:</label> */}
              {/* <input type="text" id="Playlist ID" placeholder="enter ID" /> */}
              <label htmlFor="Playlist URL">URL:</label>
              <input type="text" id="URL" placeholder="enter URL" />
              <label htmlFor="Group ID">Group ID:</label>
              <input type="text" id="Group ID" placeholder="enter group ID" />
            </div>
            <label htmlFor="Playlist Owner">Playlist Owner:</label>
            <input
              type="text"
              id="Playlist Owner"
              placeholder="enter Playlist Owner"
            />
            <button id="submitButton" type="submit" onClick={buttonClick}>
              Submit
            </button>
          </form>
          <button
            className="closeButton"
            type="closeAndSubmit"
            onClick={onClose}
          >
            Close
          </button>
          {/* {children} */}
        </div>
      </div>
    </>
  );
}
// action="/playlist" method="post"

// document.querySelector('#submitButton').addEventListener('click', (event)=> {
//     // create a new object {createdat: createby: message:}

//     const today = new Date();
//     const timeStamp = today.toISOString();

//     const sending = {
//       message: messageInput.value,
//       created_at: timeStamp,
//       created_by: user.value
//     };

//     console.log(stringIt(sending));
//     // console.log(`button`, submitButton.value)
//   })

// document.body.appendChild(form);

//     /*
//         Return form in popup:
//             input fields as follows:
//                 playlistName: string,
//                 description: string,
//                 genre: string (for now),
//                 playlistURL: string,
//     */
