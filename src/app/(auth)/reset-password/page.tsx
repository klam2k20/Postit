import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

const ResetPassowrd: React.FC = () => {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex w-[400px] flex-col items-start justify-center gap-y-4">
        <h1 className="text-2xl font-semibold leading-none">
          Reset your Password
        </h1>
        <ResetPasswordForm />
      </div>
    </main>
  );
};

export default ResetPassowrd;
