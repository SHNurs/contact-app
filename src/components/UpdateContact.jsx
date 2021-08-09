import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { TextField } from './TextField';
import { useParams, useHistory } from "react-router-dom"
import { notification } from 'antd';
import { AiFillHeart } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';

import {useSelector, useDispatch} from 'react-redux';
import {getContactData, getFavItem, 
        checkFavItemsSuccess, addRemoveFavItemSuccess,
        removeFavoriteItem, addFavoriteItem,
        updateContactData} from '../redux/contactsReducer';

const UpdateContact = () => {
    let { id } = useParams();
    id = parseInt(id);
    const history = useHistory();
    const message = 'Not defined';

    let schema = yup.object().shape({
        firstName: yup.string().required('First name is required'),
        lastName: yup.string(),
        city: yup.string(),
        country: yup.string(),
        phoneNumber: yup.string().required('Phone number is required'),
        email: yup.string().email('Email is invalid'),
        website: yup.string()
    });

    const contact = getContactData(id);
    const favorites = useSelector(state => state.contacts.favorites);
    const dispatch = useDispatch();

    useEffect(() => {
        let arr = favorites;
        const getItem =  getFavItem(id);

        if (getItem !== 0) {
            arr.push(id)
            dispatch(checkFavItemsSuccess(arr));
        }
    }, [])

    const addFavorite = (id) => {
        id = parseInt(id);
        const getItem = getFavItem(id);

        // console.log(favorites);
        if (getItem !== 0) {
            removeFavoriteItem(id);
            dispatch(checkFavItemsSuccess(favorites.filter(item => item !== id)));
        } else {
            addFavoriteItem(id);
            dispatch(addRemoveFavItemSuccess(id));
        }
    }

    return (
        <Formik
            initialValues={{
                firstName: `${contact.firstName || message}`,
                lastName: `${contact.lastName || message}`,
                city: `${contact.city || message}`,
                country: `${contact.country || message}`,
                phoneNumber: `${contact.phoneNumber || message}`,
                email: `${contact.email || "example@asd.com"}`,
                website: `${contact.website || message}`
            }}
            validationSchema={schema}
            onSubmit={async (data) => {
                updateContactData(data, id)
                notification.config({
                    duration: 2
                });

                notification.success({
                    message: 'Success',
                    description:
                        'Contact is saved'
                });
                history.goBack()
            }}
        >
            {() => (
                <div>
                    <div className='profile-avatar'>
                        <img className='avatar' src="https://images.unsplash.com/photo-1565260524775-7e9b536fba2f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" alt="" />
                        {favorites.includes(id)
                            ? <AiFillHeart className="heart1 show-icon" onClick={() => addFavorite(id)} style={{ color: 'red' }} />
                            : <AiOutlineHeart className='show-icon' onClick={() => addFavorite(id)} style={{ color: 'red' }} />}
                    </div>
                    <Form >
                        <div className='formField'>
                            <TextField label="FirstName" name="firstName" type="text" />
                            <TextField label="LastName" name="lastName" type="text" />
                        </div>
                        <div className='formField'>
                            <TextField label="City" name="city" type="text" />
                            <TextField label="Country" name="country" type="text" />
                        </div>
                        <div className='formField'>
                            <TextField label="PhoneNumber" name="phoneNumber" type="text" />
                            <TextField label="Email" name="email" type="email" />
                        </div>
                        <div className='formField'>
                            <TextField label="Website" name="website" type="text" />
                            <button className="btn btn-dark" type="submit">Save Contact</button>
                        </div>
                    </Form>
                </div>
            )}
        </Formik>
    );
};

export default UpdateContact;
