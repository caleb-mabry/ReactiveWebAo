const escapeCodes = {
    "%": "<percent>",
    "#": "<num>",
    "$": "<dollar>",
    "&": "<and>"
}
const msgDecoder = msg => {
    Object.keys(escapeCodes).forEach(escapeCharacter => {
        msg.replace(escapeCharacter, escapeCodes[escapeCharacter])
    });
    return msg
}