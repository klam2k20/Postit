import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export default function ForgotPassword() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex w-[400px] flex-col items-start justify-center gap-y-4">
        <h1 className="text-2xl font-semibold leading-none">
          Reset your Password
        </h1>
        <ForgotPasswordForm />
      </div>
    </main>
  );
}
