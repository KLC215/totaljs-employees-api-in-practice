/**
 * Set pagination for json data
 * @param {Object}  URL query
 * @return {Object} Object includes page number & max items in page
 */
F.functions.getPaginater = query => {
    let { page, limit } = query;

    page = U.parseInt(page || 1);
    limit = U.parseInt(limit || 25);

    return { page, limit };
}