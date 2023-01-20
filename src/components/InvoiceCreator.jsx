import React, { useContext, useState } from 'react'
import { requestProvider } from 'webln';
import { chatContext } from '../contexts/useChatContext';
import { userContext } from '../contexts/useUserContext';


export const InvoiceCreator = ({hide}) => {

    const { currentUserPubkey, publishEvent } = useContext(chatContext);
    const { pubkey } = useContext(userContext);
    const [amount, setAmount] = useState("");
    const [desc, setDesc] = useState("");


    async function createInvoice() {
        try {
            const webln = await requestProvider();
            const invoice = await webln.makeInvoice({
                amount: amount,
                defaultMemo: desc
              });
            console.log(invoice.paymentRequest);
            if (invoice.paymentRequest) {
                publishEvent(invoice.paymentRequest);
                hide();
            }
          } catch {

          }
    }

    return (
        <div className='invoiceCard'>
            <div className="label"><p>Amount in Sats:</p></div>
            <input type="text" value={amount} onChange={(e) => {setAmount(e.target.value)}} className="amountInput" />
            <div className='label'><p>Description:</p></div>
            <input type="text" value={desc} onChange={(e) => {setDesc(e.target.value)}}className="descriptionInput" />
            <div className="buttons">
            <button className="cancel" onClick={hide}>Cancel</button>
            <button className="submit" onClick={createInvoice}>Request</button>    
            </div>        
        </div>
    )
}
