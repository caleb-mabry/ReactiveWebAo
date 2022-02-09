const mcParser = (msg) => {
  const data = msg.split("#");
  data.shift();
  data.pop();
  console.log(data)
  return {
    songName: data[0],
    charId: data[1],
    showName: data[2],
    looping: data[3],
    channel: data[4],
    effects: data[5],
  };
};

export default mcParser