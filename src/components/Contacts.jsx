import React, { useEffect, useState } from 'react';
import {getContacts} from '../api/api';
import SearchBar from '../shared/SearchBar';
import heart from '../assets/heart.png';
import az from '../assets/az.png';
import za from '../assets/za.png';
import { Link} from 'react-router-dom';
import Contact from './Contact';

import { CardRow, Flex } from '../shared/common';



const Contacts = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() =>{
        const getContactsList = async () => {
            let response = await getContacts();

            if (response.status !== 200) {
                throw new Error("Something went wrong...")
            }

            response.data.data.map(item => {
                return localStorage.setItem(`Contact${item.id}`, JSON.stringify(item));
            });

            let lists = [];
            for (let i = localStorage.length * 2; i >= 1 ; i--){
                let getItem = localStorage.getItem('Contact' + i) || 0
                if(getItem !== 0){
                    getItem = JSON.parse(localStorage.getItem('Contact' + i))
                    lists.push(getItem);
                }
            }
            setContacts(lists);
        }
        getContactsList();
    },[])

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
                <SearchBar placeholder="type to search..." contacts={contacts} setContacts={setContacts}/>
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