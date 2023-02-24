import React, {useContext} from 'react';
import styled from 'styled-components';
import {PageContext, MenuContext} from '@/data/context';

const ADImage = styled.div`
  width: 100%;
  height: 7vh;
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
  const {setPage} = useContext(PageContext);
  const handleClick = (e: any) => {
    e.preventDefault();
    setPage("home");
  }
  return (
    <ADImage  >
      <Logo onClick={handleClick} src='/logo.png'/>
      <h2 className="card-title text-white p-3">{getTime()}</h2>
    </ADImage>
  );
}

export default Advertise;