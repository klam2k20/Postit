import { FiAlertCircle } from "react-icons/fi";

interface IFormErrorProps {
  message?: string;
}

const FormError: React.FC<IFormErrorProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="flex w-full items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
      <FiAlertCircle className="h-4 w-4 flex-shrink-0" />
      <p>{message}</p>
    </div>
  );
};

export default FormError;
