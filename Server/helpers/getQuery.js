function getQuery(queryObj) {
    let x = `$${queryObj.unit}`;
    return {
        [queryObj.type]: {
            [x]: queryObj.val,
        },
    };
}

module.exports = { getQuery };
