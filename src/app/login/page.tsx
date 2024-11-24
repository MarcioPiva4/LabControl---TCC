import LoginLayout from "@/components/LayoutPages/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "LabControl | Login",
    description: "Login Labcontrol",
};

export default function Login(){
    return(
        <LoginLayout></LoginLayout>
    )
}