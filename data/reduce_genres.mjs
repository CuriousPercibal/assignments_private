import {readJSON} from "./filemanagement.mjs";

const artistsData = readJSON('ArtistData.json')

function reduce(string) {
    if (string.includes('house')) {
        return 'house'
    }

    if (string.includes(' ') && string.includes('edm')) {
        return 'edm'
    }

    if (string.includes(' ') && string.includes('dance')) {
        return 'edm'
    }

    if (string.includes(' ') && string.includes('techno')) {
        return 'edm'
    }

    if (string.includes('pop')) {
        return 'pop'
    }

    if (string.includes('disco')) {
        return 'disco'
    }

    if (string.includes('alternative rock')) {
        return 'alternative rock'
    }

    if (string.includes('rock')) {
        return 'rock'
    }

    if (string.includes('rap') && string.includes(' ')) {
        return 'rap'
    }

    if (string.includes('punk')) {
        return 'punk'
    }

    if (string.includes('electronic')) {
        return 'electronic'
    }

    return string
}

const genres = new Set(artistsData.flatMap(artist => artist.genres).map(reduce))

console.log(genres)