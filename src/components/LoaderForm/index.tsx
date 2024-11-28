'use client'

import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% {
    background-position: -100% 0;
  }
  50% {
    background-position: 100% 0;
  }
  100% {
    background-position: 0 0;
  }
`;

const LoaderFormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    padding-bottom: 15vh;
    .button{
        height: 50px;
        width: 100%;
        background-image: linear-gradient(
                to right,
                #c5c5c5 0%,
                #e8e8e8 20%,
                #c5c5c5 40%,
                #c5c5c5 100%
            );
        background-repeat: no-repeat;
        background-size: 200% 100%;
        border-radius: 50px;
        margin-top: 10px;
    }
    .content {
        display: flex;
        flex-direction: column;
        gap: 5px;
        margin-bottom: 20px;
        div {
            background-color: #c5c5c5;
            background-image: linear-gradient(
                to right,
                #c5c5c5 0%,
                #e8e8e8 20%,
                #c5c5c5 40%,
                #c5c5c5 100%
            );
            background-repeat: no-repeat;
            background-size: 200% 100%;

            &:first-child {
                width: 40%;
                height: 20px;
                animation: ${shimmer} 1.6s infinite ease-in-out;
            }

            &:last-child {
                width: 100%;
                height: 30px;
                border-radius: 50px;
                animation: ${shimmer} 1.6s infinite ease-in-out;
                animation-delay: 0.3s;
            }

            &.textarea{
                height: 180px;
                border-radius: 20px;
                width: 100%;
                background-image: linear-gradient(
                    to right,
                    #c5c5c5 0%,
                    #e8e8e8 20%,
                    #c5c5c5 40%,
                    #c5c5c5 100%
                );
            }
        }
    }
`;

const LoaderFormSearchWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    padding-bottom: 15vh;
    width: 100%;
    margin: 5vh auto;
    max-width: 800px;
    padding: 0 20px;
    .content {
        div{
            background-color: #c5c5c5;
            background-image: linear-gradient(
                to right,
                #c5c5c5 0%,
                #e8e8e8 20%,
                #c5c5c5 40%,
                #c5c5c5 100%
            );
            background-repeat: no-repeat;
            background-size: 200% 100%;
        }
        display: flex;
        flex-direction: column;
        gap: 5px;
        margin-bottom: 20px;
        .inputs{
            width: 100%;
            height: 45px;
            border-radius: 50px;
            animation: ${shimmer} 1.6s infinite ease-in-out;
            animation-delay: 0.3s;
        }

        .text{
            width: 40%;
            height: 29px;
            animation: ${shimmer} 1.6s infinite ease-in-out;
        }

        .box{
            width: 30px;
            height: 30px;
        }
    }

    .button{
        height: 50px;
        width: 100%;
        background-image: linear-gradient(
                to right,
                #c5c5c5 0%,
                #e8e8e8 20%,
                #c5c5c5 40%,
                #c5c5c5 100%
            );
        background-repeat: no-repeat;
        background-size: 200% 100%;
        border-radius: 50px;
        margin-top: 10px;
    }
`;

const LoaderFormReviewWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    padding-bottom: 15vh;
    width: 100%;
    margin: 5vh auto;
    max-width: 800px;
    padding: 0 20px;
    .content {
        div{
            background-color: #c5c5c5;
            background-image: linear-gradient(
                to right,
                #c5c5c5 0%,
                #e8e8e8 20%,
                #c5c5c5 40%,
                #c5c5c5 100%
            );
            background-repeat: no-repeat;
            background-size: 200% 100%;
        }
        display: flex;
        flex-direction: column;
        gap: 5px;
        margin-bottom: 20px;
        .input-1{
            width: 100%;
            height: 45px;
            border-radius: 50px;
            animation: ${shimmer} 1.6s infinite ease-in-out;
            animation-delay: 0.3s;
        }

        .input-2{
            width: 100%;
            height: 40px;
            border-radius: 50px;
            animation: ${shimmer} 1.6s infinite ease-in-out;
            animation-delay: 0.3s;
        }

        .text{
            width: 40%;
            height: 29px;
            animation: ${shimmer} 1.6s infinite ease-in-out;
        }

        .text-label{
            width: 20%;
            height: 20px;
            animation: ${shimmer} 1.6s infinite ease-in-out;
        }

        .box{
            width: 30px;
            height: 30px;
        }
    }

    .content-buttons{
        display: flex;
        gap: 20px;
        .button{
            height: 50px;
            width: 100%;
            background-image: linear-gradient(
                    to right,
                    #c5c5c5 0%,
                    #e8e8e8 20%,
                    #c5c5c5 40%,
                    #c5c5c5 100%
                );
            background-repeat: no-repeat;
            background-size: 200% 100%;
            border-radius: 50px;
            margin-top: 10px;
        }
    }
`;

const LoaderAulasWrapper = styled.div`
    width: 100%;
    .aula-content{
        display: flex;
        flex-direction: row;
        gap: 15px;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        .aula{
            background-color: #fff;
            border-radius: 15px;
            width: 100%;
            max-width: 400px;
            height: 100%;
            min-height: 100px;
            display: flex;
            max-width: 370px;
            background-color: #c5c5c5;
            background-image: linear-gradient(
                to right,
                #c5c5c5 0%,
                #e8e8e8 20%,
                #c5c5c5 40%,
                #c5c5c5 100%
            );
            background-repeat: no-repeat;
            background-size: 200% 100%;
            animation: ${shimmer} 1.6s infinite ease-in-out;
        }
    }
    .filtro-content{
        display: flex;
        gap: 10px;
        flex-direction: column;
        width: 100%;
        margin-bottom: 60px;
        .item{
            display: flex;
            align-items: center;
            gap: 8px;
            line-height: 20px;
            padding: 3px 10px;
            color: #fff;
            border-radius: 50px;
            width: 200px;
            height: 30px;
            background-color: #c5c5c5;
            background-image: linear-gradient(
                to right,
                #c5c5c5 0%,
                #e8e8e8 20%,
                #c5c5c5 40%,
                #c5c5c5 100%
            );
            background-repeat: no-repeat;
            background-size: 200% 100%;
            animation: ${shimmer} 1.6s infinite ease-in-out;
        }
    }
`;

export function LoaderForm({ quantity, textArea } : {quantity: number, textArea?: boolean}) {
    return (
        <LoaderFormWrapper>
            {Array.from({length: quantity}, (_, index) => (
                <div key={index} className="content">
                    <div></div>
                    <div></div>
                </div>
            ))}

            {textArea && <div className="content"><div></div><div className="textarea"></div></div>}

            <div className="button"></div>
        </LoaderFormWrapper>
    );
}

export function LoaderFormSearch({ quantity }: {quantity: number}){
    return(
        <LoaderFormSearchWrapper>
            <div className="content">
                <div className="box"></div>
            </div>
            <div className="content">
                <div className="text"></div>
            </div>
             {Array.from({length: quantity}, (_, index) => (
                <div key={index} className="content">
                    <div key={index} className="inputs"></div>
                </div>
             ))}
            <div className="button"></div>
        </LoaderFormSearchWrapper>
    )
}

export function LoaderFormReview({ quantity }: {quantity: number}){
    return(
        <LoaderFormReviewWrapper>
            <div className="content">
                <div className="text"></div>
            </div>
            {Array.from({length: quantity}, (_, index) => (
                <div key={index} className="content">
                    <div className="input-1"></div>
                    <div className="text-label"></div>
                    <div className="input-2"></div>
                </div>
            ))}
            <div className="content-buttons">
                <div className="button"></div>
                <div className="button"></div>
            </div>
        </LoaderFormReviewWrapper>
    )
}

export function LoaderAulas({ quantity }: {quantity: number}){
    return(
        <LoaderAulasWrapper>
            <div className="filtro-content">
                <div className="item"></div>
                <div className="item"></div>
                <div className="item"></div>
            </div> 
            <div  className="aula-content">
            {Array.from({length: quantity}, (_, index) => (
                <div className="aula" key={index}></div>
            ))}
            </div>
        </LoaderAulasWrapper>
    )
}

const LoaderHeaderWrapper = styled.header`
    @media screen and (min-width: 769px){
        height: 100%;
        width: 213px;
    }
    z-index: 10;
    position: fixed;
    width: 100%;
    height: 12vh;
    bottom: 0;
    left: 0;
    background-color: #c5c5c5;
    background-image: linear-gradient(
        to right,
        #c5c5c5 0%,
        #e8e8e8 20%,
        #c5c5c5 40%,
        #c5c5c5 100%
    );
    background-repeat: no-repeat;
    background-size: 200% 100%;
    animation: ${shimmer} 1.6s infinite ease-in-out;
`;

export function LoaderHeader(){
    return(
        <LoaderHeaderWrapper></LoaderHeaderWrapper>
    )
}