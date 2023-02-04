import { useState, useContext } from "react";
import axios from "axios";
import { MdSpanBlack, MdSpanWhite, SmSpanBlack } from "@/components/StyledText";
import { ModalContext, PageContext } from "@/data/context";

import {ModalHeader,
Option,
OptionImgWrapper,
OptionImg,
SelectedImg,
ModalBody,
ModalFooter,
ModalFooterBtn,
KeyboardBtn
} from "./Billing.styles"

const Billing = () => {
  const [selected, setSelected] = useState("");
  const { setPage } = useContext(PageContext);
  const { closeModal } = useContext(ModalContext);
  const [companyId, setCompanyId] = useState("20601926840");
  const [companyName, setCompanyName] = useState("");

  const onBtnClicked = () => {
    if (!!selected) {
      closeModal();
      setPage("payment");
    }
  };
  
  const searchCompanyId = async (e:any) => {
    e.preventDefault();
    try {
      const response: any = await axios.get(
        `http://18.230.22.181:5000/users/${companyId}`
      );
      if (response.data.nombre !== undefined) {
        setCompanyName(String(response.data.nombre))
      }
    } catch (error) {
      //
    }
  }
  

  return (
    <>
      <ModalHeader>
        <MdSpanBlack>Tipo de Comprobante</MdSpanBlack>
      </ModalHeader>
      <ModalBody>
        <Option onClick={() => setSelected("instore")}>
          <OptionImgWrapper>
            <OptionImg src="images/order/ic_cash_insert.png" />
            {selected === "instore" && (
              <SelectedImg src="images/modal/ic_selected.png" />
            )}
          </OptionImgWrapper>
          <SmSpanBlack>Boleta</SmSpanBlack>
        </Option>
        <Option onClick={() => setSelected("packing")}>
          <OptionImgWrapper>
            <OptionImg src="images/order/ic_cash_insert.png" />
            {selected === "packing" && (
              <SelectedImg src="images/modal/ic_selected.png" />
            )}
          </OptionImgWrapper>
          <SmSpanBlack>Factura</SmSpanBlack>
        </Option>
      </ModalBody>
     <div style={{margin: 'auto'}}>
      <div style={{display: 'inline-flex'}} >
      <div style={{display: 'inline-grid', width: "35vh", height: "7vh"}}  >

        <input type="text" value={companyId} placeholder="DNI / RUC" ></input>
          <input disabled={false} type="text" value={companyName} placeholder="Nombre / Razon Social"></input>
        </div>
          <KeyboardBtn onClick={searchCompanyId} >
            B
          </KeyboardBtn>
        </div>
        <br/>
        <br/>
        
        <div style={{ margin: '10px 150px'}} >
          <div style={{width: '100%'}}>
          <div style={{display: 'inline-flex'}} >
            <KeyboardBtn onClick={()=>{setCompanyId(companyId+'8')}}>8</KeyboardBtn>
            <KeyboardBtn onClick={()=>{setCompanyId(""+companyId+'7')}}>7</KeyboardBtn>
            <KeyboardBtn onClick={()=>{setCompanyId(companyId+'9')}}>9</KeyboardBtn>
          </div></div>
          <div>
          <div style={{display: 'inline-flex'}}>
            <KeyboardBtn onClick={()=>{setCompanyId(companyId+'4')}}>4</KeyboardBtn>
            <KeyboardBtn onClick={()=>{setCompanyId(companyId+'5')}}>5</KeyboardBtn>
            <KeyboardBtn onClick={()=>{setCompanyId(companyId+'6')}}>6</KeyboardBtn>
          </div></div>
          <div>
          <div style={{display: 'inline-flex'}}>
            <KeyboardBtn onClick={()=>{setCompanyId(companyId+'1')}}>1</KeyboardBtn>
            <KeyboardBtn onClick={()=>{setCompanyId(companyId+'2')}}>2</KeyboardBtn>
            <KeyboardBtn onClick={()=>{setCompanyId(companyId+'3')}}>3</KeyboardBtn>
          </div></div>
          <div>
          <div style={{display: 'inline-flex'}}>
            <KeyboardBtn onClick={()=>{setCompanyId("");setCompanyName("")}}>x</KeyboardBtn>
            <KeyboardBtn onClick={()=>{setCompanyId(companyId+'0')}}>0</KeyboardBtn>
            <KeyboardBtn onClick={()=>{setCompanyId(companyId.slice(0, -1))}}>-</KeyboardBtn>
          </div></div>
        </div>
        
      </div>

      <ModalFooter>
        <ModalFooterBtn active={(selected==='instore'||(!!companyName))} onClick={onBtnClicked}>
          <MdSpanWhite>Enviar</MdSpanWhite>
        </ModalFooterBtn>
      </ModalFooter>
    </>
  );
};

export default Billing;
