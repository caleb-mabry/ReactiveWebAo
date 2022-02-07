import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import axios from "axios"

import { setCharacterId } from "../features/masterserver/clientserver"
const ini = require('ini')
const AvailableCharacter = styled.img`
    pointer: click;
`
const UnavailableCharacter = styled.img`
    opacity: 50%;
`
const setSelectedCharacter = async (assetUrl, characterId, characterName, websocket) => {
    console.log(characterName)
    const cinidata = await axios.get(assetUrl + "characters/" + encodeURI(characterName.toLowerCase()) + "/char.ini");
	const cini = ini.parse(cinidata.data);
    console.log(cini)
    websocket.send(`CC#0#${characterId}#${Math.random()}#%`)
}
const getUrl = (assetUrl, character) => `${assetUrl}characters/${encodeURIComponent(character.toLowerCase())}/char_icon.png`
const Characters = ({websocket}) => {
    const characters = useSelector(state => state.client.characters)
    const assetUrl = useSelector(state => state.client.assetUrl)
    const dispatch = useDispatch()
    return (
        <div>
        {characters.map((char, indx) =>{
            return(
            Number(char.availability) === 0 
            ? <AvailableCharacter onClick={() => {
                dispatch(setCharacterId(indx))
                setSelectedCharacter(assetUrl, indx, char.name ,websocket)
                }} src={getUrl(assetUrl, char.name)} /> 
            : <UnavailableCharacter src={getUrl(assetUrl, char.name)} />
        )})
        }
        </div>

        

    )
}
export default Characters