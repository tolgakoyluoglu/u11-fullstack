import styled from 'styled-components';

const Card = styled.div`
  width: 90%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 3px;
  border: 1px solid #e6e6e6;
  background-color: #fff;
  margin-bottom: 60px;
  border-radius: 5px;
  @media only screen and (min-width: 1000px) {
    width: 70%;
  }
  @media only screen and (min-width: 1200px) {
    width: 40%;
  }
`;

const Image = styled.img`
  min-width: 100%;
  min-height: 100%;
  width: 1000px;
  height: auto;
  max-width: 100%;
  max-height: 600px;
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-self: start;
`;

const CardBody = styled.div`
  display: flex;
  align-self: start;
  margin: 10px;
  font-size: 14px;
  p {
    margin: 3px;
  }
  a {
    text-decoration: none;
    color: #000;
    font-weight: 600;
  }
`;

const ImageContainer = styled.div`
  height: 32px;
  width: 32px;
  padding: 10px;
  img {
    width: 100%;
    height: 100%;
  }
`;

const CommentContainer = styled.div`
  border-top: 1px solid #e6e6e6;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  button {
    background: none;
    border: none;
    padding: 0;
    color: #3897f0;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    margin-right: 10px;
  }
  input {
    border: none;
    height: 40%;
    padding: 15px;
    width: 100%;

    &:focus {
      outline: none !important;
      border: none;
    }
  }
`;

export { Image, Card, CardBody, CardHeader, ImageContainer, CommentContainer };