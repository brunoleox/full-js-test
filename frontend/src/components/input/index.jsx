import { AreaText } from "./styles";

const Input = (props) => {
  return <AreaText 
  placeholder={props.placeholder} 
  onChange={props.onChange}
  type={props.type}
  id={props.id}
  name={props.name}
  >

  </AreaText>;
};

export default Input;
