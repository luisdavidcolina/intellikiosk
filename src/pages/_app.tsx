import type { AppProps } from 'next/app';
import styled, { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset};

  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400&display=swap');

  * {
    font-family: 'Montserrat', sans-serif !important;
  }
`;

const PageWrapper = styled.div`
  font-family: 
  position: relative;
  padding: 0;
  margin: 0;
  width: 100vw;
  height: 100vh;
`;

const App = ({ Component, pageProps }: AppProps) => {
  return <PageWrapper>
    <GlobalStyle />
    <Component {...pageProps} />
  </PageWrapper>
}
export default App;
