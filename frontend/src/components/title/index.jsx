import { Text, SubText } from "./styles";

const Title = (props) => {
  return (
    <Text>
      {props.title}
      <SubText>{props.subtitle}</SubText>
    </Text>
  );
};

export default Title;
