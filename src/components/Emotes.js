import { useSelector } from "react-redux";

const Emotes = () => {
  const emotes = useSelector((state) => state.client.emotions);
  const characters = useSelector((state) => state.client.characters);
  const characterId = useSelector((state) => state.client.characterId);
  const assetUrl = useSelector((state) => state.client.assetUrl);

  const getEmoteImageUrl = (id) => {
    if (characters.length === 0 || characterId === -1) {
      return "";
    }
    const characterName = characters[characterId].name;
    return `${assetUrl}characters/${encodeURI(
      characterName.toLowerCase()
    )}/emotions/button${id}_off.png`;
  };
  return (
    <div>
      {Object.keys(emotes).map((emote) => (
        <img src={getEmoteImageUrl(emote)} />
      ))}
    </div>
  );
};
export default Emotes;
