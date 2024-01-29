import styled from 'styled-components';

export const WrapperButton = styled.button`
  padding: 10px;
  align-items: center;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  transition: all 0.5s ease;
  
  border-radius: ${(props) =>
        props.variant === 'primary-outlined-rev' ? '4px' : "5px"};

  background-color: ${(props) =>
        props.variant === 'danger' ? 'red' :
            props.variant === 'button-primary' ? 'transparent' :
                props.variant === 'facebook-outlined'
                    ? '#4267B2'
                    : props.variant === 'google-outlined'
                        ? '#DC3545'
                        : 'inherit'};
  
  border: 1px solid
    ${(props) =>
        props.variant === 'primary-outlined-rev' ? 'white' :
            props.variant === 'google-outlined'
                ? '#DC3545'
                : props.variant === 'facebook-outlined'
                    ? '#4267B2'
                    : 'inherit'}; 
  
  color: ${(props) =>
        props.variant === 'danger' ? 'white' :
            props.variant === 'button-transparent' ? 'var(--primary-color)' : 'inherit'};

  &:hover {
    box-shadow: inset rgba(100, 100, 111, 0.2) 0px 7px 50px 10px;
    background-color: ${(props) =>
        props.variant === 'button-primary' ? 'var(--hover-bg-color)' :
            props.variant === 'button-secondary' ? 'var(--hover-bg-secondary)' : ''};
    color: ${(props) =>
        props.variant === 'button-primary'
            ? 'var(--primary-color)' : null}
    }
`;
