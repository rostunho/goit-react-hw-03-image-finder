import Loader from 'react-loader-spinner';
import { LoaderContainer, LoaderOverlay } from './Loader.styled';

function Spinner() {
  return (
    <LoaderOverlay>
      <LoaderContainer>
        <Loader type="Oval" color="#00BFFF" height={100} width={100} />
      </LoaderContainer>
    </LoaderOverlay>
  );
}

export default Spinner;
