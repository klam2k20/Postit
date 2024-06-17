import SignUpForm from "@/components/auth/SignUpForm";

//todo update sign up workflow
//todo update verification workflow
//todo refactor to components for things like loader button or success message with button
export default function SignUp() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex w-[400px] flex-col items-start justify-center gap-y-4">
        <h1 className="text-2xl font-semibold leading-none">Welcome Back!</h1>
        <SignUpForm />
      </div>
    </main>
  );
}
