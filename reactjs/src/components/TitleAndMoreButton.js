import { Link } from 'react-router-dom';
import './TitleAndMoreButton.css';

const TitleAndMoreButton = ({ title, moreButton }) => {
  return (
    <div className="title-and-more-button">
      {title && <h2>{title}</h2>}
      {title && moreButton && (
        <div className="more-button">
          <Link to={moreButton.link}>{moreButton.title}</Link>
        </div>
      )}
    </div>
  );
};

export default TitleAndMoreButton;
