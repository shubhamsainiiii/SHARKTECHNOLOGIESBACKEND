import { sendSuccess, sendError, sendPaginated } from '../utils/response.js';

// Factory: creates standard CRUD handlers for any Mongoose model
export const createCRUD = (Model, name = 'Item') => ({

    // GET /api/:resource
    getAll: async (req, res, next) => {
        try {
            const { page = 1, limit = 50, status, search } = req.query;
            const filter = {};
            if (status) filter.status = status;
            if (search) filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { name: { $regex: search, $options: 'i' } },
            ];

            const total = await Model.countDocuments(filter);
            const items = await Model.find(filter)
                .sort({ order: 1, createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(Number(limit));

            sendPaginated(res, items, total, page, limit);
        } catch (err) { next(err); }
    },

    // GET /api/:resource/:id
    getOne: async (req, res, next) => {
        try {
            const item = await Model.findById(req.params.id);
            if (!item) return sendError(res, `${name} not found`, 404);
            sendSuccess(res, item);
        } catch (err) { next(err); }
    },

    // GET /api/:resource/slug/:slug (for public routes)
    getBySlug: async (req, res, next) => {
        try {
            const item = await Model.findOne({ slug: req.params.slug });
            if (!item) return sendError(res, `${name} not found`, 404);
            sendSuccess(res, item);
        } catch (err) { next(err); }
    },

    // POST /api/:resource
    create: async (req, res, next) => {
        try {
            const item = await Model.create(req.body);
            sendSuccess(res, item, `${name} created`, 201);
        } catch (err) { next(err); }
    },

    // PUT /api/:resource/:id
    update: async (req, res, next) => {
        try {
            const item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            if (!item) return sendError(res, `${name} not found`, 404);
            sendSuccess(res, item, `${name} updated`);
        } catch (err) { next(err); }
    },

    // DELETE /api/:resource/:id
    remove: async (req, res, next) => {
        try {
            const item = await Model.findByIdAndDelete(req.params.id);
            if (!item) return sendError(res, `${name} not found`, 404);
            sendSuccess(res, null, `${name} deleted`);
        } catch (err) { next(err); }
    },
});