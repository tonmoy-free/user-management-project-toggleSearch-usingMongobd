import React, { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { IoCheckboxSharp } from 'react-icons/io5';
import { MdCheckBoxOutlineBlank, MdDelete, MdDone, MdEdit, MdOutlineDoneAll } from 'react-icons/md';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const Users = ({ user, index, datas, setDatas }) => {
    const { name, _id, email, gender, status, photoUrl, newStatus } = user;
    const [completed, setCompleted] = useState(newStatus || false);

    const handleCompleted = (id) => {
        const newStatus = !completed;
        //update completed button true/false on db
        fetch(`http://localhost:3000/users/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({newStatus})
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    setCompleted(newStatus);
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Work status updated successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    console.log(data);
                }
            })
    };

    const handleUserDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                //start delete the user data from db
                fetch(`http://localhost:3000/users/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "User has been deleted.",
                                icon: "success"
                            });
                            //remove the data from state
                            const remainingUsers = datas.filter(user => user._id !== id);
                            setDatas(remainingUsers);
                        }
                    })


            }
        });
    }
    return (
        <tr>
            <th>
                <p>{index + 1}</p>
            </th>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                            <img
                                src={photoUrl}
                                alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{name}</div>
                        {/* <div className="text-sm opacity-50">United States</div> */}
                    </div>
                </div>
            </td>
            <td>
                <p>{_id}</p>
            </td>
            <td>
                <p>{email}</p>
            </td>
            <td>{gender}</td>
            <td>{status}</td>
            <th>
                <div className='flex justify-start items-center gap-1'>
                    <button className="px-2 py-2 text-xl cursor-pointer shadow-sm hover:text-white hover:bg-[#2b2d42] rounded-lg ">
                        <MdEdit />
                    </button>
                    <Link to={`/userDetails/${_id}`}>
                        <button className="px-2 py-2 text-xl cursor-pointer shadow-sm hover:text-white hover:bg-[#2b2d42] rounded-lg ">
                            <FaEye />
                        </button>
                    </Link>
                    <button
                        onClick={() => handleUserDelete(_id)}
                        className="px-2 py-2 text-xl cursor-pointer shadow-sm hover:text-white hover:bg-[#2b2d42] rounded-lg ">
                        <MdDelete />
                    </button>
                </div>
            </th>
            <th>
                <button onClick={() => handleCompleted(_id)}>
                    {
                        completed ? <IoCheckboxSharp className='text-xl' /> : <MdCheckBoxOutlineBlank className='text-xl' />
                    }
                </button>
            </th>
        </tr>
    );
};

export default Users;