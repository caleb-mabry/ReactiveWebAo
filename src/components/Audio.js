import { CardMedia } from "@mui/material";
import { useSelector } from "react-redux";

const Audio = () => {
  const song = useSelector((state) => state.client.song);
  const assetUrl = useSelector((state) => state.client.assetUrl);
  const getAudioUrl = () => {
    if (!song) {
      return "";
    }
    return `${assetUrl}sounds/music/${encodeURI(song.toLowerCase())}`;
  };
  return <audio controls autoPlay src={getAudioUrl()} />;
};
export default Audio;
