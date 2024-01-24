import { WrapperButton } from "./style";

export default function ButtonComponent(props) {
    return (
        <WrapperButton variant={props.variant}>
            {props.text}
        </WrapperButton>
    )
}
