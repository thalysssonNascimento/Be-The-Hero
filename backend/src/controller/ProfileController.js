import connection from '../database';

class ProfileController {
    async index(req, res) {
        const ong_id = req.headers.authorization;
        const { page = 1 } = req.query;

        const ong = await connection('ongs')
            .where('id', ong_id)
            .select('name')
            .first();

        if (!ong) {
            return res.status(400).json({ error: 'No ONG found.' });
        }

        const incidents = await connection('incidents')
            .where('ong_id', ong_id)
            .limit(5)
            .offset((page - 1) * 5)
            .select('*');

        return res.json(incidents);
    }
}

export default new ProfileController();
