import { useDispatch, useSelector } from "react-redux";
import { setSelectedEmote } from "../features/masterserver/clientserver";

const Emotes = () => {
  const emotes = useSelector((state) => state.client.emotions);
  const characters = useSelector((state) => state.client.characters);
  const characterId = useSelector((state) => state.client.characterId);
  const assetUrl = useSelector((state) => state.client.assetUrl);
  const dispatch =  useDispatch()

  const getEmoteImageUrl = (id) => {
    if (characters.length === 0 || characterId === -1) {
      return "";
    }
    const characterName = characters[characterId].name;
    return `${assetUrl}characters/${encodeURI(
      characterName.toLowerCase()
    )}/emotions/button${Number(id)+1}_off.png`;
  };

  return (
    <div>
      {Object.keys(emotes).map((emote) => (
        <img src={getEmoteImageUrl(emote)} onClick={() => dispatch(setSelectedEmote(String(emotes[emote]).toLowerCase()))} />
      ))}
    </div>
  );
};
export default Emotes;
