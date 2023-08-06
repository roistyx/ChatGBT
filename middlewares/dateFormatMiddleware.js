
const datesValidationMiddleware = (req, res, next) => {
    const { startDate, endDate } = req.body;
    console.log("Middleware",req.body);
    // const start = new Date(startDate);
    // const end = new Date(endDate);
    // const datesRange = [start, end];
    // req.datesRange = datesRange;
    next();
    }

module.exports = datesValidationMiddleware;