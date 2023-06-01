import { useSelector } from "react-redux";

const Notification = () => {
  const nofitication = useSelector((state) => state.notification);

  if (!nofitication) {
    return;
  }

  const style = {
    color: nofitication.type === "error" ? "red" : "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return <div style={style}>{nofitication.message}</div>;
};

export default Notification;
