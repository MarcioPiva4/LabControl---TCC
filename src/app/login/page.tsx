import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
    title: "LabControl | Login",
    description: "Login Labcontrol",
};

const LoginLayout = dynamic(() => import('@/components/LayoutPages/Login'), { ssr: false });

export default function Login(){
    return(
        <LoginLayout></LoginLayout>
    )
}