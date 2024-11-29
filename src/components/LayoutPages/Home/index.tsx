'use client'

import { useSession } from "next-auth/react";
import styled from "styled-components";

import imageUser from '@/../public/user.webp';
import Image from "next/image";
import Link from "next/link";
import { AulaItems, AulaReq } from "@/types/aula";
import { useState } from "react";

export default function Home({ aulas }: {aulas: AulaReq}){
    const { data: session, status } = useSession(); 
    const [aulasDataInProgress, setAulasDataInProgress] = useState(aulas.data.filter((e) => e.status == 'in progress'));
    const [aulasDataFinish, setAulasDataFinish] = useState(aulas.data.filter((e) => e.status == 'finish'));
    
    return(
        session?.user.role == 'prof' ? (
            <HomeDashboardProfessor image={session?.user.image} nome={session?.user.name} totalAulasInProgress={aulasDataInProgress.length} totalAulasFinish={aulasDataFinish.length}></HomeDashboardProfessor>
        ) : (
            // <HomeDashboardAdministrador nome={session?.user.name}></HomeDashboardAdministrador>
            <HomeDashboardProfessor image={session?.user.image} nome={session?.user.name} totalAulasInProgress={aulasDataInProgress.length} totalAulasFinish={aulasDataFinish.length}></HomeDashboardProfessor>
        )

    )
}


const Section = styled.section`
    height: 100%;
    width: 100%;
    max-width: 90%;
    margin: 0 auto;
    padding-bottom: 150px;
`;

const ContentAboutUser = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 5vh;
    .user{
        display: flex;
        align-items: center;
        gap: 10px;
        figure{
            max-width: 60px;
            max-height: 60px;
            border-radius: 50%;
            overflow: hidden;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        h3{
            font-size: 12px;
            font-weight: 500;
            line-height: 14px;
            color: #fff;
            margin-bottom: 5px;
        }

        p{
            font-size: 16px;
            font-weight: 700;
            line-height: 14px;
            color: #fff;
        }
    }

    .icons{
        a{
            width: 50px;
            height: 50px;
            display: block;
            background-color: #fff;
            border-radius: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            text-decoration: none;
            color: #041833;
            font-size: 45px;
        }
    }
`;

const ContentNotification = styled.div`
    margin-top: 40px;
    width: 100%;
    background-color: #041833;
    border-radius: 10px;
    padding: 20px 25px;
    max-height: 500px;
    min-height: 150px;
    color: #ffff;
    .notication-text{
        display: flex;
        justify-content: space-between;
        align-items: center;

    }
`;

const ContentItens = styled.div`
    margin-top: 50px;
    display: flex;
    justify-content: flex-start;
    gap: 40px;
    flex-wrap: wrap;
    @media screen and (max-width: 510px){
        justify-content: center;
    }
    .item{
        width: 220px;
        height: 220px;
        background-color: #041833;
        border-radius: 15px;
        position: relative;
        transition: 0.3s all;
        &:hover{
            background-color: #147EDF;
            p{
                color: #B8D8F5;
            }
            .icon{
                background-color: #8fcaff;
                svg{
                    path{
                        fill: #fff;
                    }
                }
            }
        }
        .icon{
            background-color: #fff;
            width: 50px;
            height: 50px;
            border-radius: 10px;
            padding: 5px;
            svg{
                width: 100%;
                height: 100%;
                path{
                    fill: #041833;
                }
            }
        }
        a{
            display: block;
            width: 100%;
            height: 100%;
            padding: 20px;
            display:flex;
            flex-direction: column;
            gap: 20px;
            text-decoration: none;
        }

        h2{
            font-size: 18px;
            font-weight: 700;
            line-height: 18px;
            color: #fff;
        }

        p{
            position: absolute;
            bottom: 25px;
            display: flex;
            flex-direction: column;
            align-items: center;
            right: 25px;
            color: #FFFFFF;
            span{
                &:first-child{
                    font-size: 60px;
                }

                &:last-child{
                    text-deconrantio
                }
            }
        }
    }
`;

function HomeDashboardAdministrador({ nome } : {nome?: string | null}){
    return(
        <Section></Section>
    )
}

function HomeDashboardProfessor({ nome, totalAulasInProgress, totalAulasFinish, image } : {nome?: string | null; totalAulasInProgress: number; totalAulasFinish:  number; image?: string | null}){
    return(
        <Section>
            <ContentAboutUser>
                <div className="user">
                    <figure>
                        <Image src={image ? imageUser : imageUser} alt="user profile" width={50} height={50}></Image>
                    </figure>
                    <div className="user-text">
                        <h3>Bem vindo(a) a tela inicial</h3>
                        <p>{nome ? nome : ''}</p>
                    </div>
                </div>

                <div className="icons">
                    <Link href="/cadastro/aula" title="Cadastrar Aula">
                        + 
                    </Link>
                </div>
            </ContentAboutUser>

            <ContentNotification>
                <div className="notication-text">
                    <h3>Notificações</h3>

                    <p>data</p>
                </div>

                <div className="Notifications"></div>
            </ContentNotification>

            <ContentItens>
                <div className="item">
                    <Link href="/baixa-aulas">
                        <div className="icon">
                            <svg width="26" height="17" viewBox="0 0 26 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.7518 14.3346H1.55994V15.1135H12.5984V14.5768C12.598 14.3762 12.5677 14.1959 12.5121 14.0328C12.4557 13.8696 12.3746 13.7212 12.2683 13.5825C12.056 13.3085 11.7391 13.0752 11.3376 12.8843C11.0703 12.7579 10.7664 12.6519 10.4367 12.563C9.99678 12.4447 9.5104 12.359 9.00265 12.3003C8.32492 12.222 7.60878 12.1918 6.90927 12.1918C4.66213 12.1918 2.58832 12.5051 2.46793 12.5238L2.46238 12.5246C2.38636 12.5369 2.30994 12.514 2.25096 12.4651C2.19289 12.4145 2.1601 12.3427 2.1601 12.2652V2.11765H1.55994V13.8109H10.7518C10.8965 13.8109 11.0141 13.9284 11.0141 14.0727C11.0141 14.2171 10.8965 14.3346 10.7518 14.3346Z" fill="white"/>
                                <path d="M14.4509 13.8109H24.0518C24.0912 13.8109 24.1275 13.8191 24.1603 13.8354V2.11765H23.5608V12.2652C23.5608 12.3427 23.5275 12.4145 23.469 12.4651C23.4113 12.514 23.3345 12.5369 23.258 12.5246L23.2524 12.5238C23.2491 12.523 23.2427 12.5222 23.2354 12.5205C23.2187 12.5189 23.1956 12.5148 23.1645 12.5108C23.1022 12.5018 23.0107 12.4887 22.8928 12.4732C22.6576 12.4422 22.3189 12.4006 21.9076 12.3582C21.0851 12.275 19.9709 12.1918 18.8115 12.1918C18.0078 12.1918 17.182 12.2318 16.4188 12.3378C15.6561 12.4447 14.9549 12.6176 14.4049 12.8745C14.0385 13.045 13.7405 13.2522 13.5273 13.4928C13.4051 13.6315 13.3099 13.7799 13.2424 13.9431C13.1647 14.1307 13.1228 14.3386 13.1224 14.5768V15.1135H24.1603V14.3109C24.1275 14.3256 24.0912 14.3346 24.0518 14.3346H14.4509C14.3066 14.3346 14.1892 14.2171 14.1892 14.0727C14.1892 13.9284 14.3066 13.8109 14.4509 13.8109Z" fill="white"/>
                                <path d="M12.5984 2.38507C12.598 2.1836 12.5677 2.00497 12.5121 1.84103C12.4557 1.67789 12.3746 1.52944 12.2683 1.3916C12.056 1.11672 11.7391 0.883441 11.3376 0.693393C11.0703 0.56615 10.7664 0.459302 10.4367 0.370396C9.99678 0.252125 9.5104 0.167295 9.00266 0.108568C8.32493 0.0302649 7.60878 8.29697e-05 6.90927 8.29697e-05C5.03701 8.29697e-05 3.28579 0.217051 2.68408 0.300248V11.9633C3.35708 11.872 5.06735 11.6681 6.90927 11.6681C7.73047 11.6681 8.57737 11.708 9.37419 11.819C10.1702 11.9299 10.9159 12.1102 11.5367 12.3989C11.9505 12.5922 12.3106 12.8353 12.5855 13.1452C12.5903 13.1501 12.5942 13.1558 12.5984 13.1599V2.38507Z" fill="white"/>
                                <path d="M15.1475 12.0555C15.6198 11.9291 16.1301 11.8402 16.6584 11.779C17.3617 11.6983 18.0962 11.6681 18.8115 11.6681C20.6526 11.6681 22.3629 11.872 23.0372 11.9633V0.300248C22.9941 0.294538 22.9467 0.288011 22.8928 0.281486C22.6576 0.249675 22.3189 0.208079 21.9076 0.166481C21.0851 0.0832834 19.9709 8.29697e-05 18.8115 8.29697e-05C18.0078 8.29697e-05 17.182 0.0400534 16.4188 0.14609C15.6561 0.252125 14.9549 0.425858 14.4049 0.682791C14.0385 0.854079 13.7405 1.06044 13.5273 1.30106C13.4051 1.4389 13.3099 1.58817 13.2424 1.75212C13.1647 1.9389 13.1228 2.14608 13.1224 2.38507V13.1599C13.1937 13.0792 13.2697 13.0017 13.3517 12.9291C13.8159 12.5204 14.4407 12.2472 15.1475 12.0555Z" fill="white"/>
                                <path d="M25.7374 16.2928H0.261747C0.117457 16.2928 0 16.4094 0 16.5546C0 16.699 0.117457 16.8164 0.261747 16.8164H25.7374C25.8822 16.8164 26 16.699 26 16.5546C26 16.4094 25.8822 16.2928 25.7374 16.2928Z" fill="white"/>
                            </svg>
                        </div>

                        <h2>Finalizar Aula</h2>
                        <p> <span>{totalAulasInProgress}</span> <span>Aulas</span></p>
                    </Link>
                </div>

                <div className="item">
                    <Link href="/manutencao">
                        <div className="icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.1163 21.8405C20.5906 22.3661 19.7356 22.3661 19.2099 21.8405C18.6834 21.314 18.6834 20.4591 19.2091 19.9333C19.7348 19.4076 20.5898 19.4076 21.1163 19.9341C21.6418 20.4599 21.6418 21.3148 21.1163 21.8405ZM22.0379 18.402C20.7461 17.2185 16.6872 14.7083 13.49 11.7888C11.2785 9.77025 9.96601 7.7225 9.70639 7.30163C9.67643 7.25176 9.62242 7.22258 9.56584 7.22258H9.40952L7.95396 8.67817L6.49841 10.1338V10.2901C6.49841 10.3467 6.52753 10.4007 6.57744 10.4306C6.99829 10.6902 9.04604 12.0027 11.0646 14.2143C13.984 17.4115 16.4943 21.4703 17.6778 22.7621V22.7603C17.7636 22.8743 17.8584 22.9841 17.9623 23.0881C19.1776 24.3032 21.1478 24.304 22.3639 23.0881C23.5798 21.8721 23.579 19.9016 22.3639 18.6865C22.2598 18.5826 22.15 18.4878 22.0361 18.402H22.0379Z" fill="#12283D"/>
                            <path d="M3.9201 0.0280304C3.16071 0.0804663 1.92392 0.236001 1.55213 0.547856C1.23523 0.813189 1.29013 1.14101 1.29013 1.14101L4.24197 2.24295L4.50232 3.16866L4.10641 4.02537L3.43767 5.46755L3.13327 6.12635L2.20504 8.13251L2.35974 8.37202C2.40881 8.44771 2.49034 8.49601 2.58015 8.50094L4.36673 8.60581L6.52013 9.57153L8.93383 7.15772L7.48577 2.13827C7.48577 2.13827 7.38264 1.61924 6.59247 0.80747C5.8015 -0.00350952 4.67947 -0.0244055 3.9201 0.0280304Z" fill="#12283D"/>
                            <path d="M2.86293 5.89596L3.32705 4.89455L3.70019 4.08692L2.90812 4.24226L0.252107 3.17718C0.252107 3.17718 0.0375153 3.39166 0.000908797 3.86417C-0.0148811 4.06623 0.167264 4.61266 1.16451 5.73629C1.73093 6.37261 2.15679 6.69531 2.41962 6.85498L2.86293 5.89596Z" fill="#12283D"/>
                            <path d="M4.0528 22.6795L3.50578 22.8274L2.18603 23.1802L0.818938 21.8134L1.17278 20.4944L1.32063 19.9466L3.18643 19.4469L4.55351 20.8139L4.0528 22.6795ZM8.3482 12.7712L2.48367 18.6357C1.8647 18.6808 1.25952 18.9412 0.787397 19.4143C-0.262303 20.463 -0.262303 22.1633 0.787397 23.213C1.83611 24.2627 3.53633 24.2627 4.58603 23.213C5.05914 22.7399 5.31836 22.1347 5.3647 21.5167L11.2214 15.6599C10.9671 15.3612 10.7078 15.0667 10.4457 14.7799C9.72418 13.9892 8.99675 13.3172 8.3482 12.7712ZM23.8434 3.38772L22.02 5.21016L19.4721 4.5281L18.7891 1.98024L20.6125 0.156813C19.0828 -0.253212 17.3816 0.141043 16.1821 1.34155C15.0486 2.47404 14.6346 4.05007 14.9352 5.50979C15.0072 5.85674 14.9027 6.21551 14.6533 6.46586L12.0463 9.07286C12.5924 9.72141 13.2646 10.448 14.0551 11.1695C14.3429 11.4327 14.6376 11.6907 14.9362 11.9452L17.5343 9.34687C17.7837 9.09652 18.1435 8.99322 18.4894 9.06517C19.9492 9.36481 21.5262 8.95064 22.6587 7.81834C23.8582 6.61863 24.2534 4.91743 23.8434 3.38772Z" fill="#12283D"/>
                        </svg>


                        </div>

                        <h2>Manutenção das aulas</h2>
                        <p> <span>{totalAulasInProgress}</span> <span>Aulas</span></p>
                    </Link>
                </div>

                <div className="item">
                    <Link href="/baixa-aulas">
                        <div className="icon">
                        <svg width="25" height="19" viewBox="0 0 25 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.71 10.6496L19.0629 11.0246V14.2012L19.7035 13.8286L19.71 10.6496Z" fill="#12283D"/>
                            <path d="M12.7461 14.5453L5.94903 10.6211L5.94336 13.8285L12.8457 17.8142L18.542 14.5032V11.3274L13.006 14.5445C12.9259 14.5915 12.8262 14.5915 12.7461 14.5453Z" fill="#12283D"/>
                            <path d="M18.3023 10.8651L12.6943 7.28682C12.5728 7.20987 12.538 7.0495 12.6149 6.92801C12.6927 6.80652 12.853 6.7717 12.9745 6.84864L18.8093 10.5703L24.8345 7.06894L12.7939 0.117219L0.834473 7.06732L12.8757 14.019L18.3023 10.8651Z" fill="#12283D"/>
                            <path d="M18.2472 16.4228C18.0917 16.5792 17.9961 16.7914 17.9961 17.0295V18.1804H19.7116V17.0295C19.7116 16.7914 19.6152 16.5792 19.4605 16.4228C19.3042 16.2673 19.0911 16.1718 18.8538 16.1718C18.6165 16.1718 18.4035 16.2673 18.2472 16.4228Z" fill="#12283D"/>
                        </svg>
                        </div>

                        <h2>Aulas Finalizadas</h2>
                        <p> <span>{totalAulasFinish}</span> <span>Aulas</span></p>
                    </Link>
                </div>
            </ContentItens>
        </Section>
    )
}