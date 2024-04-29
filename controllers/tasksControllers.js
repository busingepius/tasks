const {asyncWrapper} = require("../utils/asyncWrapper");

const getAll = async (req, res, next) => {
    res.status(200).json({data: "all the tasks"})
}