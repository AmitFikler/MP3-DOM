/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {Number} songId - the ID of the song to play
 */
function playSong(songId) {
    // Your code here
}

/**
 * Removes a song from the player, and updates the DOM to match.
 *
 * @param {Number} songId - the ID of the song to remove
 */
function removeSong(songId) {
    // Your code here
}

/**
 * Adds a song to the player, and updates the DOM to match.
 */
function addSong({ title, album, artist, duration, coverArt }) {
    // Your code here
}

/**
 * Acts on a click event on an element inside the songs list.
 * Should handle clicks on play buttons and remove buttons of songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleSongClickEvent(event) {
    // Your code here
}

/**
 * Handles a click event on the button that adds songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleAddSongEvent(event) {
    addSongText.addEventListener("click",openAddBar);
    
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

    return createElement("div", [titleEl , artistEl,albumEl, durationEl, imgEl],["songs"],{ onclick: `playSong(${id})`, id: id + "song"});
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
      el.setAttribute(e,eventListeners[e])
  }

return el;
}

/**
 * Inserts all songs in the player as DOM elements into the songs list.
 */
const getSong = document.getElementById('songs')
function generateSongs() {
    for (let song of player.songs) { 
        const songEl = createSongElement(song)
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

// const body = document.body
// const firstChild = body.firstChild;
// const header = document.createElement("h1")
// header.textContent = `🎵 MP3 Player 🎵`
// const songsHeader = document.createElement("h2")
// songsHeader.textContent = "songs:"
// const playlistHeader = document.createElement("h2")
// playlistHeader.textContent = "playlists: "
// const playlists = document.getElementById("playlists")
// body.insertBefore(header, firstChild)
// body.insertBefore(songsHeader, firstChild)
// body.insertBefore(playlistHeader,playlists)

// let a = prompt("what is your name?")
// let header = document.getElementById("header")
// header.textContent = `🎵 ${a} player! 🎵`


let panes  = document.querySelectorAll(".songs")

function trash(song) {
    song.insertAdjacentHTML("afterbegin", '<span class="remove-button">🗑️</span>');
    song.firstChild.onclick = () => song.remove();

}
for (let pane of panes) {
    trash(pane)
}

const addSongText = document.getElementById("add-song-header")
const rightArr = document.getElementById("right-arr")
const downArr = document.getElementById("down-arr")
const inputs = document.getElementById("inputs")
const addBtn = document.getElementById("add-button")
const songHeader = document.getElementById("songs")




addSongText.addEventListener("click",openAddBar);
function openAddBar() {
    if (rightArr.style.display === "inline") {
        rightArr.style.display = "none"
        downArr.style.display = "inline"
        inputs.style.display = "inline"
        addBtn.style.display= "inline"
    }else {
        rightArr.style.display = "inline"
        downArr.style.display = "none"
        inputs.style.display = "none"
        addBtn.style.display= "none"
    }
}

addBtn.addEventListener("click", addToSongsArray);
function addToSongsArray(e) {
    const newSong = {
        id: "",
        title: document.getElementById('title').value,
        album: document.getElementById('album').value,
        artist: document.getElementById('artist').value,
        duration: document.getElementById('duration').value,
        coverArt: document.getElementById('cover-art').value
    }
    const createSong = createSongElement(newSong);
    getSong.appendChild(createSong);
    trash(createSong)
    
}

addBtn.addEventListener("click",songAdded);

function songAdded() {
    const songAddedText = document.createElement("div")
    songAddedText.textContent = "The song was successfully added"
    songAddedText.style.color = "green"
    document.body.insertBefore(songAddedText,songHeader)
    setTimeout(function(){ 
        songAddedText.remove()},2200)
    
}



