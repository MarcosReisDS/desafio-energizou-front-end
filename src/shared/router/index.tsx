import { FC } from "react";
import { Routes, Route } from "react-router-dom"
import Login from "../../view/Login";
import Profile from "../../view/Profile";
import Companies from "../../view/Companies";
import DashStructure from "../components/DashStructure";

interface IRouter { }
const Router: FC<IRouter> = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/perfil" element={<DashStructure move="right"><Profile /></DashStructure>} />
            <Route path="/empresas" element={<DashStructure move="right"><Companies /></DashStructure>} />
        </Routes>
    )
}

export default Router