import { LoadMoreButton } from "./Button.styled";

function Button({ loadMore }) {
  return (
    <LoadMoreButton type="button" onClick={loadMore}>
      Load more
    </LoadMoreButton>
  );
}

export default Button;
