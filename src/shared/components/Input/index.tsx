import { FC } from "react";
import "./styles.less"

interface IDefaultInput {
    name: string
    type: string
    placeholder: string
    onKeyPress?: (e: any) => void;
    onChange?: (e: any) => void;
    loading?: boolean
    maxLength?: number
    onKeyUp?: (e: any) => void
    value?: any
}
const DefaultInput: FC<IDefaultInput> = (props) => {
    return (
        <div className="default-input-container" data-name={props.name}>
            <input className="default-input" {...props} />

            {props?.loading && (
                <div className="loading" />
            )}
        </div>
    )

}

export default DefaultInput