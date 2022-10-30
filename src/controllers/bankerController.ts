import { Banker } from "../entities/Banker"
import { Client } from '../entities/Client';

export const createBanker = async (req: any, res: any) => {
    try {
        const { firstName, lastName, email, cardNumber, employeeNumber } = req.body

        const banker = await Banker.create({
            first_name: firstName,
            last_name: lastName,
            email,
            card_number: cardNumber,
            employee_number: employeeNumber
        })

        await banker.save()
        return res.status(200).json(banker)
    } catch (err) {
        res.status(500).json(err)
    }
}

export const bankerAndClient = async (req: any, res: any) => {
    try {
        const { bankerId, clientId } = req.params;

        const client = await Client.findOne({
            where: {
                id: clientId
            }
        });

        const banker = await Banker.findOne(
            {
                where: {
                    id: bankerId
                }
            }
        );

        if (banker && client) {
			banker.clients = [client];
			await banker.save();
			return res.json({
				msg: 'banker connected to client',
			});
		} else {
			return res.json({
				msg: 'banker or client not found',
			});
		}

    } catch (err) {
        res.status(500).json(err)
    }
}