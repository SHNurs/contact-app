import React, { useEffect, useState } from 'react';
import {getContacts} from '../api/api';
import SearchBar from '../shared/SearchBar';
import heart from '../assets/heart.png';
import az from '../assets/az.png';
import za from '../assets/za.png';
import { Link} from 'react-router-dom';
import Contact from './Contact';
import {useSelector, useDispatch} from 'react-redux';
import {getContactsFetch, getContactsSuccess, azSort, zaSort, getListOfContacts} from '../redux/contactsReducer';

import { CardRow, Flex } from '../shared/common';

const Contacts = () => {

// localStorage.clear();
    const contacts = useSelector(state=> state.contacts.contacts);
    const favorites = useSelector(state=> state.contacts.favorites);
    const dispatch = useDispatch();

    useEffect(() => getContactsFetch(),[]);

    useEffect(()=>{
        let lists = getListOfContacts();
        dispatch(getContactsSuccess(lists));
    },  [localStorage.length]);

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
                <SearchBar placeholder="type to search..." contacts={contacts}/>
                <Flex className='heart-sort'>
                    <Link to={'/favorites'}><img src={heart} alt="heart" className='heart'/></Link>
                    <img src={az} alt="a-z" className='sort' onClick={() => sortContactsAZ()}/>
                    <img src={za} alt="z-a" className='sort' onClick={() => sortContactsZA()}/>
                </Flex>
            </Flex>
            <div className="site-card-wrapper">
                <CardRow>
                    {contacts.length === 0
                        ? <div>There are no contacts in your list!</div>
                        : contacts.map(item => {
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
                            image={item.image || "https://images.unsplash.com/photo-1565260524775-7e9b536fba2f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"} />
                        })
                    }
                </CardRow>
            </div>
        </div>
    );
}

export default Contacts;