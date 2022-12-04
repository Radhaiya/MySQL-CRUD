import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';


const Viewpage = () => {

    const [User, setUser] = useState({})
    const { id } = useParams()


    useEffect(() => {
        axios.get(`http://localhost:5000/students/get/${id}`).then((response) => setUser({ ...response.data[0] }))
    }, [id])

    return (
        <>
            <div>
                <div>
                    User Contact Details
                </div>
                <div>
                    <strong>ID :</strong>
                    <span>{id}</span>
                    <br/>
                    <br/>
                    <br />
                    <strong>Name :</strong>
                    <span>{User.name}</span>
                    <br/>
                    <br/>
                    <br />
                    <strong>Email :</strong>
                    <span>{User.email}</span>
                    <br/>
                    <br/>
                    <br />
                    <strong>Contact :</strong>
                    <span>{User.contact}</span>
                    <br/>
                    <br/>
                    <br />
                    
                    <Link to='/'>
                        <button>Back</button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Viewpage