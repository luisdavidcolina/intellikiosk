import {useState, useContext} from 'react';
import styled from 'styled-components';
import { MdSpanBlack, MdSpanWhite, SmSpanBlack, SmSpanPrimary, XsSpanLightGray } from '@/components/StyledText';
import {ModalContext, MenuContext} from '@/data/context';

const ModalHeader = styled.div`
  height: 6.25vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ModalFooter = styled.div`
  height: 11.46vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface IActivable {
  active?: boolean;
}

const ModalFooterBtn = styled.div<IActivable>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 71.3vw;
  height: 5.21vh;
  border-radius: 5px;
  background-color: ${props => props.active ? '#000' : '#e0e0e0'};
`;

const Option = styled.div`
  height: calc(13.54vh - 130px);
  width: calc(100% - 130px);
  display: flex;
  padding: 65px;
  align-items: center;
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    padding: 50px 30px;
    height: calc(13.54vh - 60px);
    width: calc(100% - 100px);
  }
`;

const OptionSelectedWrapper = styled.div`
  margin-right: 30px;
  height: 100%;
  display: flex;
  align-items: start;
`;

const OptionSelected = styled.img`
  margin: 15px 0;
  width: 4.63vw;
`;

const OptionDetail = styled.div`
  display: flex;
  flex-direction: column;
  & > span {
    margin: 7.5px;
  }
`;

const OptionImgWrapper = styled.div`
  margin-left: auto;
  display: flex;
  align-item: center;
  justify-content: center;
`;

const OptionImg = styled.img`
  width: 18.52vw;
`;

const SelectSet = () => {
  const [selected, setSelected] = useState('');
  const { modalProps, openModal, closeModal } = useContext(ModalContext);
  const { menu } = modalProps;
  const { setItem } = useContext(MenuContext);
  const onBtnClicked = () => {
    if(!!selected) {
      if (selected === 'largeSet') {
        closeModal();
        setItem(Object.assign(menu, {setType: selected}));
        return;
      }
      openModal('upgradeSet', { menu, selected });
    }
  }
  return <>
    <ModalHeader>
      <MdSpanBlack>원하시는 구성을 선택해주세요</MdSpanBlack>
    </ModalHeader>
    <ModalBody>
      <Option onClick={() => setSelected('largeSet')}>
        <OptionSelectedWrapper>
          <OptionSelected src={`images/modal/ic_${selected === 'largeSet' ? '' : 'un'}checked.png`}/>
        </OptionSelectedWrapper>
        <OptionDetail>
          <SmSpanBlack>{menu.menuName} 라지세트</SmSpanBlack>
          <XsSpanLightGray>{menu.menuName}+프렌치프라이L+콜라L</XsSpanLightGray>
          <SmSpanPrimary>S/. {parseInt(menu.price, 10) + 2700}</SmSpanPrimary>
        </OptionDetail>
        <OptionImgWrapper>
          <OptionImg src={menu.setImg}/>
        </OptionImgWrapper>
      </Option>
      <Option onClick={() => setSelected('set')}>
        <OptionSelectedWrapper>
          <OptionSelected src={`images/modal/ic_${selected === 'set' ? '' : 'un'}checked.png`}/>
        </OptionSelectedWrapper>
        <OptionDetail>
          <SmSpanBlack>{menu.menuName} 세트</SmSpanBlack>
          <XsSpanLightGray>{menu.menuName}+프렌치프라이R+콜라R</XsSpanLightGray>
          <SmSpanPrimary>S/. {parseInt(menu.price, 10) + 2000}</SmSpanPrimary>
        </OptionDetail>
        <OptionImgWrapper>
          <OptionImg src={menu.setImg}/>
        </OptionImgWrapper>
      </Option>
      <Option onClick={() => setSelected('normal')}>
        <OptionSelectedWrapper>
          <OptionSelected src={`images/modal/ic_${selected === 'normal' ? '' : 'un'}checked.png`}/>
        </OptionSelectedWrapper>
        <OptionDetail>
          <SmSpanBlack>{menu.menuName}</SmSpanBlack>
          <XsSpanLightGray>{menu.menuName}</XsSpanLightGray>
          <SmSpanPrimary>S/. {menu.price}</SmSpanPrimary>
        </OptionDetail>
        <OptionImgWrapper>
          <OptionImg src={menu.img}/>
        </OptionImgWrapper>
      </Option>
    </ModalBody>
    <ModalFooter>
      <ModalFooterBtn active={!!selected} onClick={onBtnClicked}>
        <MdSpanWhite>확인</MdSpanWhite>
      </ModalFooterBtn>
    </ModalFooter>
  </>;
}

export default SelectSet;