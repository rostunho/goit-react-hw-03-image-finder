import Loader from 'react-loader-spinner';
import { createPortal } from 'react-dom';
// import PropTypes from 'prop-types';
import { LoaderContainer, LoaderOverlay } from './Loader.styled';

function Spinner({ bgColor }) {
  return createPortal(
    <LoaderOverlay style={{ backgroundColor: bgColor }}>
      <LoaderContainer>
        <Loader type="Oval" color="#00BFFF" height={100} width={100} />
      </LoaderContainer>
    </LoaderOverlay>,
    document.getElementById('modal-root'),
  );
}

export default Spinner;
