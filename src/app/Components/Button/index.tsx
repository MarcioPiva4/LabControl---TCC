interface PropButton {
    type: "button" | "submit" | "reset";
    children: React.ReactNode;
    is: "isHover" | "isNotHover";
}

//IS SENDO ALTERADO NO STYLE DPS (ALTERAR PARA STYLED COMPONENTS)

export default function Button({type, children, is}: PropButton){
    return(
        <button type={type}>{children}</button>
    )
}