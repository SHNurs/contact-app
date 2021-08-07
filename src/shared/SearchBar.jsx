import React, { useState } from "react";
import "./SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import Contact from "../components/Contact";
import { Result } from "./common";
import scroll from '../assets/scroll.png';

function SearchBar({ placeholder, contacts}) {
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = contacts.filter(item => {
            return item.firstName.toLowerCase().includes(searchWord.toLowerCase()) || 
                   item.lastName.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    };

    const clearInput = () => {
        setFilteredData([]);
        setWordEntered("");
    };

    return (
        <div className="search">
            <div className="searchInputs">
                <input
                    type="text"
                    placeholder={placeholder}
                    value={wordEntered}
                    onChange={handleFilter}
                />
                <div className="searchIcon">
                    {filteredData.length === 0 ? (
                        <SearchIcon />
                    ) : (
                        <CloseIcon id="clearBtn" onClick={clearInput} />
                    )}
                </div>
            </div>
            {filteredData.length !== 0 && (
                <div>
                    <Result>Search Results <img src={scroll} alt="scroll" className='scroll-down' /></Result>
                    <div className="dataResult">
                        {filteredData.map(item => {
                            return <Contact
                                key={item.id}
                                id={item.id}
                                firstName={item.firstName}
                                lastName={item.lastName || "Not defined"}
                                city={item.city || "Not defined"}
                                country={item.country || "Not defined"}
                                phoneNumber={item.phoneNumber}
                                email={item.email || "Not defined"}
                                website={item.website || "Not defined"}
                                image={item.image || "https://images.unsplash.com/photo-1565260524775-7e9b536fba2f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"} 
                                />
                            })
                        }
                    </div>
                </div>
            )}
        </div>
    );
}

export default SearchBar;