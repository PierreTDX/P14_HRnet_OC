import { useState } from 'react';

export const useSearch = () => {
    const [search, setSearch] = useState('');

    const handleSearch = (e) => setSearch(e.target.value);
    const handleClearSearch = () => setSearch('');

    return { search, handleSearch, handleClearSearch };
};