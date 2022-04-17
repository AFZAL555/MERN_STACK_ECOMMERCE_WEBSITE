import styled from "styled-components";
import CategoryItem from "./CategoryItem";
import { mobile } from "../../../responsive";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${ mobile( { padding: "0px", flexDirection: "column" } ) }

`;

const Categories = () =>
{
    const categories = [
        {
            id: 1,
            img: "/smartlovers.jpg",
            title: "ELECTRONICS",
        },
        {
            id: 2,
            img: "/mobileaccess.jpg",
            title: "ACCESSORIES",
        },
    ];




    return (
        <Container>
            { categories.map( ( item ) => (
                <CategoryItem item={ item } key={ item.id } />
            ) ) }
        </Container>
    );
};

export default Categories;