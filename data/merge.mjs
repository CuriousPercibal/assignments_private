import fs from 'fs'


const features = readJSON('AudioFeatures.json')
const tracks = readJSON('KnownTracks.json')
tracks.forEach(track => track.id = track['trackUri'].split(':')[2])

const map = new Map()

for ( const feature of features ) {
    if (!feature?.id) {
        console.log(feature)
        continue
    }
    map.set(feature['id'], feature)
}

tracks.forEach(track => Object.assign(track, map.get(track.id)))
const tracksDataString = JSON.stringify(tracks)
fs.writeFileSync('TrackFeatures.json', tracksDataString, {encoding: 'utf8'})