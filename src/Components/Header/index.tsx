import { HeaderContainer, HeaderContent, NewTransetionButton } from "./style";
import * as Dialog from "@radix-ui/react-dialog"

import logoImg from "../../assets/logo.svg"
import { NewTransactionsModal } from "../NewTransactions";

export function Header(){
    return(
        <div>
            <HeaderContainer>
                <HeaderContent>
                    <img src={logoImg} alt="" />

                    <Dialog.Root>
                        <Dialog.Trigger asChild>
                            <NewTransetionButton>Nova Transação</NewTransetionButton>
                        </Dialog.Trigger>

                        <NewTransactionsModal />
                        
                    </Dialog.Root>
                    
                </HeaderContent>
            </HeaderContainer>
        </div>
    )
}