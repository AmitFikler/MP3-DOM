/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {Number} songId - the ID of the song to play
 */
function playSong(songId) {
    const element = document.querySelectorAll('.songs');
    for (let i of element) {
        if (i.classList.contains("playing")) {
            i.classList.remove("playing")
    }
    const x = document.getElementById(songId)
    x.classList.add("playing")
    }
}


/**
 * Removes a song from the player, and updates the DOM to match.
 *
 * @param {Number} songId - the ID of the song to remove
 */
function removeSong(songId) {
    const thisSong = document.getElementById(songId)
    thisSong.remove()

    // const removeIndexSongs = player.songs.findIndex( item => item.id === songId );
    // player.songs.splice( removeIndexSongs, 1 ); //remove from songs 
}



/**
 * Adds a song to the player, and updates the DOM to match.
 */
const getSong = document.getElementById('songs')
function addSong({ title, album, artist, duration, coverArt }) {
    const newSong = {title, album, artist, duration, coverArt}
    const createdSong = createSongElement(newSong);
    getSong.appendChild(createdSong);
    attachingButtonsToSong(createdSong)
}




/**
 * Acts on a click event on an element inside the songs list.
 * Should handle clicks on play buttons and remove buttons of songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleSongClickEvent(event) {
    if (event.target.innerText === "🗑️") {
        removeSong(this.id)

    }
    if (event.target.innerText === "▶️"){
        playSong(this.id)
    }
}







/**
 * Handles a click event on the button that adds songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleAddSongEvent(event) {   //FINISH!!!!
    const newSong = {
        id: generateId(getListOfId()),
        title: getInputValueOf("title"),
        album: getInputValueOf("album"),
        artist: getInputValueOf("artist"),
        duration: mmssToSeconds(getInputValueOf("duration")),
        coverArt: getInputValueOf("cover-art")
    }
    player.songs.push(newSong)
    const createdSong = createSongElement(newSong);
    getSong.appendChild(createdSong);
    attachingButtonsToSong(createdSong);
    createdSong.addEventListener("click",handleSongClickEvent);
    const songAddedText = document.createElement("div")
    songAddedText.textContent = "The song was successfully added"
    songAddedText.style.color = "green"
    document.body.insertBefore(songAddedText,songHeader)
    setTimeout(function(){
        songAddedText.remove()},2200)
    
}

/**
 * Creates a song DOM element based on a song object.
 */
 function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const titleEl = createElement("h3",[title],["text"])
    const artistEl = createElement("h5", [` Artist: ${artist}`],["text"]);
    const albumEl = createElement("h5", [` Album: ${album}`],["text"]);
    const durationEl = createElement("h5", [" " + convertDuration(duration)] ,[durationClass(duration),"text"], {});
    const coverImageArtUrl = coverArt;
    const imgEl = createElement("img", [] ,["album-art"], {src: coverImageArtUrl});

    return createElement("div", [titleEl , artistEl,albumEl, durationEl, imgEl],["songs"],{id: id + "song"});
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
 function createPlaylistElement({ id, name, songs }) {
    const nameEl = createElement("h3", ["album: " + name], ["album"])
    const songsEl = createElement("h5", [convertDuration(playlistDuration(id))])
    return createElement("div", [nameEl, songsEl],["playlists"],{id: "playlist" + id})
}

/**
 * Creates a new DOM element.
 *
 * Example usage:
 * createElement("div", ["just text", createElement(...)], ["nana", "banana"], {id: "bla"}, {click: (...) => {...}})
 *
 * @param {String} tagName - the type of the element
 * @param {Array} children - the child elements for the new element.
 *                           Each child can be a DOM element, or a string (if you just want a text element).
 * @param {Array} classes - the class list of the new element
 * @param {Object} attributes - the attributes for the new element
 * @param {Object} eventListeners - the event listeners on the element
 */
function createElement(tagName, children = [], classes = [], attributes = {}, eventListeners = {}) {
    const el = document.createElement(tagName);
    
  // Children
    for(const child of children) {
        el.append(child);
    }

  // Classes
    for(const cls of classes) {
        el.classList.add(cls);
    }

  // Attributes
    for (const attr in attributes) {
        el.setAttribute(attr, attributes[attr]);
    }

  // Eventlistners
  for (e in eventListeners) {
      el.addEventListener(e,eventListeners[e])
  }

return el;
}

/**
 * Inserts all songs in the player as DOM elements into the songs list.
 */
// const getSong = document.getElementById('songs')
function generateSongs() {
    player.songs.sort((a,b) => (a.title>b.title) ? 1 : -1)
    for (let song of player.songs) { 
        const songEl = createSongElement(song)
        songEl.addEventListener("click", handleSongClickEvent)
        attachingButtonsToSong(songEl)
        getSong.appendChild(songEl)
    
    }
}

/**
 * Inserts all playlists in the player as DOM elements into the playlists list.
 */
function generatePlaylists() {
    for (let playlist of player.playlists) {
        const getPlaylist = document.getElementById('playlists')
        const playlistEl = createPlaylistElement(playlist)
        getPlaylist.appendChild(playlistEl)
    
    }    
}

// Creating the page structure
generateSongs()
generatePlaylists()

// Making the add-song-button actually do something
document.getElementById("add-button").addEventListener("click", handleAddSongEvent)


function convertDuration(num) { //Converts seconds to MM:SS format
    let mins = Math.floor(num / 60);
    let sec = num % 60;
    return mins.toString().padStart(2, '0') + ':' + sec.toString().padStart(2, '0');
}

function getSongById(id) { //Gets an ID and provides the details about the relevant song
    for (let key of player.songs) {
      if (key.id === id) {
        return key;
      }
    }
}
function playlistDuration(id) {  // A function that returns the duration of all the songs in the playlist it receives
    count = 0 ;
    for (let song of player.playlists) {
      if (song["id"] === id) {
        for(let i of song["songs"])
          count += getSongById(i)["duration"];
      }
    }
    return count;
}

function durationClass(num) {
  if (num < 180) return "small-dration";
  else if (num > 180 || num < 420) return "medium-dration";
  else if (num > 420) return "high-dration"
}


// let a = prompt("what is your name?")
// let header = document.getElementById("header")
// header.textContent = `🎵 ${a} player! 🎵`


function playBtn(song) {
    song.insertAdjacentHTML("afterbegin", '<div class="start-btn start-stop-delete">▶️</div>');
    song.insertAdjacentHTML("afterbegin", '<div class="stop-btn start-stop-delete">⏸️</div>');
}

function trashBtn(song) {
    song.insertAdjacentHTML("afterbegin", '<div class="remove-btn start-stop-delete">🗑️</div>');
}
function attachingButtonsToSong(song){
    playBtn(song)
    trashBtn(song)
}

const addSongText = document.getElementById("add-song-header")
const songHeader = document.getElementById("songs")
const addSection = document.getElementById("add-section")



addSongText.addEventListener("click",openAddBar); //open add song navbar
function openAddBar() {
    addSection.classList.toggle('open')
}


function getInputValueOf(id) {
    return document.getElementById(id).value
}

function mmssToSeconds(mmss) { //Convert MM:SS string to seconds
    let splitMmSs = mmss.split(':');
    let seconds = (+splitMmSs[0]) * 60 + (+splitMmSs[1]);
    return seconds;
  }



function generateId(arr) {  //If the user does not give Id, the function produces independently.
    newArrId = arr.slice();
    newArrId.sort((a,b) => a-b);
    return newArrId[newArrId.length - 1] + 1;
}

function getListOfId() {
    const Idlist = player.songs.map(x => x["id"])
    return Idlist
}
