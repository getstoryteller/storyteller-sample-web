import { Link } from 'react-router-dom';
import './TitleAndMoreButton.css';

const TitleAndMoreButton = ({ title, moreButtonTitle = 'More', category }) => {
  return (
    <div className="title-and-more-button">
      {title && <h2>{title}</h2>}
      {title && moreButtonTitle && (
        <div className="more-button">
          <Link to={'/category/' + category}>{moreButtonTitle}</Link>
        </div>
      )}
    </div>
  );
};

export default TitleAndMoreButton;