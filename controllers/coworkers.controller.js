const coworkerService = require("../services/coworkers.service");
const createError = require("http-errors");

async function getAllCoworkers(req, res, next) {
    try {
        const { searchString, page = 1, perPage = 20 } = req.query;
        const result = await coworkerService.find({ searchString, page, perPage });
        res.status(200).json({
            status: 200,
            data: result.items,
            totalCount: result.count,
        });
    } catch (err) {
        next(createError.InternalServerError(err.message));
    }
}

async function getCoworkerById(req, res, next) {
    try {
        const { id } = req.params;
        const coworker = await coworkerService.findById(id);
        if (!coworker) {
            return next(createError(404, "Coworker not found"));
        }
        res.status(200).json({
            status: 200,
            data: coworker,
        });
    } catch (err) {
        next(createError.InternalServerError(err.message));
    }
}

async function createCoworker(req, res, next) {
    try {
        const coworker = req.body;
        const ids = await coworkerService.create(coworker);
        res.status(201).json({
            status: 201,
            data: Array.isArray(ids) ? { ids } : { _id: ids },
        });
    } catch (err) {
        next(createError.InternalServerError(err.message));
    }
}

async function updateCoworker(req, res, next) {
    try {
        const { id } = req.params;
        const updatedCoworker = await coworkerService.findByIdAndUpdate(id, req.body);
        if (!updatedCoworker) {
            return next(createError(404, "Coworker not found"));
        }
        res.status(200).json({
            status: 200,
            data: updatedCoworker,
        });
    } catch (err) {
        next(createError.InternalServerError(err.message));
    }
}

async function deleteCoworker(req, res, next) {
    try {
        const { id } = req.params;
        const deletedCoworker = await coworkerService.findByIdAndDelete(id);
        if (!deletedCoworker) {
            return next(createError(404, "Coworker not found"));
        }
        res.status(200).json({
            status: 200,
            message: "Coworker deleted successfully",
        });
    } catch (err) {
        next(createError.InternalServerError(err.message));
    }
}

module.exports = {
    getAllCoworkers,
    getCoworkerById,
    createCoworker,
    updateCoworker,
    deleteCoworker,
};
