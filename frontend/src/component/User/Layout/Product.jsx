
import {FavoriteBorderOutlined,SearchOutlined,ShoppingCartOutlined} from "@material-ui/icons";
import styled from "styled-components";

  
  const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;
  `;

  const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 280px;
    height: 390px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f5fbfd;
    position: relative;
    border:"1px solid #494949";
  
    &:hover ${Info}{
      opacity: 1;
    }
  `;
  
  const Typography = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
    margin-top: 20px;
  `;
  
  const Image = styled.img`
    height: 75%;
    z-index: 2;
    margin-bottom:3px;
  `;
  
  const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;
    &:hover {
      background-color: #e9f5f5;
      transform: scale(1.1);
    }
  `;
  
  
  const Product = ({ item }) => {
    return (
      
    );
  };

  export default Product;