const ctParser = (msg) => {
  const data = msg.split("#");
  data.pop();
  data.shift();
  return {
    name: data[0],
    message: data[1],
  };
};
export default ctParser;
