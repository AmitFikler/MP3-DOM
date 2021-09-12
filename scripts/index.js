/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */


function playSong(songId) {
    // Your code here
}

/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const children = [{
        content:title,
        type:'p'
    }, {
        content:album,
        type: 'p'
    },{ 
        content: artist,
        type: 'p'
    },{
        content:  convertDuration(duration),
        type: 'p'
    }, {
        content: coverArt,
        type: 'img'
    }]
    const classes = ["songs", "continerSongs"]
    const attrs = { onclick: `playSong(${id})` }
    
    return createElement("div", children, classes, attrs)
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
    const children = [{
        content:id,
        type:'p'
    }, {
        content:name,
        type: 'p'
    },{ 
        content: songs,
        type: 'p'
    }]
    const classes = ["playlists", "continerSongs"]
    const attrs = {}
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
    let tag = document.createElement(tagName);
    children.forEach(child => {
        let type = document.createElement(child.type)
        if (child.type = 'img') type.setAttribute("src", child.content);
        type.innerHTML = child.content
        tag.append(type)
    });
    classes.forEach(clas => {
        tag.classList.add(clas)
    })
    for (const [key, value] of Object.entries(attributes)) {
        tag.setAttribute(key,value)
    }
    document.body.appendChild(tag)
}

// You can write more code below this line
function songList(songs) {
    songs.forEach(song => {
        createSongElement(song)       
    });
}

function songPlayList(songs) {
    songs.forEach(song => {
        createPlaylistElement(song)       
    });
}
songList(player.songs);
songPlayList(player.playlists);

function convertDuration(num) { //Converts seconds to MM:SS format
    let mins = Math.floor(num / 60);
    let sec = num % 60;
    return mins.toString().padStart(2, '0') + ':' + sec.toString().padStart(2, '0');
}