import { Client } from '../entities/Client'
// import { DataSource, createQueryBuilder } from 'typeorm';
import { Banker } from '../entities/Banker';

export const createClient = async (req: any, res: any) => {
    try {
        const { firstName, lastName, email, cardNumber, balance } = req.body

        const client = await Client.create({
            first_name: firstName,
            last_name: lastName,
            email,
            card_number: cardNumber,
            balance
        })

        await client.save()
        return res.status(200).json(client)
    } catch (err) {
        res.status(500).json(err)
    }
}

export const deleteClient = async (req: any, res: any) => {
    try {
        const { clientId } = req.params;

        const response = await Client.delete(
            clientId
        );

        return res.json(response);
    } catch (err) {
        res.status(500).json(err)
    }
}

export const fetchClient = async (req: any, res: any) => {
    try {
        // const bankers = await createQueryBuilder(
        // 	'banker'
        // )
        // 	.where('id = :bankerId', { bankerId: 2 })
        // 	.getOne();

        // const clients = await createQueryBuilder(
        // 	'client'
        // )
        // 	.select('client')
        // 	.from(Client, 'client')
        // 	.leftJoinAndSelect(
        // 		'client.transactions',
        // 		'transaction'
        // 	)
        // 	.where('client.id = :clientId', {
        // 		clientId: 3,
        // 	})
        // 	.getOne();

        const clients = await Client.createQueryBuilder('client')
            .select('client.first_name')
            .from(Client, 'client')
            .leftJoinAndSelect(
                'client.transactions',
                'transaction'
            )
            .where('client.id = :clientId', {
                clientId: 3,
            })
            .getOne();

        return res.json(clients);
    } catch (err) {
        res.status(500).json(err)
    }
}