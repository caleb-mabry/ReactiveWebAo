const assParser = (msg) => {
  const data = msg.split("#");
  data.shift();
  const assetUrl = data.shift();
  return assetUrl;
};
export default assParser;
