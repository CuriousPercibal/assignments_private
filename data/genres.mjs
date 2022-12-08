import {readJSON} from "./filemanagement.mjs";
import fetch from 'node-fetch'
import fs from 'fs'

const createQueryUrl = (name) => `https://api.spotify.com/v1/search?type=artist&limit=1&q='${name}'`
const createRelatedUrl = (id) => `https://api.spotify.com/v1/artists/${id}/related-artists`

async function getArtistGenres(artist) {
    const resp = await fetch(createQueryUrl(artist), {
        method: 'GET',
        headers
    }).then((response) => response.json())

    if (resp['error']) {
        console.log(resp['error'])
        return {id: '', artist, genres: []}
    }

    const name = resp['artists']['items'][0]['name']
    const genres = resp['artists']['items'][0]['genres']
    const id = resp['artists']['items'][0]['id']

    return {id, name, genres}
}

async function getRelatedGenre(artistId) {
    if (!artistId) return []

    const resp = await fetch(createRelatedUrl(artistId), {
        method: 'GET',
        headers
    }).then((response) => response.json())

    if (resp['error']) {
        console.log(resp['error'])
        throw Error(resp['error'])
    }

    return resp['artists'].flatMap(artist => artist?.genres)
}


const tracks = readJSON('KnownTracks.json')

const artists = new Set(tracks.map(track => track['artistName']))
const iterator = artists.entries()

console.log(iterator.next().value)
console.log(iterator.next().value)
console.log(artists.size)

let counter = 1;
let size = artists.size

const token = 'BQBw8X5EsYcAM1PD2vI-Iz9sktpFjjX2wX_dosSq_f6rZYm8w80aXvahmv1ViIwUdjgir-Bm7AxIChUc9MiQ2FqqKVvp6x2VpqDCkSvPzZDtr0dF0Fo'
const headers = {
    'Authorization': `Bearer ${token}`
}

let artistsData = []

for (const artist of artists ) {
    try {
        const artistData = await getArtistGenres(artist)

        if (!artistData?.genres) {
            console.log("No genres found. Getting related artists")
            artistData.genres = await getRelatedGenre(artistData?.id)
        }

        artistsData.push(artistData)
    } catch (e) {
        break
    }

    console.log(`${counter}/${size}: ${artist}`)
    counter++
    await new Promise(r => setTimeout(r, 500));
}

console.log(artistsData)
fs.writeFileSync('ArtistData.json', JSON.stringify(artistsData), {encoding: 'utf8'})

