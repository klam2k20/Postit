import { Icons } from "../Icons";
import { Button } from "./Button";

interface ISubmitBtnProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isSubmitting: boolean;
}

const SubmitBtn: React.FC<ISubmitBtnProps> = ({
  isSubmitting,
  children,
  ...props
}: ISubmitBtnProps) => {
  return (
    <Button type="submit" disabled={isSubmitting} className="w-full" {...props}>
      {isSubmitting && <Icons.loader className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
};

export default SubmitBtn;
