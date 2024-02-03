import { useContext } from "react";
import { Header } from "../../Components/Header";
import { Summary } from "../../Components/Summary";
import { SearchFoom } from "../components/SeacherForm";
import { PriceHightLigth, TransactionsConteiner, TransactionsTable } from "./style";
import { TransactionsContext } from "../../contexts/TransactionsContexts";
import { dateFormatter, priceFormatter } from "../../utils/formater";



export function Transactions(){

    const { transactions }  = useContext(TransactionsContext)

    return(
         <div>
            <Header />
            <Summary />

            <TransactionsConteiner>
                <SearchFoom />
                <TransactionsTable>
                    <tbody>
                        {transactions.map(transactions => {
                            return(
                                <tr key={transactions.id}>
                                    <td width="50%">{transactions.description}</td>
                                    <td><PriceHightLigth variant={transactions.type}>
                                        {transactions.type === 'outcome' && '- '}
                                        {priceFormatter.format(transactions.price)}</PriceHightLigth></td>
                                    <td>{transactions.category}</td>
                                    <td>{dateFormatter.format(new Date(transactions.createdAt))}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </TransactionsTable>
            </TransactionsConteiner>
            
         </div>
    )
    
}