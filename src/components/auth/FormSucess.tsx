interface IFormSuccessProps {
  message?: string;
}

const FormSuccess: React.FC<IFormSuccessProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="flex w-full items-center gap-x-2 rounded-md bg-emerald-500/15 p-3 text-sm text-emerald-500">
      <p>{message}</p>
    </div>
  );
};

export default FormSuccess;
