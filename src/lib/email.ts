import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API);

export const sendVerificationEmail = async (email: string, token: string) => {
  const link = `http://localhost:3000/auth/new-verification?token=${token}`
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'lam.ke.nyc@gmail.com',
    subject: 'Hello World',
    html: `<p>Thank you for signing up for Postit. To cofirm your account, please follow the following <a href=${link}>link</a>`
  });
}
