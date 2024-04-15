import { Box } from "../Box";
import { Icons } from "./Icons";

export function Header(){
    return(
        <Box content={'header'}>
            <div>
                <nav>
                    <ul>
                        <li>
                            <p>Cadastro</p>
                            <Icons icon="cadastro"></Icons>
                        </li>
                        <li>
                            <p>Manutenção</p>
                            <Icons icon="manutencao"></Icons>
                        </li>
                        <li>
                            <p>Home</p>
                            <Icons icon="home"></Icons>
                        </li>
                        <li>
                            <p>Baixa de aulas</p>
                            <Icons icon="baixaAulas"></Icons>
                        </li>
                        <li>
                            <p>Relatorios</p>
                            <Icons icon="relatorios"></Icons>
                        </li>
                    </ul>
                </nav>
            </div>
        </Box>
    )
}