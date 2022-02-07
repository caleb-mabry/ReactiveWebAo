const mcParser = msg => {
    const data = mcParser.split('#')
    data.shift()
    data.pop()
    return {
        songName: data[0],
        charId: data[1],
        showName: data[2],
        looping: data[3],
        channel: data[4],
        effects: channel[5]
    }
}