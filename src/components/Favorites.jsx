import React, { useEffect, useState } from 'react';
import { Flex  } from '../shared/common';
import SearchBar from '../shared/SearchBar';
import az from '../assets/az.png';
import za from '../assets/za.png';
import Contact from './Contact';
import { Link} from 'react-router-dom';
import { BiRefresh } from 'react-icons/bi';
import {useSelector, useDispatch} from 'react-redux';
import {azSort, zaSort, getListOfContacts, checkFavItemsSuccess, getFavItem, getContactsSuccess} from '../redux/contactsReducer';


const Favorites = () => {
    const contacts = useSelector(state=> state.contacts.contacts);
    const favorites = useSelector(state=> state.contacts.favorites);
    const dispatch = useDispatch();

    useEffect(() => {
        let lists = getListOfContacts();
        dispatch(getContactsSuccess(lists));
    }, [localStorage.length])

    useEffect(() => {
        for(let i = 1; i <= localStorage.length * 2; i++){
            let arr = favorites;
            const getItem =  getFavItem(i);

            if (getItem !== 0) {
                arr.push(i)
                dispatch(checkFavItemsSuccess(arr));
            }
        }
    }, [])

    const sortContactsAZ = () => {
        let array = [...contacts];
        array.sort((a, b) => a.firstName.localeCompare(b.firstName));
        dispatch(azSort([...array]));
    }

    const sortContactsZA = () => {
        let array = [...contacts];
        array.sort((a, b) => a.firstName.localeCompare(b.firstName));
        array.reverse();
        dispatch(zaSort([...array]));
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
                {favorites.length === 0
                    ? <div>There are no favorite contacts in your list! <Link to="/">-Click to add-</Link></div>
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