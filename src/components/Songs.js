import { FormControl, Select, InputLabel, MenuItem, Autocomplete, TextField } from "@mui/material"
import axios from "axios"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setSong } from "../features/masterserver/clientserver"

const Songs = ({websocket}) => {
    const songs = useSelector(state=>state.client.songs)
    const song = useSelector(state => state.client.song)
    const charId = useSelector(state => state.client.characterId)
    const dispatch = useDispatch()
    
    const sendSongRequest = () => {
        websocket.send(`MC#${song}#${charId}#Test#0#0#0#%`)
    }

    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={songs}
            value={song}
            sx={{ width: 300 }}
            onChange={(ev, changedValue) => {
                dispatch(setSong(changedValue))
                sendSongRequest()
            }}
            renderInput={(params) => <TextField {...params} label="Song" />}
        />

    // <FormControl fullWidth>

    // <InputLabel id="demo-simple-select-label">Songs</InputLabel>
    // <Select
    //     labelId="demo-simple-select-label"
    //     id="demo-simple-select"
    //     value={song}
    //     label="Song"
    //     onChange={(ev) => {
    //         setSong(ev.target.value)
    //     }}
    // >
    //     {songs.map(song => {return(<MenuItem value={song}>{song}</MenuItem>)})}
    //     </Select>
    // </FormControl>
    )
}

export default Songs