const msParser = (msg) => {
  const data = msg.split("#");
  data.shift();
  data.pop();
  return {
    desk_mod: data[0],
    preanim: data[1],
    character: data[2],
    emote: data[3],
    message: data[4],
    side: data[5],
    sfxName: data[6],
    emoteModifier: data[7],
    charId: data[8],
    sfxDelay: data[9],
    shoutModifier: data[10],
    evidence: data[11],
    flip: data[12],
    realization: data[13],
    textColor: data[14],
    showname: data[15],
    otherCharId: data[16],
    selfOffset: data[17],
    noninterruptingPreanim: data[18],
    sfxLooping: data[19],
    screenshake: data[20],
    framesShake: data[21],
    framesRealization: data[22],
    framesSfx: data[23],
    additive: data[24],
    effect: data[26],
  };
};
export default msParser;
