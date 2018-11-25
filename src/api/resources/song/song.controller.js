import Joi from 'joi';
import Song from './song.model';

export default {
    async create(req, res) {
        console.log(req.body);
        const schema = Joi.object().keys({
            title: Joi.string().required(),
            url: Joi.string().required(),
            rating: Joi.number()
                .integer()
                .min(0)
                .max(5)
                .optional()
        });
        const { value , error } = Joi.validate(req.body, schema);
        if (error && error.details) {
            return res.status(400).json(error);
        }
        const song = await Song.create(value);
        return res.json(song);
    },

    async findAll(req, res) {
        try {
            const songs = await Song.paginate();
            return res.json(songs);
        } catch (err) {
            console.log( err);
            res.status(500).send(err);
        }
    },

    async findOne(req, res) {
        try {
            let { id } = req.params;
            const song = Song.findById(id);

            if (!song) {
               return res.status(404).json({err: "could not find song"});
            }
            return res.json(song);
        } catch (err) {
            res.status(500).send(err);

        }
    }
}