import React, { useState, useEffect} from 'react';
import { Link } from "react-router-dom"
import { Card } from 'antd';
import location from '../assets/location.png';
import phone from '../assets/smartphone.png';
import emailLogo from '../assets/email.png';
import internet from '../assets/internet.png';
import { AiFillHeart } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';

import { CardDiv, Content, Data, Name } from '../shared/common';

import {useSelector, useDispatch} from 'react-redux';
import {getFavItem, 
        checkFavItemsSuccess, addRemoveFavItemSuccess,
        removeFavoriteItem, addFavoriteItem,
        updateContactData} from '../redux/contactsReducer';



const Contact = ({id, firstName, lastName, city, country, phoneNumber, email, website, image}) => {
    const favorites = useSelector(state => state.contacts.favorites);
    const dispatch = useDispatch();

    useEffect(()=>{
        for(let i = 1; i <= localStorage.length * 2; i++){
            let arr = favorites;
            const getItem =  getFavItem(i);

            if (getItem !== 0) {
                arr.push(i)
                dispatch(checkFavItemsSuccess(arr));
            }
        }
    }, [])


    const addFavorite = (id) => {
        id = parseInt(id);
        const getItem = getFavItem(id);

        if (getItem !== 0) {
            removeFavoriteItem(id);
            dispatch(checkFavItemsSuccess(favorites.filter(item => item !== id)));
        } else {
            addFavoriteItem(id);
            dispatch(addRemoveFavItemSuccess(id));
        }
    }

    return (
        <CardDiv>
            <Card
                hoverable
                style={{ width: 240, height: 360, margin: '0.5px'}}
                bordered={true}
                cover={<img alt="Contact" src={image} />}
            >
                <Content>
                    <Name> {firstName} {lastName} 
                           {favorites.includes(id) 
                           ? <AiFillHeart className="heart1" onClick={() => addFavorite(id)} style={{ color: 'red' }} /> 
                            : <AiOutlineHeart onClick={() => addFavorite(id)} style={{ color: 'red' }} />}
                    </Name>
                    <Data><img src={location} alt="location" style={{marginRight: '5px'}} /> {city}, {country}</Data>
                    <Data><img src={phone} alt="phone" style={{ marginRight: '5px' }}/>{phoneNumber}</Data>
                    <Data><img src={internet} alt="internet" style={{ marginRight: '5px' }}/>{website}</Data>
                    <Data><img src={emailLogo} alt="email" style={{ marginRight: '5px' }}/>{email}</Data>
                    <Link style={{
                        width: '95px',
                        height: '21px',
                        background: '#212121',
                        borderRadius: '2px',
                        color: '#FFF',
                        textAlign: 'center',
                        margin: '20px 0 0 100px',
                        cursor: 'pointer'
                    }} variant="nav" to={`/update-contact/${id}`} >show</Link>
                </Content>
            </Card>
        </CardDiv>
    );
}

export default Contact;