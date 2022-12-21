import fs from 'fs'
import fetch from 'node-fetch'

//////////////// LEAGUES ////////////////
const writepathLeague = 'media/competitions/'
const fileNameLeague = 'files/leagues.txt'
fs.mkdirSync(writepathLeague, {recursive: true})

try {
    // read leagues file into an array of lines
    const data = fs.readFileSync(fileNameLeague, 'utf8').split("\n")
    data.forEach((elem, idx) => {
        const url = `https://playfootball.games/media/competitions/${elem}.png`

        fetch(url)
            .then(res => {
                // check status
                if (res.status === 200) {
                    res.body.pipe(fs.createWriteStream(`${writepathLeague}${elem}.png`))
                } else {
                    console.log(`status: ${res.status} line: ${idx} elem: ${elem} not found`)
                }
            })
            .catch(err => console.log(err))
    })
} catch (err) {
    console.error(err);
}

//////////////// NATIONALITIES ////////////////
const writepathNat = 'media/nations/'
const fileNameNat = 'files/nationalities.txt'
fs.mkdirSync(writepathNat, {recursive: true})

try {
    // read leagues file into an array of lines
    const data = fs.readFileSync(fileNameNat, 'utf8').split("\r\n")
    data.forEach((elem, idx) => {
        const url = `https://playfootball.games/media/nations/${elem}.svg`

        fetch(url)
            .then(res => {
                // check status
                if (res.status === 200) {
                    res.body.pipe(fs.createWriteStream(`${writepathNat}${elem}.svg`))
                } else {
                    console.log(`status: ${res.status} line: ${idx} elem: ${elem} not found`)
                }
            })
            .catch(err => console.log(err))
    })
} catch (err) {
    console.error(err);
}

//////////////// TEAMS ////////////////
const writepathTeams = 'media/teams/'
const fileNameTeams = 'files/LaLigaTeamIDs.txt'
fs.mkdirSync(writepathTeams, {recursive: true})

try {
    // read leagues file into an array of lines
    const data = fs.readFileSync(fileNameTeams, 'utf8').split("\r\n")
    data.forEach((elem, idx) => {
        let num = elem%32
        const url = `https://cdn.sportmonks.com/images/soccer/teams/${num}/${elem}.png`

        fetch(url)
            .then(res => {
                // check status
                if (res.status === 200) {
                    res.body.pipe(fs.createWriteStream(`${writepathTeams}${elem}.png`))

                } else {
                    console.log(`status: ${res.status} line: ${idx} elem: ${elem} not found`)
                }
            })
            .catch(err => console.log(err))
    })
} catch (err) {
    console.error(err);
}

//////////////// PLAYERS ////////////////
const writepathPlayers = 'media/players/'
const fileNamePlayers = 'files/playerIDs.txt'

fs.mkdirSync(writepathPlayers, {recursive: true})

const data = fs.readFileSync(fileNamePlayers, 'utf-8').split("\n")
data.pop() // remove last empty line

// divide data into chunks of 100 elements
let chunks = []
let chunkSize = 10
for (let i = 0; i < data.length; i += chunkSize) {
    chunks.push(data.slice(i, i + chunkSize))
}

// setTimeout is a one-time call
// setInterval is a recurring call

// use setInterval to call getData() every 1000ms with one of the chunks
let i = 0
setInterval(() => {
    getData(chunks[i])
    i++
}, 1000)

// getData() fetches the data from the API and saves the picture in the directory writepath
// the picture is named after the player's id
async function getData(chunk) {
    for(let i = 0; i < chunk.length; i++) {
        let id = chunk[i]
        id = id.replace(/\r$/, '')
        await fetch(`https://media.api-sports.io/football/players/${id}.png`)
            .then(res => {
                    if (res.status === 200) {
                        res.body.pipe(fs.createWriteStream(`${writepathPlayers}${id}.png`))
                    } else {
                        console.log(`status: ${res.status} id: ${id} not found`)
                    }
                }
            )
    }
}