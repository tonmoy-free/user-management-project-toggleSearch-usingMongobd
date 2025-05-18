import React from 'react';
import { Link, useLoaderData, useParams } from 'react-router';
import Swal from 'sweetalert2';

const UserDetails = () => {
    const { name, _id, email, gender, status, photoUrl } = useLoaderData();
    const { id } = useParams();

    const handleUpdateUser = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const updatedUser = Object.fromEntries(formData.entries());
        console.log(updatedUser);

        //update user on db
        fetch(`http://localhost:3000/users/${id}`,{
            method : 'PUT',
            headers: {
                'content-type' : 'application/json'
            },
            body:JSON.stringify(updatedUser)
        })
        .then(res=>res.json())
        .then(data=>{
            if (data.modifiedCount) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Coffee updated successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    console.log(data);
                }
        })
    }

    return (
        <div className='px-8 md:px-0 lg:px-0 min-h-[calc(100vh_-_200px)] flex justify-center items-center mb-20 mt-8'>
            <div className="card mx-auto bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <h2 className='text-center font-bold text-2xl text-gray-600 '>Update User Info</h2>
                    <div className='flex justify-center items-center '>
                        <div className='flex justify-center items-center border-3 border-[#e2136e] rounded-full h-30 w-30 p-1 overflow-hidden ' >
                            {/* <img className='w-full' src={user.photoURL} alt="" /> */}
                            <img className='w-full rounded-full' src={photoUrl} alt="" />
                        </div>
                    </div>


                    <h2 className='text-center font-bold text-xl text-[#e2136e] '>{name}</h2>
                    <h2 className='text-center font-semibold text-lg text-[#e2136e] '>{email}</h2>
                    <form onSubmit={handleUpdateUser} className="fieldset">
                        {/* ID */}
                        <label className="label">ID</label>
                        <input type="text" name='name' className="input" placeholder="Name" Value={_id} disabled />


                        {/* Email */}
                        <label className="label">Email</label>
                        <input type="text" name='email' className="input" placeholder="Photo url" defaultValue={email} />


                        {/* gender */}
                        <label className="label">Gender</label>
                        <input type="text" name='gender' className="input" placeholder="Gender" defaultValue={gender} />

                        {/* status */}
                        <label className="label">Status</label>
                        <input type="text" name='status' className="input" placeholder="Status" defaultValue={status} />

                        {/* photo */}
                        <label className="label">PhotoURL</label>
                        <input type="text" name='photoUrl' className="input" placeholder="Status" defaultValue={photoUrl} />

                        <button type='submit' className="btn btn-outline  btn-secondary mt-4">Update User</button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;