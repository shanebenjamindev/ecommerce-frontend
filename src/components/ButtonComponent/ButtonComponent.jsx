import { WrapperButton } from "./style";

export default function ButtonComponent(props) {
    return (
        <WrapperButton variant={props.variant} type={props.type} onClick={props.onClick}>
            {props.text}
        </WrapperButton>
    )
}
