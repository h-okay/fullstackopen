import PropTypes from "prop-types";

const Notification = ({ text, type }) => {
  Notification.propTypes = {
    text: PropTypes.string,
    type: PropTypes.string,
  };

  if (text === null) {
    return null;
  }
  return <div className={type}>{text}</div>;
};

export default Notification;
