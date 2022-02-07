import { useEffect, useState } from "react"

const ICMessageSend = ({websocket}) => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        websocket ? setLoading(false) : setLoading(true)

    });
    
    return (
        <>
        {loading ? 
            <h1>Loading!</h1>

        :
        
        <>
        <input type={'text'} onChange={setMessage}/>
        <button onClick={websocket.send(message)} >Submit</button>
        </>
        }

        </>
    )
}
export default ICMessageSend