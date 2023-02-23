import styled from 'styled-components';

interface ISpan {
  margin?: string;
}

export const LgSpanBlack = styled.span<ISpan>`
  margin: ${props => props.margin};
  font-family: S-CoreDream-7;
  font-size: 60px;
  font-weight: 800;
  color: #000000;
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 40px;
  }
`;

export const LgSpanWhite = styled.span<ISpan>`
  margin: ${props => props.margin};
  font-family: S-CoreDream-7;
  font-size: 60px;
  font-weight: 800;
  color: #ffffff;
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 40px;
  }
`;

export const LgSpanPrimary = styled.span<ISpan>`
  margin: ${props => props.margin};
  font-family: S-CoreDream-7;
  font-size: 60px;
  font-weight: 800;
  color: #de0000;
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 40px;
  }
`;

export const MdSpanBlack = styled.span<ISpan>`
  margin: ${props => props.margin};
  font-family: S-CoreDream-7;
  font-size: 40px;
  font-weight: 800;
  color: #000000;
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 25px;
  }
`;

export const MdSpanWhite = styled.span<ISpan>`
  margin: ${props => props.margin};
  font-family: S-CoreDream-7;
  font-size: 40px;
  font-weight: 800;
  color: #ffffff;
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 25px;
  }
`;

export const MdSpanPrimary = styled.span<ISpan>`
  margin: ${props => props.margin};
  font-family: S-CoreDream-7;
  font-size: 40px;
  font-weight: 800;
  color: #de0000;
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 25px;
  }
`;

export const SmSpanBlack = styled.span<ISpan>`
  margin: ${props => props.margin};
  font-family: S-CoreDream-7;
  font-size: 30px;
  font-weight: 800;
  color: #000000;
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 20px;
  }
`;

export const SmSpanLightBlack = styled.span<ISpan>`
  margin: ${props => props.margin};
  font-family: S-CoreDream-4;
  font-size: 30px;
  font-weight: 400;
  color: #000000;
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 20px;
  }
`;

export const SmSpanWhite = styled.span<ISpan>`
  margin: ${props => props.margin};
  font-family: S-CoreDream-7;
  font-size: 30px;
  font-weight: 800;
  color: #ffffff;
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 20px;
  }
`;

export const SmSpanLightGray = styled.span<ISpan>`
  margin: ${props => props.margin};
  font-family: S-CoreDream-6;
  font-size: 30px;
  font-weight: 600;
  color: #bdbdbd;
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 20px;
  }
`;

export const SmSpanBoldGray = styled.span<ISpan>`
  margin: ${props => props.margin};
  font-family: S-CoreDream-6;
  font-size: 30px;
  font-weight: 600;
  color: rgba(0,0,0,0.6);
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 20px;
  }
`;

export const XsSpanBlack = styled.span<ISpan>`
  margin: ${props => props.margin};
  font-family: S-CoreDream-7;
  font-size: 20px;
  font-weight: 800;
  color: #000000;
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 15px;
  }
`;

export const XsSpanWhite = styled.span<ISpan>`
  margin: ${props => props.margin};
  font-family: S-CoreDream-7;
  font-size: 20px;
  font-weight: 800;
  color: #ffffff;
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 15px;
  }
`;

export const XsSpanBoldGray = styled.span<ISpan>`
  margin: ${props => props.margin};
  font-family: S-CoreDream-6;
  font-size: 20px;
  font-weight: 600;
  color: rgba(0,0,0,0.6);
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 15px;
  }
`;

export const XsSpanLightGray = styled.span<ISpan>`
  margin: ${props => props.margin};
  font-family: S-CoreDream-6;
  font-size: 20px;
  font-weight: 600;
  color: #bdbdbd;
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 15px;
  }
`;