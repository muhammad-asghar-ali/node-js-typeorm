import { Transaction, TransactionType } from "../entities/Transection";
import { Client } from '../entities/Client';

export const createTransaction = async (req: any, res: any) => {
    try {
        const { clientId } = req.params
        const {type, amount} = req.body
 
        const client = await Client.findOne({
            where: {
                id: clientId
            }
        })

        if(!client) {
            return res.status(404).json({
                msg: "client not found"
            })
        }

        const transaction = await Transaction.create({
            amount,
            type, 
            client
        })

        await transaction.save()

        if(type === TransactionType.DEPOSIT) {
            client.balance = client.balance + amount
            client.transactions = [transaction];
        } else {
            client.balance = client.balance - amount
            client.transactions = [transaction];
        }

        await client.save()
        return res.status(200).json({
            msg: "transaction added"
        })
    } catch (err) {
        res.status(500).json(err)
    }
}