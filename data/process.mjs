import fs from 'fs'
import {readJSON} from "./filemanagement.mjs";

const history1 = readJSON('StreamingHistory0.json')
const history2 = readJSON('StreamingHistory1.json')

// Flatten playlist and get relevant attributes
const playlist = readJSON('Playlist1.json')

const items = playlist['playlists']
    .map((obj) => obj['items'])
    .flat()
    .map((obj) => obj['track'])
const itemsString = JSON.stringify(items)

fs.writeFileSync('KnownTracks.json', itemsString, {encoding: 'utf8'})

const streamingHistory = history1.concat(history2)

// remove items that are not in the playlist
const equals = (history, track) => track['artistName'] === history['artistName'] && track['trackName'] === history['trackName']
const streamingHistoryCleaned = streamingHistory.filter( history => items.some(track => equals(track, history)))

const streamingHistoryString = JSON.stringify(streamingHistoryCleaned)

fs.writeFileSync('StreamingHistoryCleaned.json', streamingHistoryString, {encoding: 'utf8'})

console.log({'all': history1.length + history2.length, 'cleaned': streamingHistoryCleaned.length})

//let unknown = []
//for (const hist of streamingHistory) {
//    if (items.some(track => track['artistName'] === hist['artistName'] && track['trackName'] === hist['trackName'])) {
//        continue
//    }
//    if (unknown.some(track => track['artistName'] === hist['artistName'] && track['trackName'] === hist['trackName'])) {
//        continue
//    }
//    unknown.push(hist)
//}
//
//const unknownTracks = JSON.stringify(unknown)
//
//fs.writeFileSync('UnknownTracks.json', unknownTracks, {encoding: 'utf8'})
//
//console.table({known: items.length, unknown: unknown.length})