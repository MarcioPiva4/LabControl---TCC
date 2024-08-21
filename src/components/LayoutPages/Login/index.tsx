"use client"

import Image from "next/image";
import styled from "styled-components"
import logo from "../../../../public/logo.png";
import DefaultForm from "@/components/DefaultForm";
import { useState } from "react";
import { signIn } from "next-auth/react";


const SectionWrappaper = styled.section`
    width: 100%;
    height: 100vh;
    .login{
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        height: 100%;
        align-items: center;
        position: relative;

        &::after{
            content: '';
            position: absolute;
            width: 100%;
            height: 200px;
            bottom: 0;
            background-color: #041833;
            z-index: -1;
        }

        .background {
            position: absolute;
            z-index: -1;
            top: 23%;
            width: 100%;
            height: auto;
            svg{
                height: 100%;
            }
        }


        &__morebuttons{
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            margin-top: 4vh;

            p{
                color: #94A3B8;
                font-size: 14px;
                font-weight: 400;
                line-height: 20px;
            }

            div{
                display: flex;
                align-items: center;
                gap: 10px;
                margin-top: 2vh;
                width: 100%;
            }

            button{
                display: flex;
                flex: 1;
                justify-content: center;
                align-items: center;
                height: 40px;
                background-color: #334155;
                border: 1px solid #94A3B8;
                border-radius: 4px;
                gap: 5px;
                cursor: pointer;
                span{
                    color: #94A3B8;
                    line-height: 20px;
                    font-weight: 400;
                    font-size: 14px;
                }
            }
        }


        &__content{
            width: 80%;

            h2{
                font-size: 32px;
                color: #fff;
                line-height: 37.5px;
                letter-spacing: 2px;
                margin-bottom: 50px;
                text-align: center;
            }

            form{
                label{
                    position: relative;
                    margin-bottom: 35px;

                    span{
                        position: absolute;
                        color: #94A3B8;
                        transition: 0.2s all;
                        bottom: 30%;
                    }

                    input{
                        border: none;
                        background-color: transparent;
                        border-bottom: 2px solid #64748B;
                        width: 100%;
                        height: 100%;
                        outline: none;
                        color: #CCCCCC;
                        font-size: 16px;
                        line-height: 20px;
                        font-weight: 400;
                        padding-bottom: 10px;
                        transition: 0.2s all;


                        &:focus{
                            border-color: #fff;
                        }
                    }

                    &:focus-within {
                        span {
                            color: #fff;
                            bottom: 110%;
                        }
                    }
                }

                .active{
                        span{
                            color: #fff;
                            bottom: 110%;
                        }

                        input{
                            border-color: #fff;
                        }
                }


                button{
                    background-color: #334155;
                    border: none;
                    height: 40px;
                    border-radius: 5px;
                    color: #fff;
                    font-weight: 500;
                    line-height: 20px;
                    cursor: pointer;
                    font-size: 16px;
                    transition: 0.2s all;

                    &:hover{
                        background-color: #41536d;
                    }
                }
            }
        }
    }
`;

export default function LoginLayout(){
    const [valueEmail, setValueEmail] = useState('');
    const [valuePassword, setValuePassword] = useState('');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            email: formData.get('email'),
            password: formData.get('password')
        };

        signIn("credentials", {
            ...data,
            callbackUrl: '/'
        });
    } 
    return(
        <SectionWrappaper>
            <div className="login">
                <div>
                    <Image src={logo} alt="logo da labcontrol"></Image>
                </div>
                <div className="background">
                    <svg viewBox="0 0 360 350" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M8.69437 146.346C4.44282 150.255 1.45197 155.267 0 160.748V350H360V168.429C360 160.036 356.484 152.027 350.306 146.346L199.806 7.96216C188.326 -2.59314 170.674 -2.59314 159.194 7.96216L8.69437 146.346Z" fill="#041833"/>
                    </svg>
                </div>
                <div className="login__content">
                    <h2>Login</h2>
                    <DefaultForm onSubmit={e => handleSubmit(e)}>
                        <label className={valueEmail.length >= 1  ? 'active' : ''}>
                            <span>Email</span>
                            <input type="email" onChange={(e) => setValueEmail(e.target.value)} value={valueEmail} name="email"></input>
                        </label>

                        <label className={valuePassword.length >= 1  ? 'active' : ''}>
                            <span>Senha</span>
                            <input type="password" onChange={(e) => setValuePassword(e.target.value)} value={valuePassword} name="password"></input>
                        </label>
                        <button type="submit">Entrar</button>
                    </DefaultForm>
                    <div className="login__morebuttons">
                        <p>Ou continue com</p>
                        <div>
                            <button>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.537 6.69425H14V6.66659H8.00001V9.33325H11.7677C11.218 10.8856 9.74101 11.9999 8.00001 11.9999C5.79101 11.9999 4.00001 10.2089 4.00001 7.99992C4.00001 5.79092 5.79101 3.99992 8.00001 3.99992C9.01968 3.99992 9.94734 4.38459 10.6537 5.01292L12.5393 3.12725C11.3487 2.01759 9.75601 1.33325 8.00001 1.33325C4.31834 1.33325 1.33334 4.31825 1.33334 7.99992C1.33334 11.6816 4.31834 14.6666 8.00001 14.6666C11.6817 14.6666 14.6667 11.6816 14.6667 7.99992C14.6667 7.55292 14.6207 7.11659 14.537 6.69425Z" fill="#FFC107"/>
                                    <path d="M2.10199 4.89692L4.29232 6.50325C4.88499 5.03592 6.32032 3.99992 7.99999 3.99992C9.01966 3.99992 9.94732 4.38458 10.6537 5.01292L12.5393 3.12725C11.3487 2.01759 9.75599 1.33325 7.99999 1.33325C5.43932 1.33325 3.21866 2.77892 2.10199 4.89692Z" fill="#FF3D00"/>
                                    <path d="M8 14.6667C9.722 14.6667 11.2867 14.0077 12.4697 12.936L10.4063 11.19C9.71451 11.7161 8.86915 12.0007 8 12C6.266 12 4.79367 10.8943 4.239 9.35132L2.065 11.0263C3.16834 13.1853 5.409 14.6667 8 14.6667Z" fill="#4CAF50"/>
                                    <path d="M14.537 6.69441H14V6.66675H8V9.33341H11.7677C11.5047 10.0722 11.0311 10.7178 10.4053 11.1904L10.4063 11.1897L12.4697 12.9357C12.3237 13.0684 14.6667 11.3334 14.6667 8.00008C14.6667 7.55308 14.6207 7.11675 14.537 6.69441Z" fill="#1976D2"/>
                                </svg>
                                <span>Google</span>
                            </button>
                            <button>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_725_6869)">
                                    <path d="M6.66667 15.9111C2.88889 15.2444 0 11.9556 0 8C0 3.6 3.6 0 8 0C12.4 0 16 3.6 16 8C16 11.9556 13.1111 15.2444 9.33333 15.9111L8.88889 15.5556H7.11111L6.66667 15.9111Z" fill="url(#paint0_linear_725_6869)"/>
                                    <path d="M11.1111 10.2222L11.4667 7.99997H9.33332V6.44442C9.33332 5.8222 9.55555 5.33331 10.5333 5.33331H11.5555V3.28886C10.9778 3.19997 10.3555 3.11108 9.77777 3.11108C7.95555 3.11108 6.66666 4.2222 6.66666 6.2222V7.99997H4.66666V10.2222H6.66666V15.8666C7.1111 15.9555 7.55555 16 7.99999 16C8.44443 16 8.88888 15.9555 9.33332 15.8666V10.2222H11.1111Z" fill="white"/>
                                    </g>
                                    <defs>
                                    <linearGradient id="paint0_linear_725_6869" x1="8" y1="15.4462" x2="8" y2="0" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#0062E0"/>
                                    <stop offset="1" stopColor="#19AFFF"/>
                                    </linearGradient>
                                    <clipPath id="clip0_725_6869">
                                    <rect width="16" height="16" fill="white"/>
                                    </clipPath>
                                    </defs>
                                </svg>
                                <span>Facabook</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrappaper>
    )
}