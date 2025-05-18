import React, { useContext, useEffect, useState } from 'react';
import { MdEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link, useLoaderData } from 'react-router';
import Users from '../components/Users';
import { AuthContext } from '../provider/AuthProvider';

const Home = () => {
    const contextValue = useContext(AuthContext);
    const initialData = useLoaderData();
    const [datas, setDatas] = useState([]);
    const [search, setSearch] = useState('');
    console.log(search);
    useEffect(() => {
        fetch(`http://localhost:3000/users?searchParams=${search}`)
            .then(res => res.json())
            .then(data => {
                setDatas(data);
            })
    }, [search]);


    return (
        <div className='w-11/12 mx-auto mt-6'>
            <div>
                <form>
                    <input
                        type="text"
                        placeholder="Search"
                        name="search"
                        className="input input-bordered w-24 md:w-auto"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    {/* <button className='btn' type='submit'>Search</button> */}
                </form>
            </div>
            <div className='mt-2'>
               <p>Total User : {datas.length}</p>
            </div>
            <div>
                <Link to='/register'>
                    <button className='mb-5 px-3 py-2 shadow-sm w-30 text-center cursor-pointer hover:text-white hover:bg-[#2b2d42] rounded-sm font-semibold'>New User</button>
                </Link>
            </div>
            <div className="overflow-x-auto   shadow-sm">
                <table className="table">
                    {/* head */}
                    <thead className='bg-[#2b2d42] text-white'>
                        <tr>
                            <th>NO</th>
                            <th>Name</th>
                            <th>ID</th>
                            <th>@Email</th>
                            <th>Gender</th>
                            <th>Status</th>
                            <th>Action</th>
                            <th>Work Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            datas.map((user, index) =>
                                <Users
                                    key={user._id}
                                    user={user}
                                    index={index}
                                    datas={datas}
                                    setDatas={setDatas}
                                ></Users>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Home;