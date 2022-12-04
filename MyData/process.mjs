import fs from 'fs'

function readfile(path) {
    try {
        return fs.readFileSync(path, 'utf8')
    } catch (err) {
        console.error(err);
    }
    return ''
}

function readJSON(path) {
    return JSON.parse(readfile(path))
}

const history1 = readJSON('StreamingHistory0.json')
const history2 = readJSON('StreamingHistory1.json')

// Flatten playlist and get relevant attributes
const playlist = readJSON('Playlist1.json')

const items = playlist['playlists']
    .map((obj) => obj['items'])
    .flat()
    .map((obj) => obj['track'])
const itemsString = JSON.stringify(items)

fs.writeFileSync('KnownTracks.json', itemsString, {encoding: 'utf8'} )

const streamingHistory = history1.concat(history2)
const streamingHistoryString = JSON.stringify(streamingHistory)

fs.writeFileSync('StreamingHistory.json', streamingHistoryString, {encoding: 'utf8'})