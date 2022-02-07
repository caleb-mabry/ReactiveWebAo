import { useSelector } from "react-redux"

const Areas = () => {
    const areas = useSelector(state => state.client.areas)
    return (
        Object.keys(areas).map(areaNumber => {
            return (
                <div key={areaNumber}>Area {areas[areaNumber].name} has {areas[areaNumber].playerCount} players</div>
            )
        })
    )
}
export default Areas