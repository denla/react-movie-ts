import { Link } from "react-router-dom";
const EmptyState = ({ title }) => {
  return (
    <div className="empty_state">
      <div className="empty_state--title">{title}</div>
      <Link to="/">
        <button>На главную</button>
      </Link>
    </div>
  );
};

export default EmptyState;
