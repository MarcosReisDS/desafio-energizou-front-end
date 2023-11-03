import { FC } from "react";
import "./styles.less"

interface IButton {
    name: string
    type: "default" | "outlined" | "delete"
    onClick?: (e: any) => void
    message?: boolean
}
const Button: FC<IButton> = ({ name, type = 'default', onClick, message = false }) => {
    return <button className={`default-button ${type} ${message ? "message" : ""}`} onClick={onClick}>{name}</button>
}

export default Button