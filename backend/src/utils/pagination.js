const paginate = ({
    data,
    total,
    page,
    limit,
}) => {

    page = Number(page);
    limit = Number(limit);

    const totalPages = Math.ceil(total / limit);

    return {
        data,

        pagination: {
            totalRecords: total,
            totalPages,
            currentPage: page,
            perPage: limit,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
        },
    };
};

export default paginate;