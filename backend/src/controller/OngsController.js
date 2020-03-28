import connection from '../database';

import generateUniqueId from '../util/generateUniqueId';

class OngsController {
    async store(req, res) {
        const { name, email, whatsapp, city, uf } = req.body;

        const whatsappFormat = whatsapp.replace(
            /([\u0300-\u036f]|[^0-9a-zA-Z])/g,
            ''
        );

        const id = generateUniqueId();

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp: whatsappFormat,
            city,
            uf,
        });

        return res.json({ id, name, email, whatsapp, city, uf });
    }

    async index(req, res) {
        const { page = 1 } = req.query;

        const ongs = await connection('ongs')
            .limit(5)
            .offset((page - 1) * 5)
            .select('*');

        return res.json(ongs);
    }
}

export default new OngsController();
