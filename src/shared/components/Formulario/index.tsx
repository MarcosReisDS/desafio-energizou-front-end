import { FC, useEffect, useState } from "react"
import { appendErrorInput, captureElementData, setElementsData, validInputData } from "../../utils/helpers";
import { cnpjMask, phoneMask, zipCodeMask } from "../../utils/masks";
import Button from "../Button";
import DefaultInput from "../Input";
import "./styles.less"
import cepApi from "../../services/cep/server";

interface IFormulario {
    handleSendData: (data: any) => void
    handleCancel?: () => void
    disableCancelButton?: boolean
    typeForm: 'create' | 'edit' | 'view'
    data?: CompanyType
}

const Formulario: FC<IFormulario> = ({ handleSendData, typeForm, data, handleCancel, disableCancelButton }) => {

    const [loading, setLoading] = useState<boolean>(false)

    const handleRegister = () => {
        let dataRegister = captureElementData(["client_name", "email", "phone", "password", "name_company", "cnpj", "zip_code", "address", "number"]);

        let checkIsValid = validInputData(dataRegister);

        if (checkIsValid.valid) {
            Object.keys(dataRegister).forEach((key) => {
                // @ts-ignore
                dataRegister[key] = dataRegister[key]?.value
            })
            handleSendData({ id: data?.id, ...dataRegister })
        } else {
            appendErrorInput(checkIsValid);
        }
    }

    const handleGetAddress = (event: any) => {
        let input = event.target
        input.value = zipCodeMask(input.value)

        let inputValue = input.value

        if (inputValue.length === 9) {
            setLoading(true)
            cepApi.getCep(inputValue).then((resp: ZipCodeType) => {
                setElementsData([
                    { key: "address", value: resp.logradouro }
                ])
            }).finally(() => {
                setLoading(false)
            })
        }
    }

    const handlePhone = (event: any) => {
        let input = event.target
        input.value = phoneMask(input.value)
    }

    const handleCnpj = (event: any) => {
        let input = event.target
        input.value = cnpjMask(input.value)
    }

    useEffect(() => {
        if (data) {
            setElementsData([
                { key: "client_name", value: data.client_name },
                { key: "password", value: data.password },
                { key: "cnpj", value: data.cnpj },
                { key: "email", value: data.email },
                { key: "phone", value: data.phone},
                { key: "zip_code", value: data.zip_code },
                { key: "address", value: data.address },
                { key: "number", value: data.number },
                { key: "name_company", value: data.name_company },
            ])
        }
    }, [data])

    return (
        <div className="container">
            <div className="container-fields block-one">
                <div className="container-inputs">
                    <DefaultInput type="text" name="client_name" placeholder="Nome" />
                    <DefaultInput type="password" name="password" placeholder="Senha" />
                </div>
                <div className="container-inputs">
                    <DefaultInput type="text" name="name_company" placeholder="Razão social" />
                    <DefaultInput type="text" name="cnpj" placeholder="CNPJ" maxLength={18} onChange={handleCnpj} />
                </div>
            </div>
            <div className="container-fields block-two">
                <div className="container-inputs">
                    <DefaultInput type="email" name="email" placeholder="Email" />
                    <DefaultInput type="telefone" name="phone" placeholder="Telefone" maxLength={15} onChange={handlePhone}/>
                </div>
            </div>
            <div className="container-fields block-three">
                <div className="container-inputs">
                    <DefaultInput loading={loading} type="text" name="zip_code" placeholder="CEP" maxLength={9} onChange={handleGetAddress} />
                    <DefaultInput type="text" name="address" placeholder="Endereço" />
                </div>
                <div className="container-inputs">
                    <DefaultInput type="text" name="number" placeholder="Número" />
                </div>
            </div>

            {typeForm !== 'view' && (
                <div className="container-buttons">
                    {typeForm === 'edit' && (
                        <>
                            <Button name="Salvar" type="default" onClick={handleRegister} />

                            {!disableCancelButton && (
                                <Button name="Cancelar" type="outlined" onClick={handleCancel} />
                            )}
                        </>
                    )}

                    {typeForm === 'create' && (
                        <>
                            <Button name="Criar" type="default" onClick={handleRegister} />
                            <Button name="Cancelar" type="outlined" onClick={handleCancel} />
                        </>
                    )}
                </div>
            )}
        </div>
    )
}

export default Formulario