module.exports = function sortMiddleware(req, res, next) {
    res.locals._sort = {
        enabled: false,
        type: 'default',
    };

    const isValidType = ['asc', 'desc'].includes(req.query.type);
    req.query.type = isValidType == true ? req.query.type : 'asc';

    if (req.query.hasOwnProperty('_sort')) {
        // res.local._sort.enabled = true;
        // res.local._sort.column = req.query.column;
        // res.local._sort.type = req.query.type;

        Object.assign(res.locals._sort, {
            enabled: true,
            type: req.query.type,
            column: req.query.column,
        });
    }

    next();
};
