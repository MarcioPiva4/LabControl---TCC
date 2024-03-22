interface PropForm {
    title: string;
    children: React.ReactNode;
    idForm: string;
    method: string;
    action?: string;
}

export default function DefaultLayoutFunction({title, children, idForm, method, action}: PropForm){
    return(
        <section>
            <div>
                <div>BackPage</div>
                <h2>{title}</h2>
                <form method={method} action={action} name={idForm} id={idForm}>
                    {children}
                </form>
            </div>
        </section>
    )
}