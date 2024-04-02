'use client'
import { ChangeEvent, InputHTMLAttributes, useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";

type Option = {
    id: string,
    name: string
}

type SearchType = {
    onInputChange: Function,
    onSearch: Function
}

const Search = ({ onInputChange, onSearch }: SearchType) => {

    const handleInputChange = (e: InputHTMLAttributes<HTMLInputElement>) => {
        onInputChange(e)
    }

    const onSubmit = (e: any) => {
        e.preventDefault()
        onSearch()
    }

    return (
        <form className='dropdown-input-container' onSubmit={onSubmit}>
            <button type='submit' className='go-btn'><FaSearch /></button>
            <input type='text' placeholder={`Search by location`} onChange={(e) => handleInputChange(e)} />
        </form>
    )
}

export default Search