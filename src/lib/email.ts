import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API);


//TODO: Change to email after domain is created for Resend
export const sendVerificationEmail = async (email: string, token: string) => {
  const link = `http://localhost:3000/new-verification?token=${token}`
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'lam.ke.nyc@gmail.com',
    subject: 'Confirm your Postit account',
    html: `<p>Thank you for signing up for Postit. To cofirm your account, please follow the following <a href=${link}>link</a>`
  });
}
