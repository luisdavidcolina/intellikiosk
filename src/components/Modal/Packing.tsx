import {useState, useContext} from 'react';
import styled from 'styled-components';
import { MdSpanBlack, MdSpanWhite, SmSpanBlack } from '@/components/StyledText';
import {ModalContext, PageContext} from '@/data/context';

const ModalHeader = styled.div`
  height: 11.46vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBody = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalFooter = styled.div`
  height: 11.46vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Option = styled.div`
  width: 35.65vw;
  height: 24.48vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const OptionImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 60px;
`;

const OptionImg = styled.img`
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    width: 11.11vw;
  }
`;

const SelectedImg = styled.img`
  position: absolute;
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    width: 11.11vw;
  }
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

const Packing = () => {
  const [selected, setSelected] = useState('');
  const { setPage } = useContext(PageContext);
  const { closeModal } = useContext(ModalContext);
  const onBtnClicked = () => {
    if(!!selected) {
      closeModal();
      setPage("payment");
    }
  }
  return <>
    <ModalHeader>
       <MdSpanBlack>Seleccionar</MdSpanBlack>
     </ModalHeader>
     <ModalBody>
       <Option onClick={() => setSelected('instore')}>
         <OptionImgWrapper>
           <OptionImg src="images/modal/ic_instore.png"/>
           {selected === 'instore' && <SelectedImg src="images/modal/ic_selected.png"/>}
         </OptionImgWrapper>
         <SmSpanBlack>Comer aqui</SmSpanBlack>
       </Option>
       <Option onClick={() => setSelected('packing')}>
         <OptionImgWrapper>
           <OptionImg src="images/modal/ic_packing.png"/>
           {selected === 'packing' && <SelectedImg src="images/modal/ic_selected.png"/>}
         </OptionImgWrapper>
         <SmSpanBlack>Para llevar</SmSpanBlack>
       </Option>
     </ModalBody>
     <ModalFooter>
       <ModalFooterBtn active={!!selected} onClick={onBtnClicked}>
         <MdSpanWhite>OK</MdSpanWhite>
       </ModalFooterBtn>
     </ModalFooter>
  </>;
}

export default Packing;