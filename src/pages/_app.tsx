import type { AppProps } from 'next/app';
import styled, { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset};
`;

const PageWrapper = styled.div`
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
