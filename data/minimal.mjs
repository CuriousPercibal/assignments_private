import {readJSON} from "./filemanagement.mjs";
import fs from 'fs'

const filt = (artist) => {
    return eq(artist, "Boris Brejcha") ||
        eq(artist, "Theydream") ||
        eq(artist, "Avoure") ||
        eq(artist, "Depeche Mode") ||
        eq(artist, "Sevdaliza")
}

const eq = (track, name) => track.artistName === name

const playlists = readJSON('KnownTracks.json').filter(filt)


console.log(playlists)
console.log(playlists.length)
// console.log(new Set(playlists.map(item => item.artistName)))

fs.writeFileSync('Playlist.json', JSON.stringify(playlists), {encoding: 'utf8'})