import { FC, useState, useEffect } from "react"
import { getCookie } from "../../shared/utils/cookies"
import Form from "../../shared/components/Formulario"
import energizouApi from "../../shared/services/energizou/server"
import "./styles.less"

interface IProfile { }
const Profile: FC<IProfile> = () => {
    const [myProfile, setMyProfile] = useState<CompanyType>()
    const [companies, setCompanies] = useState<CompanyType[]>([])

    const handleUpdate = (dataCompany: CompanyType) => {
        energizouApi.updateCompany(dataCompany).then(() => {
            setCompanies(companies?.map((company) => company?.id === dataCompany?.id ? dataCompany : company))
        }).catch(() => {
            alert("Não foi possível editar a empresa")
        })
    }

    useEffect(() => {
        const id_company = getCookie('profile')?.id
        energizouApi.getCompanyById(id_company).then((data) => {
            setMyProfile(data)
        })
    }, [])

    return (
        <div className="container-profile">
            <Form typeForm="edit" data={myProfile} handleSendData={(e) => handleUpdate(e)} disableCancelButton />
        </div>
    )
}

export default Profile