const scParser = (msg) => {
  const data = msg.split("#");
  data.pop();
  data.shift();

  const characters = data.map((char) => char);
  return characters;
};
export default scParser;
