import React from 'react'
import { BsRobot } from "react-icons/bs";
import { IoSparkles } from "react-icons/io5";
import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import axios from 'axios';
import { ServerUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Auth({ isModel = false }) {

    const dispatch = useDispatch()


    const handleGoogleAuth = async () => {

        try {

            const response = await signInWithPopup(auth, provider)

            let User = response.user

            let name = User.displayName
            let email = User.email

            const result = await axios.post(
                ServerUrl + "/api/auth/google",
                { name, email },
                { withCredentials: true }
            )

            dispatch(setUserData(result.data))

        } catch (error) {

            console.log(error)

            dispatch(setUserData(null))

        }

    }


    return (

        <div className={`
            w-full
            ${isModel
                ? "py-4"
                : "min-h-screen bg-[#070A13] flex items-center justify-center px-6 py-20"
            }
        `}>

            <motion.div

                initial={{ opacity: 0, y: -40 }}

                animate={{ opacity: 1, y: 0 }}

                transition={{ duration: 1.05 }}

                className={`
                    w-full

                    ${isModel
                        ? "max-w-md p-8 rounded-3xl"
                        : "max-w-lg p-12 rounded-[32px]"
                    }

                    bg-[#0d111d]
                    shadow-2xl
                    border border-[#252b40]
                `}
            >


                {/* LOGO */}

                <div className='flex items-center justify-center gap-3 mb-7'>

                    <div className='bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-2.5 rounded-xl shadow-lg shadow-violet-900/30'>

                        <BsRobot size={18} />

                    </div>

                    <h2 className='font-semibold text-lg text-white'>
                        PrepPilot.AI
                    </h2>

                </div>


                {/* TITLE */}

                <h1 className='text-2xl md:text-3xl font-semibold text-center leading-snug mb-5 text-white'>

                    Continue with

                    <span className='bg-violet-500/10 text-violet-400 border border-violet-500/20 px-3 py-1.5 rounded-full inline-flex items-center gap-2 ml-2'>

                        <IoSparkles size={16} />

                        AI Smart Interview

                    </span>

                </h1>


                {/* DESCRIPTION */}

                <p className='text-slate-500 text-center text-sm md:text-base leading-relaxed mb-8'>

                    Sign in to start AI-powered mock interviews,
                    track your progress, and unlock detailed performance insights.

                </p>


                {/* GOOGLE BUTTON */}

                <motion.button

                    onClick={handleGoogleAuth}

                    whileHover={{
                        opacity: 0.95,
                        scale: 1.02
                    }}

                    whileTap={{
                        opacity: 1,
                        scale: 0.98
                    }}

                    className='w-full flex items-center justify-center gap-3 py-3.5 bg-white text-gray-900 rounded-full shadow-lg hover:shadow-xl transition font-semibold'
                >

                    <FcGoogle size={20} />

                    Continue with Google

                </motion.button>


                {/* SMALL NOTE */}

                <p className='text-center text-xs text-slate-600 mt-6'>

                    Secure authentication powered by Google

                </p>


            </motion.div>

        </div>

    )
}

export default Auth