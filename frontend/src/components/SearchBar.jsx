import { useState } from "react";

export const SearchBar=({onSearch})=>{
    const[city, setCity]=useState('');
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(city){
            onSearch(city);
            setCity('');
        }
    }

    return(
        <form className="flex flex-row gap-2  mt-10"
        onSubmit={handleSubmit}>
        <div className="search flex flex-row gap-1 bg-gray-100 border-gray-100 p-2 rounded-xl justify-center ">
            <img src='search.svg'></img>
            <input
            className='search-input ml-1 rounded-md focus:outline-none  border-none '
            placeholder='Auckland'
            required
            type='text'
            value={city}
            onChange={(e)=>setCity(e.target.value)}
            >
            </input>
             </div>
            <button type='submit'
            className="rounded-xl bg-blue-300 px-4 py-2 cursor-pointer hover:bg-blue-200 text-md text-black"
            >
                Search
            </button>

        </form>
    );

};

export default SearchBar;