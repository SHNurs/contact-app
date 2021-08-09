import {getContacts, getContact, removeFavItem, addFavItem, updateContact, fetchContactData} from '../api/api';

const GET_CONTACTS = 'GET_CONTACTS';
const AZ_SORT = 'AZ_SORT';
const ZA_SORT = 'ZA_SORT';
const CHECK_FAV_ITEMS = 'CHECK_FAV_ITEMS';
const ADD_REMOVE_FAV_ITEM = 'ADD_REMOVE_FAV_ITEM';

const initialState = {
    contacts: [],
    favorites: []
}

export const contactsReducer = (state = initialState, action) => {
    switch (action.type){
        case GET_CONTACTS:
            return{...state, contacts: [...action.payload ]}

        case AZ_SORT:
            return{...state, contacts: [...action.payload ]}

        case ZA_SORT:
            return{...state, contacts: [...action.payload ]}

        case CHECK_FAV_ITEMS:
            return{...state, favorites: [...action.payload]}

        case ADD_REMOVE_FAV_ITEM:
            return{...state, favorites: [...state.favorites, action.payload ]}

        default:
            return state;

    }
}

export const getContactsSuccess = (payload) => ({type: GET_CONTACTS, payload});
export const azSort = (payload) => ({type: AZ_SORT, payload});
export const zaSort = (payload) => ({type: ZA_SORT, payload});
export const checkFavItemsSuccess = (payload) => ({type: CHECK_FAV_ITEMS, payload});
export const addRemoveFavItemSuccess = (payload) => ({type: ADD_REMOVE_FAV_ITEM, payload});

export const getContactsFetch = async () => {
    // return (dispatch) => {
        let response = await getContacts();

        if (response.status !== 200) {
            throw new Error("Something went wrong...")
        }

        response.data.data.map(item => {
            const getItem = localStorage.getItem(`Contact${item.id}`) || 0;

            if (getItem === 0) {
                localStorage.setItem(`Contact${item.id}`, JSON.stringify(item));
            }
        });
    // }
}

export const updateContactData = (data, id) => {
    return updateContact({ ...data, id});
}

export const getContactData = (id) => {
    return getContact(id);
}

export const fetchContact = (i) => {
    return fetchContactData(i);
}

export const getFavItem = (id) => {
    const item = localStorage.getItem(`favItem${id}`) || 0;
    return item;
}

export const removeFavoriteItem = id => {
    return removeFavItem(id);
}

export const addFavoriteItem = id => {
    return addFavItem(id);
}

export const getListOfContacts = () => {
    let lists = [];
    for (let i = localStorage.length * 2; i >= 1; i--) {
        let getItem = fetchContact(i) || 0
        if (getItem !== 0) {
            getItem = getContactData(i)
            lists.push(getItem);
        }
    }
    return lists;
}