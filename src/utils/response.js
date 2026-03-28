// Success response
export const sendSuccess = (res, data, message = 'Success', status = 200) => {
    res.status(status).json({ success: true, message, data });
};

// Error response
export const sendError = (res, message = 'Error', status = 400) => {
    res.status(status).json({ success: false, message });
};

// Paginated response
export const sendPaginated = (res, data, total, page, limit) => {
    res.status(200).json({
        success: true,
        data,
        pagination: {
            total,
            page: Number(page),
            limit: Number(limit),
            pages: Math.ceil(total / limit),
        },
    });
};