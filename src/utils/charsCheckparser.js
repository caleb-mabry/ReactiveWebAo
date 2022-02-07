const charsCheckParser = (msg) => {
  const data = msg.split("#");
  data.shift();
  data.pop();

  return data;
};
export default charsCheckParser;
