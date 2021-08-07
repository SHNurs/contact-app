import React from 'react';
import { Formik, Form} from 'formik';
import * as yup from 'yup';
import { TextField } from './TextField';
import { useHistory } from "react-router-dom"
import { notification } from 'antd';
import { createContact } from '../api/api';



const CreateContact = () => {
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const history = useHistory();

    let schema = yup.object().shape({
        firstName: yup.string().required('First name is required'),
        lastName: yup.string(),
        city: yup.string(),
        country: yup.string(),
        phoneNumber: yup.string().required('Phone number is required').matches(phoneRegExp, 'Phone number is not valid'),
        email: yup.string().email('Email is invalid'),
        website: yup.string().url('Website is invalid')
    });

    return(
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                city: '',
                country: '',
                phoneNumber: '',
                email: '',
                website: ''
            }}
            validationSchema={schema}
            onSubmit={async (data) => {
                createContact({ ...data })
                notification.config({
                    duration: 2
                });

                notification.success({
                    message: 'Success',
                    description:
                        'Contact is added'
                });
                history.push("/")
            }}
        >
            {() => (
                <div>
                    <div className='formField'>
                        <img className='avatar' src="https://images.unsplash.com/photo-1565260524775-7e9b536fba2f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" alt="avatar" />
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
}

export default CreateContact;

