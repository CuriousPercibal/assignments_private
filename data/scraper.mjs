import fs from 'fs'
import fetch from 'node-fetch'

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

const tracks = readJSON('KnownTracks.json')
tracks.forEach(track => track.id = track['trackUri'].split(':')[2])

const batches = []

for(let i = 1; ; i++) {
    if (i*100 > tracks.length) {
        batches.push(tracks.slice((i-1)*100).map(track => track.id))
        break
    }
    batches.push(tracks.slice((i-1)*100, i*100).map(track => track.id))
}

console.log(batches)
console.log(batches.length)
console.log(tracks.length)

const url = 'https://api.spotify.com/v1/audio-features?ids='
const token = 'BQDsqIJOvtGsfcKz-5OynUc1JESwBjZ0QrdhKx86SuuCYc9z0PIa-JgXqxLH3HH3GRXLeq_jvEGhIloeqXzLIiysCFRrQGvym08UACn9XjQ7I3Tc0vc'

let features = []
let batchNumber = 1

for (const batch of batches) {
    const urlT = url + batch.join(',')
    const headers = {
        'Authorization': `Bearer ${token}`
    }
    const resp = await fetch(urlT, {
        method: 'GET',
        headers
    }).then((response) => response.json())
    //console.log(Object.keys(resp))
    //console.log(resp['error'])
    features = features.concat(resp['audio_features'])
    //console.log('Features length: ' + features.length)
    await new Promise(r => setTimeout(r, 2000));
    console.log(`Getting ${batchNumber}/${batches.length}`)
    batchNumber++;
}

fs.writeFileSync('AudioFeatures.json', JSON.stringify(features), {encoding: 'utf8'})