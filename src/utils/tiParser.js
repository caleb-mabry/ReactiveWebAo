const tiParser = tiMsg => {
    const data = tiMsg.split('#')
    data.shift()
    data.pop()

    const id = data[0]
    const command = data[1]
    const time = data[2]
    return {
        id: id,
        command: command,
        time: time
    }
}
export default tiParser