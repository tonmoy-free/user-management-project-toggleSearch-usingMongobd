import React from 'react';
import { Link } from 'react-router';

const Login = () => {
    return (
        <div className='px-8 md:px-0 lg:px-0  flex justify-center items-center'>
            <div className="card mx-auto bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">

                    <h2 className='text-center font-bold text-2xl text-gray-600 mt-5'>Login To Your Account</h2>
                    <form className="fieldset">
                        {/* email */}
                        <label className="label">Email</label>
                        <input type="email" name='email' className="input" placeholder="Email" />
                        

                        {/* password */}
                        <label className="label">Password</label>
                        <input type="password" name='password' className="input" placeholder="Password" />
                        

                        <div><Link to="/login/forgotPassword" className='hover:underline hover:font-semibold text-[#e2136e]'>Forgot password?</Link></div>
                        <button className="btn btn-outline  btn-secondary mt-4">Login</button>

                    </form>
                    <button type='button'  className="btn btn-outline btn-secondary">
                        <div className='flex justify-center items-center gap-2'>
                            <img className='w-4 mt-[3px]' src='' alt="" />
                            <div>Login with Google</div>
                        </div>
                    </button>


                    <p className='text-center mt-5 mb-2'>Don't have an account ? <Link className='hover:underline hover:font-semibold text-[#e2136e]' to="/register">Create an account</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;