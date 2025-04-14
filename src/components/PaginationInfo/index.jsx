import React from 'react';
import './paginationInfo.scss';

const PaginationInfo = ({ filteredCount, totalCount }) => (
    <div className="paginationInfo">
        <p>{filteredCount}/{totalCount} results</p>
    </div>
);

export default PaginationInfo;