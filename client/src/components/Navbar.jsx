import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from "motion/react"
import { BsRobot, BsCoin } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { FaUserAstronaut } from "react-icons/fa";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ServerUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import AuthModel from './AuthModel';

function Navbar() {

    const { userData } = useSelector((state) => state.user)

    const [showCreditPopup, setShowCreditPopup] = useState(false)
    const [showUserPopup, setShowUserPopup] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [showAuth, setShowAuth] = useState(false);


    const handleLogout = async () => {

        try {

            await axios.get(
                ServerUrl + "/api/auth/logout",
                { withCredentials: true }
            )

            dispatch(setUserData(null))

            setShowCreditPopup(false)
            setShowUserPopup(false)

            navigate("/")

        } catch (error) {

            console.log(error)

        }

    }


    return (

        <div className='bg-[#070A13] flex justify-center px-4 pt-6'>

            <motion.div

                initial={{ opacity: 0, y: -40 }}

                animate={{ opacity: 1, y: 0 }}

                transition={{ duration: 0.3 }}

                className='w-full bg-[#0d111d] rounded-[24px] shadow-lg border border-[#252b40] px-8 py-4 flex justify-between items-center relative'
            >


                {/* LOGO */}

                <div
                    className='flex items-center gap-3 cursor-pointer'
                    onClick={() => navigate("/")}
                >

                    <div className='bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-2 rounded-lg'>

                        <BsRobot size={18} />

                    </div>

                    <h1 className='font-semibold hidden md:block text-lg text-white'>
                        PrepPilot.AI
                    </h1>

                </div>


                {/* RIGHT SIDE */}

                <div className='flex items-center gap-6 relative'>


                    {/* CREDITS */}

                    <div className='relative'>

                        <button

                            onClick={() => {

                                if (!userData) {

                                    setShowAuth(true)

                                    return;

                                }

                                setShowCreditPopup(!showCreditPopup);

                                setShowUserPopup(false)

                            }}

                            className='flex items-center gap-2 bg-[#151a2a] border border-[#30364d] px-4 py-2 rounded-full text-md text-slate-200 hover:border-violet-500/50 hover:bg-[#1a2032] transition'
                        >

                            <BsCoin
                                size={20}
                                className='text-violet-400'
                            />

                            {userData?.credits || 0}

                        </button>


                        {showCreditPopup && (

                            <div className='absolute right-[-50px] mt-3 w-64 bg-[#0d111d] shadow-2xl border border-[#30364d] rounded-xl p-5 z-50'>

                                <p className='text-sm text-slate-400 mb-4'>

                                    Need more credits to continue interviews?

                                </p>

                                <button

                                    onClick={() => navigate("/pricing")}

                                    className='w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-2 rounded-lg text-sm hover:from-violet-500 hover:to-indigo-500 transition'
                                >

                                    Buy more credits

                                </button>

                            </div>

                        )}

                    </div>


                    {/* USER */}

                    <div className='relative'>

                        <button

                            onClick={() => {

                                if (!userData) {

                                    setShowAuth(true)

                                    return;

                                }

                                setShowUserPopup(!showUserPopup);

                                setShowCreditPopup(false)

                            }}

                            className='w-9 h-9 bg-gradient-to-br from-violet-600 to-indigo-600 text-white rounded-full flex items-center justify-center font-semibold'
                        >

                            {userData
                                ? userData?.name.slice(0, 1).toUpperCase()
                                : <FaUserAstronaut size={16} />
                            }

                        </button>


                        {showUserPopup && (

                            <div className='absolute right-0 mt-3 w-48 bg-[#0d111d] shadow-2xl border border-[#30364d] rounded-xl p-4 z-50'>

                                <p className='text-md text-violet-400 font-medium mb-1'>

                                    {userData?.name}

                                </p>


                                <button

                                    onClick={() => navigate("/history")}

                                    className='w-full text-left text-sm py-2 hover:text-white text-slate-500 transition'
                                >

                                    Interview History

                                </button>


                                <button

                                    onClick={handleLogout}

                                    className='w-full text-left text-sm py-2 flex items-center gap-2 text-red-400 hover:text-red-300'
                                >

                                    <HiOutlineLogout size={16} />

                                    Logout

                                </button>

                            </div>

                        )}

                    </div>

                </div>

            </motion.div>


            {showAuth && (

                <AuthModel
                    onClose={() => setShowAuth(false)}
                />

            )}

        </div>

    )

}

export default Navbar