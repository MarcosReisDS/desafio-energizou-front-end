import { FC } from "react"
import Fields from "../Formulario"
import Button from "../Button"
import "./styles.less"

interface IModal {
    mode: 'create' | 'edit' | 'remove' | 'view'
    handleClick?: () => void
    handleUpdate?: (data: CompanyType) => void
    handleClose?: () => void
    handleCreate?: (data: CompanyType) => void
    dataCompany?: CompanyType
}
const Modal: FC<IModal> = ({
    mode,
    handleClick,
    handleClose,
    dataCompany,
    handleUpdate,
    handleCreate,
}) => {
    const handleActionForm = (data: CompanyType) => {
        if (mode == "create" && handleCreate) {
            handleCreate(data)
        }

        if (mode == "edit" && handleUpdate) {
            handleUpdate(data)
        }
    }

    return (
        <div className="container-modal">
            <div className={`container-content ${mode}`}>
                {['create', 'view', 'edit'].includes(mode) ? (
                    <>
                        <Fields data={dataCompany} typeForm={mode !== 'remove' ? mode : 'edit'} handleSendData={handleActionForm} handleCancel={handleClose} />
                        {mode === 'view' && (
                            <div className="submit-button">
                                <Button name={mode === 'view' ? 'Fechar' : "Cancelar"} type="outlined" onClick={handleClose} />
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <div className="certainty">
                            <p>Tem certeza que você deseja excluir?</p>
                        </div>
                        <div className="certainty">
                            <Button name="Cancelar" type="outlined" onClick={handleClose} />
                            <Button name="Excluir" type="delete" onClick={handleClick} />
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Modal