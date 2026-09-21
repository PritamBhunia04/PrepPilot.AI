import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { ServerUrl } from '../App'
import { FaArrowLeft, FaChartLine, FaChevronRight } from 'react-icons/fa'

function InterviewHistory() {

    const [interviews, setInterviews] = useState([])
    const navigate = useNavigate()

    useEffect(() => {

        const getMyInterviews = async () => {

            try {

                const result = await axios.get(
                    ServerUrl + "/api/interview/get-interview",
                    { withCredentials: true }
                )

                setInterviews(result.data)

            } catch (error) {

                console.log(error)

            }

        }

        getMyInterviews()

    }, [])


    return (

        <div className='min-h-screen bg-[#070A13] text-white py-10 px-4 sm:px-6'>

            <div className='w-full max-w-6xl mx-auto'>


                {/* HEADER */}

                <div className='mb-10 flex items-start gap-4'>

                    <button

                        onClick={() => navigate("/")}

                        className='mt-1 p-3 rounded-full bg-[#111827] border border-[#30364d] text-slate-400 hover:text-white hover:border-violet-500/60 transition'
                    >

                        <FaArrowLeft />

                    </button>


                    <div>

                        <div className='flex items-center gap-2 mb-2'>

                            <FaChartLine className='text-violet-400' />

                            <span className='text-xs uppercase tracking-wider text-violet-400 font-semibold'>
                                Your Progress
                            </span>

                        </div>


                        <h1 className='text-2xl sm:text-3xl font-bold text-white'>
                            Interview History
                        </h1>


                        <p className='text-slate-500 mt-2'>
                            Track your past interviews and performance reports
                        </p>

                    </div>

                </div>


                {/* EMPTY STATE */}

                {interviews.length === 0 ? (

                    <div className='bg-[#0d111d] p-10 rounded-2xl border border-[#252b40] shadow-2xl text-center'>

                        <div className='w-14 h-14 mx-auto rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-5'>

                            <FaChartLine className='text-violet-400 text-xl' />

                        </div>


                        <h2 className='text-lg font-semibold text-slate-200 mb-2'>
                            No interviews yet
                        </h2>


                        <p className='text-slate-500 text-sm mb-6'>
                            Start your first AI interview to see your performance here.
                        </p>


                        <button

                            onClick={() => navigate("/interview")}

                            className='bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-violet-500 hover:to-indigo-500 transition'
                        >

                            Start Interview

                        </button>

                    </div>

                ) : (


                    /* INTERVIEW LIST */

                    <div className='grid gap-5'>

                        {interviews.map((item, index) => (

                            <div

                                key={index}

                                onClick={() => navigate(`/report/${item._id}`)}

                                className='group bg-[#0d111d] p-5 sm:p-6 rounded-2xl border border-[#252b40] shadow-xl hover:border-violet-500/40 hover:bg-[#101522] hover:shadow-violet-950/10 transition-all duration-300 cursor-pointer'
                            >

                                <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-5'>


                                    {/* INTERVIEW INFO */}

                                    <div className='min-w-0'>

                                        <div className='flex items-center gap-3 mb-2'>

                                            <div className='w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0'>

                                                <FaChartLine className='text-violet-400' />

                                            </div>


                                            <div className='min-w-0'>

                                                <h3 className='text-lg font-semibold text-slate-100 truncate'>

                                                    {item.role}

                                                </h3>

                                            </div>

                                        </div>


                                        <div className='flex flex-wrap items-center gap-2 ml-0 sm:ml-[52px]'>

                                            <span className='text-slate-400 text-sm'>
                                                {item.experience}
                                            </span>

                                            <span className='text-slate-600'>
                                                •
                                            </span>

                                            <span className='text-slate-400 text-sm'>
                                                {item.mode}
                                            </span>

                                        </div>


                                        <p className='text-xs text-slate-600 mt-2 ml-0 sm:ml-[52px]'>

                                            {new Date(item.createdAt).toLocaleDateString()}

                                        </p>

                                    </div>


                                    {/* SCORE + STATUS */}

                                    <div className='flex items-center justify-between md:justify-end gap-5 sm:gap-8'>


                                        {/* SCORE */}

                                        <div className='text-left md:text-right'>

                                            <p className='text-2xl font-bold text-violet-400'>

                                                {item.finalScore || 0}/10

                                            </p>

                                            <p className='text-xs text-slate-600 mt-1'>

                                                Overall Score

                                            </p>

                                        </div>


                                        {/* STATUS */}

                                        <span

                                            className={`px-4 py-1.5 rounded-full text-xs font-semibold border ${
                                                item.status === "completed"

                                                    ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"

                                                    : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                                            }`}
                                        >

                                            {item.status}

                                        </span>


                                        {/* ARROW */}

                                        <FaChevronRight className='text-slate-600 group-hover:text-violet-400 transition' />

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>

    )
}

export default InterviewHistory