/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */


function playSong(songId) {
    const element = document.querySelectorAll('.songs');
    for (let i of element) {
        if (i.classList.contains("playing")) {
            i.classList.remove("playing")
    }
    const x = document.getElementById(songId+"song")
    x.classList.add("playing")
    }
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
 * createElement("div", ["just text", createElement(...)], ["nana", "banana"], {id: "bla"})
 *
 * @param {String} tagName - the type of the element
 * @param {Array} children - the child elements for the new element.
 *                           Each child can be a DOM element, or a string (if you just want a text element).
 * @param {Array} classes - the class list of the new element
 * @param {Object} attributes - the attributes for the new element
 */
function createElement(tagName, children = [], classes = [], attributes = {}) {
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

return el;
}

// You can write more code below this line



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

for (let song of player.songs) {
    const getSong = document.getElementById('songs') 
    const songEl = createSongElement(song)
    getSong.appendChild(songEl)

}

for (let playlist of player.playlists) {
    const getPlaylist = document.getElementById('playlists')
    const playlistEl = createPlaylistElement(playlist)
    getPlaylist.appendChild(playlistEl)

}

function durationClass(num) {
  if (num < 120) return "small-dration";
  else if (num > 120 || num < 420) return "medium-dration";
  else if (num > 420) return "high-dration"
}

const body = document.body
const firstChild = body.firstChild;
const header = document.createElement("h1")
header.textContent = `🎵 MP3 Player 🎵`
const songsHeader = document.createElement("h2")
songsHeader.textContent = "songs:"
const playlistHeader = document.createElement("h2")
playlistHeader.textContent = "playlists: "
const playlists = document.getElementById("playlists")
body.insertBefore(header, firstChild)
body.insertBefore(songsHeader, firstChild)
body.insertBefore(playlistHeader,playlists)
