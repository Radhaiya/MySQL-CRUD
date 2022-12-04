import React, { useState, useEffect } from 'react'
import { useHistory, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';



const initialState = {
    ids: '',
    name: '',
    email: '',
    contact: ''
}



const Addedit = () => {

    const [Data, setData] = useState(initialState)

    const { ids, name, email, contact } = Data

    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/students/get/${id}`).then((response) => setData({ ...response.data[0] }))
    }, [id])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setData({ ...Data, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!name || !email || !contact || !ids) {
            toast.error('Provide Value')
        } else {

            if (!id) {
                axios.post('http://localhost:5000/students/post', {
                    ids: ids, name: name, email: email, contact: contact
                }).then(() => {

                    setData({ ids: '', name: '', email: '', contact: '' })
                })
                    .catch(err => toast.error(err.response.data));

                toast.success('Success')

            }

            else {
                axios.put(`http://localhost:5000/students/put/${id}`, {
                    ids: ids, name: name, email: email, contact: contact
                }).then(() => {

                    setData({ ids: '', name: '', email: '', contact: '' })
                })
                    .catch(err => toast.error(err.response.data));

                toast.success('Update Success')
            }


        }
    }


    return (
        <>
            <div style={{ marginTop: '100px' }}>
                <form style={{ margin: 'auto', paddding: '15px', maxWidth: '400px', alignContent: 'center' }} onSubmit={handleSubmit}>
                    <label htmlFor='name'>Id</label>
                    <input type='number' id='ids' name='ids' placeholder='ids' value={ids || ''} onChange={handleInputChange}>

                    </input>
                    <label htmlFor='name'>Name</label>
                    <input type='text' id='name' name='name' placeholder='name' value={name || ''} onChange={handleInputChange}>

                    </input>
                    <label htmlFor='name'>Email</label>
                    <input type='text' id='email' name='email' placeholder='email' value={email || ''} onChange={handleInputChange}>

                    </input>
                    <label htmlFor='name'>Contact</label>
                    <input type='text' id='contact' name='contact' placeholder='contact' value={contact || ''} onChange={handleInputChange}>

                    </input>
                    <input type='submit' value={id ? 'Update' : 'Save'} />
                    <Link to='/'>
                        <input type='button' value='Go back' />
                    </Link>

                </form>
            </div>
        </>
    )
}

export default Addedit