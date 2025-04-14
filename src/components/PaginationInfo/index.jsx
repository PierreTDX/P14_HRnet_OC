import React from 'react';

const PaginationInfo = ({ filteredCount, totalCount }) => (
    <div className="paginationInfo">
        <p>{filteredCount}/{totalCount} results</p>
    </div>
);

export default PaginationInfo;