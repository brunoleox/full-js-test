import { Btn } from "./styles";

const Button = (props) => {
  return (
    <Btn>
      {props.name}
    </Btn>
  );
};

export default Button;