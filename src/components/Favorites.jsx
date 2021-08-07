import React, { useEffect, useState } from 'react';
import { Flex  } from '../shared/common';
import SearchBar from '../shared/SearchBar';
import az from '../assets/az.png';
import za from '../assets/za.png';
import Contact from './Contact';
import { BiRefresh } from 'react-icons/bi';

const Favorites = () => {
    const [contacts, setContacts] = useState([]);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        let lists = [];
        for (let i = localStorage.length * 2; i >= 1; i--) {
            let getItem = localStorage.getItem('Contact' + i) || 0
            if (getItem !== 0) {
                getItem = JSON.parse(localStorage.getItem('Contact' + i))
                lists.push(getItem);
            }
        }
        setContacts(lists);
    }, [localStorage.length])

    useEffect(() => {
        for (let i = 1; i <= localStorage.length * 2; i++) {
            let arr = favorites;
            const getArray = localStorage.getItem(`favItem${i}`) || 0;

            if (getArray !== 0) {
                arr.push(i)
                setFavorites([...arr]);
            }
        }
    }, [])

    const sortContactsAZ = () => {
        let array = [...contacts];
        array.sort((a, b) => a.firstName.localeCompare(b.firstName));
        setContacts([...array])
    }

    const sortContactsZA = () => {
        let array = [...contacts];
        array.sort((a, b) => a.firstName.localeCompare(b.firstName));
        array.reverse();
        setContacts([...array]);
    }



    return(
        <div>
            <Flex>
                <SearchBar placeholder="type to search..." contacts={contacts} />
                <Flex className="heart-sort" style={{width: '100px'}}>
                    <img src={az} alt="a-z" className='sort' onClick={() => sortContactsAZ()} />
                    <img src={za} alt="z-a" className='sort' onClick={() => sortContactsZA()} />
                    {/* <BiRefresh className='refresh' onClick={() => window.location.reload()}/> */}
                </Flex>
            </Flex>
            <div style={{display:'flex', flexWrap: 'wrap'}}>
                {contacts.length === 0
                    ? <div>There are no contacts in your list!</div>
                    : contacts.map(item => {
                        if(favorites.includes(item.id)){
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
                        }
                    })
                }
            </div>
        </div>
    );
}

export default Favorites;