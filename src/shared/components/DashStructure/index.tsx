import { FC } from "react"
import "./styles.less"
import SideBar from "../SideBar"
import Energizou from "../Energizou"

interface IDashStructure {
    children?: string | JSX.Element | JSX.Element[]
    move: 'right' | 'left'
}
const DashStructure: FC<IDashStructure> = (props) => {
    const { children, move } = props
    return (
        <div className="container-dashboard">
            <SideBar />
            <div className="body-dash">
                <Energizou move={move} />
                {children}
            </div>
        </div>
    )
}

export default DashStructure