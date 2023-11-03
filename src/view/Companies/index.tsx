import { FC, useState, useEffect } from "react"
import { cnpjMask } from "../../shared/utils/masks"
import { captureElementData } from "../../shared/utils/helpers"
import Button from "../../shared/components/Button"
import Modal from "../../shared/components/Modal"
import energizouApi from "../../shared/services/energizou/server"
import DefaultInput from "../../shared/components/Input"
import "./styles.less"

interface ICompanies { }
const Companies: FC<ICompanies> = () => {

    const [modal, setModal] = useState<number | null | "create">(null)
    const [typeModal, setTypeModal] = useState<'create' | 'edit' | 'remove' | 'view'>("create")
    const [valueInputFilter, setValueInputFilter] = useState<string>("")
    const [companies, setCompanies] = useState<CompanyType[]>([])

    const openModal = (typeModal: 'create' | 'edit' | 'remove' | 'view', index: number) => {
        setTypeModal(typeModal)
        setModal(index)
    }

    const handleCreate = (dataCompany: CompanyType) => {
        energizouApi.createCompany(dataCompany).then(() => {
            setCompanies([...companies, dataCompany])
            setModal(null)
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleUpdate = (dataCompany: CompanyType) => {
        energizouApi.updateCompany(dataCompany).then(() => {
            setCompanies(companies?.map((company) => company?.id === dataCompany?.id ? dataCompany : company))
            setModal(null)
        }).catch(() => {
            alert("Não foi possível editar a empresa")
        })
    }

    const handleDelete = (idCompany: number) => {
        energizouApi.deleteCompany(idCompany).then(() => {
            setCompanies(companies?.filter((company) => company?.id !== idCompany))
            setModal(null)
        }).catch(() => {
            alert("Não foi possível excluir a empresa")
        })
    }

    const handleSearch = () => {
        const inputFilterValue: any = captureElementData(["filter"])?.filter?.value
        if (inputFilterValue.length == 0) {
            energizouApi.listCompanies().then((data) => {
                setCompanies(data)
            })
        } else {
            energizouApi.getCompanyByCnpj(inputFilterValue).then((data) => {
                if (!inputFilterValue == data) {
                    setCompanies([])
                } else {
                    setCompanies([data])
                }
            })
        }
    }

    useEffect(() => {
        energizouApi.listCompanies().then((data) => {
            setCompanies(data)
        })
    }, [])

    return (
        <>
            <div className="filter">
                <div>
                    <DefaultInput placeholder="Filtrar" name="filter" value={valueInputFilter} type="text" maxLength={18} onChange={e => setValueInputFilter(cnpjMask(e.target.value))} onKeyUp={(e) => e.keyCode == 13 ? handleSearch() : e.preventDefault()} />
                    <Button name="Buscar" type="default" onClick={handleSearch} />
                </div>
                <div>
                    <Button name="Criar" type="default" onClick={() => { setModal("create"); setTypeModal("create") }} />
                </div>
            </div>
            <div className="container-cards">
                {companies?.map((company, index) => (
                    <div key={index} className="card">
                        <div className="razao">
                            <p>{company.name_company}</p>
                        </div>
                        <div className="content">
                            <p>CNPJ: {company.cnpj}</p>
                            <p>Telefone: {company.phone}</p>
                            <p>Nome: {company.client_name}</p>
                        </div>
                        <div className="buttons">
                            <div>
                                <Button name="Editar" type="default" onClick={() => { setModal(index); setTypeModal("edit") }} />
                                <Button name="Ver" type="outlined" onClick={() => { setModal(index); setTypeModal("view") }} />
                            </div>
                            <div>
                                <Button name="Deletar" type="delete" onClick={() => openModal('remove', index)} />
                            </div>
                        </div>

                        {modal === index && (
                            <Modal
                                dataCompany={company}
                                handleClose={() => setModal(null)}
                                mode={typeModal}
                                handleClick={() => handleDelete(company?.id!)}
                                handleUpdate={handleUpdate}
                            />
                        )}

                    </div>
                ))}
                {modal === "create" && (
                    <Modal
                        handleClose={() => setModal(null)}
                        mode={"create"}
                        handleCreate={handleCreate}
                    />
                )}

            </div>
        </>
    )
}

export default Companies