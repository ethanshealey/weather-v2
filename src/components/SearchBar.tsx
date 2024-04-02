'use client'
import React, { useState } from 'react'
import Search from './Search'

type SearchBarType = {
    onSearch: Function
}

const SearchBar = ({ onSearch }: SearchBarType) => {

    const [ query, setQuery ] = useState('')

    const handleSearchInputChange = (e: any) => {
        const value = e.target.value
        setQuery(value)
    }

    const handleSearch = () => {
        onSearch(query)
    }

    return (
        <div id="search-bar-wrapper">
            <Search 
                onInputChange={handleSearchInputChange}
                onSearch={handleSearch}
            />
        </div>
    )
}

export default SearchBar