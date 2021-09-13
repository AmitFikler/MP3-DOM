/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */


function playSong(songId) {
    if (document.getElementsByClassName("nowPlaying").length!==0){
        const previuslyPlayed = document.getElementsByClassName("nowPlaying")
        previuslyPlayed[0].classList.remove("nowPlaying")
    }
    const song = document.getElementById(`song${songId}`)
    song.classList.add("nowPlaying")
    return song

}
/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const children = []
    const classes = ["continerSongs", "songs"]
    const ul = document.createElement("ul");
    const img = document.createElement("img");
    img.src = arguments[5]
    for (let i = 1; i < arguments.length - 1; i++) {
        if (i === 4) {
            arguments[4] = convertDuration(arguments[4])
        }
        const li = document.createElement("li")
        li.innerText = arguments[i] + "-";
        ul.append(li)
    }
    ul.appendChild(img)
    children.push(ul)
    const attrs = {onclick: `playSong(${id})`}
    return createElement("ul", children, classes, attrs)
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
    const children = []
    const ul = document.createElement("ul")
    for (let i = 1; i < arguments.length; i++) {
        const li = document.createElement("li")
        li.innerText = arguments[i]
        ul.append(li)
    }
    children.push(ul)
    const classes = ["playlists","continerSongs" ]
    const attrs = {id: id}
    return createElement("div", children, classes, attrs)
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
    const element = document.createElement(tagName);
    for (let child of children) {
        element.append(child);
    }
    for (let cls of classes) {
        element.classList.add(cls);
    }
    for (let attr in attributes) {
        element.setAttribute(attr, attributes[attr]);
    }
    return element;
}

// You can write more code below this line

function buildSongList(songs) {
    const songList = []  
    for (let song of songs) {
        songList.push(song);
        createSongElement(song)
    }
    songList.sort((a,b) => (a.title.toLowerCase() > b.title.toLowerCase()) ? 1 : -1);
    return songList
}

function buildPlaylistList(playlists){
    const playlistList = []
    for (let playlist of playlists) {
        playlistList.push(playlist);
        createPlaylistElement(playlist)
    }
    playlistList.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1);
    return playlistList

}

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

const songs = document.getElementById("songs")
const playlists = document.getElementById("playlists")
const siteHeader = document.createElement("header")
const headerContent = document.createElement("h1")
headerContent.innerText = `MP3 Player`
const songHeader = document.createElement("h2")
songHeader.innerText = `Songs`
siteHeader.append(headerContent, songHeader)
document.body.insertBefore(siteHeader, songs)
const playlistHeader = document.createElement("h2")
playlistHeader.innerText = `Playlists:`
document.body.insertBefore(playlistHeader, playlists)

function appendSong() {
    buildSongList(player.songs).forEach((song) => {
        const { id, title, album, artist, duration, coverArt } = song
        const newSong = createSongElement(id, title, album, artist, duration, coverArt)
        newSong.classList.add("song" + id)
        newSong.id = "song" + id
        let Id = id
        newSong.onclick = `playSong(${Id})`
        songs.appendChild(newSong)
    })
} appendSong()

function appendPlaylist() {
    buildPlaylistList(player.playlists).forEach((playlist) => {
        const { id, name, songs } = playlist
        const newPlaylist = createPlaylistElement(id, name, songs)
        playlists.append(newPlaylist)
        const playListTime = document.createElement("li")
        playListTime.innerText = convertDuration(playlistDuration(id))
        newPlaylist.append(playListTime)
    })
}
appendPlaylist()