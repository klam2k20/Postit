import SignInForm from "@/components/auth/SignInForm";

export default function SignIn() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex w-[400px] flex-col items-start justify-center gap-y-4">
        <h1 className="text-2xl font-semibold leading-none">Welcome Back!</h1>
        <SignInForm />
      </div>
    </main>
  );
}
