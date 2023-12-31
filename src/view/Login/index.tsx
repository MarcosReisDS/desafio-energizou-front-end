import { FC, useEffect } from "react"
import { captureElementData } from "../../shared/utils/helpers"
import { useNavigate } from "react-router-dom"
import { getCookie, setCookie } from "../../shared/utils/cookies"
import energizouApi from "../../shared/services/energizou/server"
import Energizou from "../../shared/components/Energizou"
import "./styles.less"

interface ILogin { }
const Login: FC<ILogin> = () => {
    const navigate = useNavigate()

    const handleLogin = () => {
        let data: any = captureElementData(["name", "password"]);

        if (data) {
            energizouApi.login(data?.name?.value, data?.password?.value).then((resp: CompanyType) => {
                setCookie('profile', JSON.stringify({ cnpj: resp?.cnpj, name: resp?.client_name, id: resp?.id }), 1)
                navigate("/perfil")
            })
        }
    }

    useEffect(() => {
        const profile = getCookie('profile')
        
        if(profile){
            navigate("/perfil")
        }
    }, [])

    return (
        <div className="container-login">
            <Energizou move="left" />
            <div className="container-box">
                <div className="box">
                    <div className="input">
                        <label>Nome</label>
                        <input type="text" name="name" />
                    </div>
                    <div className="input">
                        <label>Senha</label>
                        <input type="text" name="password" />
                    </div>
                    <div className="button">
                        <button onClick={handleLogin}>Acessar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login