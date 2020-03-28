import connection from '../database';

class IncidentController {
    async store(req, res) {
        const ong_id = req.headers.authorization;

        const { title, description, value } = req.body;

        const ong = await connection('ongs')
            .where('id', ong_id)
            .select('name')
            .first();

        if (!ong) {
            return res.status(400).json({ error: 'No ONG found.' });
        }

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return res.json({ id });
    }

    async index(req, res) {
        const { page = 1 } = req.query;

        const [countIncidents] = await connection('incidents').count();

        res.header('X-Total-Count', countIncidents['count(*)']);

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select(
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            );

        return res.json(incidents);
    }

    async delete(req, res) {
        const { id } = req.params;
        const ong_id = req.headers.authorization;

        const ong = await connection('ongs')
            .where('id', ong_id)
            .select('name')
            .first();

        if (!ong) {
            return res.status(400).json({ error: 'No ONG found.' });
        }

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (!incident) {
            return res.status(401).json({ error: 'Incident not found.' });
        }

        if (incident.ong_id !== ong_id) {
            return res.status(401).json({ error: 'Operation not permitted.' });
        }

        await connection('incidents').where('id', id).delete();

        return res.status(204).send();
    }
}

export default new IncidentController();
