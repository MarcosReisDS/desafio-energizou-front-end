import { FC, useEffect, useState } from "react";
import "./styles.less"
import { useNavigate } from "react-router-dom";
import { deleteCookie, getCookie } from "../../utils/cookies";
import Button from "../Button";

interface ISideBar { }
const SideBar: FC<ISideBar> = () => {
    const [name, setName] = useState<string>("")
    const navigate = useNavigate()

const handleLogout = () => {
    deleteCookie("profile")
    navigate("/")
}

    useEffect(() => {
        setName(getCookie('profile')?.name)
    }, [])

    const buttonsNavigation = [
        { name: "Perfil", url: "/perfil" },
        { name: "Empresas", url: "/empresas" },
    ]

    return (
        <div className="container-side-bar">
            <div className="content">
                <div className="view name">
                    <p>{name}</p>
                </div>
                <div className="navigation">
                    <ul>
                        {buttonsNavigation.map((item, key) => (
                            <li key={key} onClick={() => navigate(item.url)} style={{ backgroundColor: window.location.pathname == item.url ? "rgba(255, 255, 255, 30%)" : "transparent" }}>{item.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="view project">
                <a href="https://www.figma.com/file/hS0o66OQmgnBJSSsJV7NDf/energizou?type=design&node-id=18-249&mode=design&t=RRauVm6dZLbgzuoT-0">
                    Prototipo
                </a>
                <Button name="Logout" type="outlined" onClick={handleLogout}/>
            </div>
        </div>
    )
}

export default SideBar