import { FC } from "react";
import "./styles.less"

interface IButton {
    name: string
    type: "default" | "outlined" | "delete"
    onClick?: (e: any) => void

}
const Button: FC<IButton> = ({ name, type = 'default', onClick }) => {
    return <button className={`default-button ${type}`} onClick={onClick}>{name}</button>
}

export default Button