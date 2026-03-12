import { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
    title: "Sign In",
    description: "Access your Flint dashboard to monitor and manage real-time fraud detection.",
};

export default function LoginPage() {
    return <LoginForm />;
}
