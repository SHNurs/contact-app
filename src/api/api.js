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
    // console.log(data)
    localStorage.setItem(`Contact${data.id}`, JSON.stringify(data));
}



