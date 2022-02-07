const bnParser = (msg) => {
    const data = msg.split('#')
    data.shift()
    data.pop()
    return data[0]
}
export default bnParser