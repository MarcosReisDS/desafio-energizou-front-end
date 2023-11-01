import { FC, useState, useEffect } from "react"
import { getCookie } from "../../shared/utils/cookies"
import Formulario from "../../shared/components/Formulario"
import energizouApi from "../../shared/services/energizou/server"
import "./styles.less"

interface IProfile { }
const Profile: FC<IProfile> = () => {
    const [myProfile, setMyProfile] = useState<CompanyType>()

    useEffect(() => {
        const cnpj_company = getCookie('profile')?.cnpj
        energizouApi.getCompanyByCnpj(cnpj_company).then((data) => {
            setMyProfile(data)
        })
    }, [])

    return (
        <div className="container-profile">
            <Formulario typeForm="edit" data={myProfile} handleSendData={(e) => console.log(e)} disableCancelButton />
        </div>
    )
}

export default Profile