import fs from 'fs'


export function readfile(path) {
    try {
        return fs.readFileSync(path, 'utf8')
    } catch (err) {
        console.error(err);
    }
    return ''
}

export function readJSON(path) {
    return JSON.parse(readfile(path))
}