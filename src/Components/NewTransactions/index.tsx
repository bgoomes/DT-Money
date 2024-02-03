import * as Dialog from "@radix-ui/react-dialog"
import { Content, Overlay, CloseButton, TransactionsType, TransactionsButton } from "./styles"
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react"

import * as z from 'zod'
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { useContext } from "react"
import { TransactionsContext } from "../../contexts/TransactionsContexts"


const newTransactionsFormSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome'])
})

type NewTransactionsFormInputs = z.infer<typeof newTransactionsFormSchema>



export function NewTransactionsModal(){
    const { createTransactions } = useContext(TransactionsContext)


    const {control, register,handleSubmit, formState: {isSubmitting}, reset } = useForm<NewTransactionsFormInputs>({
        resolver: zodResolver(newTransactionsFormSchema)
    })

   async function handleCreateNewTransactions(data: NewTransactionsFormInputs){
        const { description, price, category, type } = data

        await createTransactions({
            description, price, category, type
        })

        reset()
    }

    return(
        <Dialog.Portal>
            <Overlay />
                <Content> 
                    <Dialog.Title>Nova Transação</Dialog.Title>
                    <CloseButton>
                        <X size={24}/>
                    </CloseButton>
                        <form onSubmit={handleSubmit(handleCreateNewTransactions)}>
                            <input type="text" placeholder="Descrição" required {...register('description')}/>
                            <input type="number" placeholder="Preço"  {...register('price', {valueAsNumber: true})}/>
                            <input type="text" placeholder="Categoria" required {...register('category')}/>

                            <Controller 
                                control={control} name="type" render={({ field }) => {
                                    
                                    return (
                                        <TransactionsType onValueChange={field.onChange} value={field.value}>
                                            <TransactionsButton variant="income" value="income">
                                                <ArrowCircleUp  size={24}/>
                                                Entrada
                                            </TransactionsButton>

                                            <TransactionsButton variant="outcome" value="outcome">
                                                <ArrowCircleDown  size={24}/>
                                                Saída
                                            </TransactionsButton>
                                        </TransactionsType>
                                    )
                                }}
                            />
                            
                            

                            <button type="submit" disabled={isSubmitting}>Cadastra</button>
                        </form>
                    
                </Content>
                    
        </Dialog.Portal>
    )
}