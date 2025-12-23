import { redirect } from 'next/navigation';

const REGISTRATION_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSc87SY7m32zM5lMmDW7jW1MOVeIN4rLPJuyyMf7MTmLTfT9Hg/viewform?usp=sharing&ouid=103922860105045263948';

export default function RegisterPage() {
  redirect(REGISTRATION_FORM_URL);
}
