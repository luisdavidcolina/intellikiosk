import React from 'react';
import styled from 'styled-components';

const ADImage = styled.div`
  width: 100%;
  height: 100%;
  background-color: #010E42;
  display: flex;
  justify-content: space-between;

`;

const Logo = styled.img`
  height: 6vh;
  padding: 5px;
`;
const getTime = () => {
  const date = new Date();
  return `${date.getHours()}:${date.getMinutes()}`;
};

const Advertise = () => {
  return (
    <ADImage  >
      <Logo src='/logo.png'/>
      <h2 className="card-title text-white p-3">{getTime()}</h2>
    </ADImage>
  );
}

export default Advertise;