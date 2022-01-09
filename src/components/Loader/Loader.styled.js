import styled from 'styled-components';

export const LoaderContainer = styled.div`
  /* position: fixed;   */

  /* width: 100%;
  height: 100%; */

  /* z-index: 1300;
  display: flex;
  justify-content: center;
  align-items: center; */

  /* top: 40%;
  left: 48%; */
`;

export const LoaderOverlay = styled.div`
  position: fixed;
  z-index: 1300;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;
