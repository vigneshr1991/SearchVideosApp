import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-gap: 10px;
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
  grid-template-columns: repeat(1, 1fr);
  grid-auto-rows: minmax(25px, auto);
`;

const GridContainer = ({ children }) => (
  <Container>
    {children}
  </Container>
);

export default GridContainer;