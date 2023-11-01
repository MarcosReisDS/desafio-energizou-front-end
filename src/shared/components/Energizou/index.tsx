import { FC } from "react"
import IconEnergizou from "../../assets/icons"
import "./styles.less"

interface IEnergizou {
    move: "left" | "right"
}
const Energizou:FC<IEnergizou> = ({move}) => {

    return (
        <div className="container-logo" style={{justifyContent: move == "left" ? "start" : "end"}}>
            <IconEnergizou />
        </div>
    )
}

export default Energizou