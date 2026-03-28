import { Settings } from '../models/misc.models.js';
import { sendSuccess, sendError } from '../utils/response.js';

// GET /api/settings
export const getSettings = async (req, res, next) => {
    try {
        let settings = await Settings.findOne();
        if (!settings) {
            settings = await Settings.create({});
        }
        sendSuccess(res, settings);
    } catch (err) { next(err); }
};

// PUT /api/settings
export const updateSettings = async (req, res, next) => {
    try {
        let settings = await Settings.findOne();
        if (!settings) {
            settings = await Settings.create(req.body);
        } else {
            Object.assign(settings, req.body);
            await settings.save();
        }
        sendSuccess(res, settings, 'Settings updated');
    } catch (err) { next(err); }
};