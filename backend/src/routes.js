import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import OngsController from './controller/OngsController';
import IncidentController from './controller/IncidentController';
import ProfileController from './controller/ProfileController';
import SessionController from './controller/SessionController';

const routes = new Router();

routes.get('/', (req, res) => {
    return res.json({
        evento: 'Semana Omnistack 11.0',
        desenvolvedor: 'Thalysson Nascimento Nascimento',
    });
});

routes.post('/singin', SessionController.store);

routes.post(
    '/ongs',
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.string().required().min(10),
            city: Joi.string().required(),
            uf: Joi.string().required().length(2),
        }),
    }),
    OngsController.store
);
routes.get('/ongs', OngsController.index);

routes.post('/incidents', IncidentController.store);
routes.get(
    '/incidents',
    celebrate({
        [Segments.QUERY]: Joi.object().keys({
            page: Joi.number(),
        }),
    }),
    IncidentController.index
);
routes.delete(
    '/incidents/:id',
    celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required(),
        }),
    }),
    IncidentController.delete
);

routes.get(
    '/profile',
    celebrate({
        [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required(),
        }).unknown(),
    }),
    ProfileController.index
);

export default routes;
