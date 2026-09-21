import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaTimes } from "react-icons/fa";
import Auth from '../pages/Auth';

function AuthModel({ onClose }) {

    const { userData } = useSelector((state) => state.user)


    useEffect(() => {

        if (userData) {
            onClose()
        }

    }, [userData, onClose])


    return (

        <div className='fixed inset-0 z-[999] flex items-center justify-center bg-[#02040a]/80 backdrop-blur-md px-4'>

            <div className='relative w-full max-w-md'>

                {/* CLOSE BUTTON */}

                <button

                    onClick={onClose}

                    className='absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-[#111827] border border-[#30364d] text-slate-400 hover:text-white hover:border-violet-500/60 transition shadow-lg'
                >

                    <FaTimes size={16} />

                </button>


                {/* AUTH CARD */}

                <div className='bg-[#0d111d] rounded-3xl border border-[#252b40] shadow-2xl shadow-black/50 overflow-hidden'>

                    <Auth isModel={true} />

                </div>

            </div>

        </div>

    )
}

export default AuthModel
