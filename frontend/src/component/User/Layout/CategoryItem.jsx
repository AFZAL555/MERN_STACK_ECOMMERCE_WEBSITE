import styled from "styled-components";
import { mobile } from "../../../responsive";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
  ${mobile({ height: "20vh",margin:"1px", })}
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
 

`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

`;

const Title = styled.h1`
    color:white;
    margin-bottom: 20px;
    ${mobile({  marginBottom:"15px" })}
`;

const Button = styled.button`
    border:none;
    border-radius:4px;
    padding: 10px;
    background-color: white;
    color:gray;
    cursor: pointer;
    font-weight: 600;
    ${mobile({ fontWeight: "400 "})}
`;
const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Image src={item.img} />
      <Info>
        <Title>{item.title}</Title>
        {/* <Button>Let's Start</Button> */}
      </Info>
    </Container>
  );
};

export default CategoryItem;