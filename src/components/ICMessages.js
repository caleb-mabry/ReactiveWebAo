import { useEffect } from "react"
import { useSelector } from "react-redux"
import ICMessageSend from "./ICMessageSend"

const ICMessages = ({websocket}) => {
    const icMessages = useSelector(state => state.client.messages)
    return (
        <>
        {icMessages.map(ic => <li key={Math.random()}>{ic.character}: {ic.message}</li>)}
        <ICMessageSend websocket={websocket}/>
        </>
    )
}
export default ICMessages