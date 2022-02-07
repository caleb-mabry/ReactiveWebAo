const smParser = (msg) => {
    const areas = []
    const songs = []
    const data = msg.split('#')
    data.shift()
    data.pop()
    let startMusicIndex = 0
    let i = 0
    while (startMusicIndex === 0 && i < data.length) {
        if (data[i] === "==Music==") {
            startMusicIndex = i
        } else {
            i += 1
        }
    }
    for (let i = 0; i < startMusicIndex; i++) {
        areas.push(data[i])
    }
    // for (let musicIndexStart = startMusicIndex; startMusicIndex < data.length; musicIndexStart++) {
    //     songs.push(data[musicIndexStart])
    // }
    return ({
        areas: areas,
        songs: songs
    })
}
export default smParser