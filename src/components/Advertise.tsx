import React, {useContext} from 'react';
import styled from 'styled-components';
import {PageContext, MenuContext} from '@/data/context';

const ADImage = styled.div`
  width: 100%;
  height: 10vh;
  background-color: #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
      <h2 className="card-title text-white p-5">{getTime()}</h2>
    </ADImage>
  );
}

export default Advertise;