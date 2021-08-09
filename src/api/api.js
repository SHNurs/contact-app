import * as axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-json-server.typicode.com/RomanChasovitin/demo-api'
});

export const getContacts = async () => {
    return (
        instance.get(`/users`)
    );
}

export const getContact = (id) => {
    return JSON.parse(localStorage.getItem('Contact' + id));
}

export const createContact = (data) => {
    let id = +(localStorage.length + 1);
    data = { ...data, id};
    localStorage.setItem(`Contact${data.id}`, JSON.stringify(data));
}

export const updateContact = (data) => {
    localStorage.removeItem(`Contact${data.id}`);
    localStorage.setItem(`Contact${data.id}`, JSON.stringify(data));
}

export const removeFavItem = id => {
    localStorage.removeItem(`favItem${id}`);
}

export const addFavItem = id => {
    localStorage.setItem(`favItem${id}`, id);
}

export const fetchContactData = i => {
    return localStorage.getItem('Contact' + i)
}



