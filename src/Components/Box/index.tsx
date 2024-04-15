import React from "react";

interface BoxProps{
    content?: string | React.ComponentType<any>;
    children: React.ReactNode;
} 

export function Box({content, children}: BoxProps){
    const ContentSection = content || "section";
    return(
        <ContentSection>
            {children}
        </ContentSection>
    )
}
