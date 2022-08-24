import { showNotification } from "@mantine/notifications";
import { FaCheckCircle } from "react-icons/fa";
import { FiAlertTriangle } from "react-icons/fi";
import { VscError } from "react-icons/vsc";

export const SuccessNotification = ({ message, title = "Success" }) => {
  return showNotification({
    title,
    message,
    color: "teal",
    icon: <FaCheckCircle />,
  });
};

export const WarningNotification = ({ message, title = "Warning" }) => {
  return showNotification({
    title,
    message,
    color: "orange",
    icon: <FiAlertTriangle />,
  });
};

export const ErrorNotification = ({ message, title = "Error" }) => {
  return showNotification({
    title,
    message,
    color: "red",
    icon: <VscError />,
  });
};
