import React, { useState } from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const Register = () => {
    const [gender, setGender] = useState('');
    const [status, setStatus] = useState('');
    // console.log(gender , status)
    const handleRegister = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const userData = Object.fromEntries(formData.entries());
        console.log(userData);

        //send to mongoDb using POST method
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(res => res.json())
            .then(data => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "user added successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                form.reset();
            })

    }
    return (
        <div className='px-8 md:px-0 lg:px-0  flex justify-center items-center'>
            <div className="card mx-auto bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">

                    <h2 className='text-center font-bold text-2xl text-gray-600 mt-5'>New User</h2>
                    <form onSubmit={handleRegister} className="fieldset">
                        {/* Full Name */}
                        <label className="label">Name</label>
                        <input type="text" name='name' className="input" placeholder="First Name" />

                        {/* Photo URL */}
                        <label className="label">Photo URL</label>
                        <input type="text" name='photoUrl' className="input" placeholder="Photo url" />


                        {/* email */}
                        <label className="label">Email</label>
                        <input type="email" name='email' className="input" placeholder="Email" />


                        {/* password */}
                        <label className="label">Password</label>
                        <input type="password" name='password' className="input" placeholder="Password" />

                        {/* gender */}
                        <label className="label">Gender</label>
                        <div className='flex'>
                            <input
                                type="radio"
                                name="gender"
                                className="radio radio-success "
                                checked={gender === 'Male'}
                                value='Male'
                                onChange={(e) => setGender(e.target.value)}

                            />
                            <p>Male</p>
                            <input
                                type="radio"
                                name="gender"
                                className="radio radio-success"
                                checked={gender === 'Female'}
                                value='Female'
                                onChange={(e) => setGender(e.target.value)}
                            />
                            <p>Female</p>
                        </div>

                        {/* status */}
                        <label className="label">Status</label>
                        <div className='flex'>
                            <input
                                type="radio"
                                name="status"
                                className="radio radio-success "
                                checked={status === 'Active'}
                                value='Active'
                                onChange={(e) => setStatus(e.target.value)}
                            />
                            <p>Active</p>
                            <input
                                type="radio"
                                name="status"
                                className="radio radio-success "
                                checked={status === 'Inactive'}
                                value='Inactive'
                                onChange={(e) => setStatus(e.target.value)}
                            />
                            <p>Inactive</p>
                        </div>


                        {/* ConfirmPassword */}
                        {/* <label className="label">Confirm Password</label>
                        <input type="password" name='confirmPassword' className="input" placeholder="Confirm Password" /> */}

                        <button type='submit' className="btn btn-outline  btn-secondary mt-4">Create an account</button>
                    </form>
                    <p className='text-center mt-5 mb-2'>Already have an account ? <Link className='hover:underline hover:font-bold text-[#e2136e]' to="/login">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;