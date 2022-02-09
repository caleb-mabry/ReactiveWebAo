import { CardMedia } from '@mui/material';
import { useSelector } from 'react-redux';

const Audio = () => {
    const song = useSelector(state => state.client.song)
    const assetUrl = useSelector(state => state.client.assetUrl)

    return (
        <audio controls autoPlay src={`${assetUrl}sounds/music/${encodeURI(song.toLowerCase())}`} />
    )
}
export default Audio