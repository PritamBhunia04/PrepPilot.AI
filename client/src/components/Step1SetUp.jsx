import React from 'react'
import { motion } from "motion/react"
import {
    FaUserTie,
    FaBriefcase,
    FaFileUpload,
    FaMicrophoneAlt,
    FaChartLine,
} from "react-icons/fa";
import { useState } from 'react';
import axios from "axios"
import { ServerUrl } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Step1SetUp({ onStart }) {

    const { userData } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const [role, setRole] = useState("");
    const [experience, setExperience] = useState("");
    const [mode, setMode] = useState("Technical");
    const [resumeFile, setResumeFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [resumeText, setResumeText] = useState("");
    const [analysisDone, setAnalysisDone] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);


    const handleUploadResume = async () => {
        if (!resumeFile || analyzing) return;
        setAnalyzing(true)

        const formdata = new FormData()
        formdata.append("resume", resumeFile)

        try {
            const result = await axios.post(
                ServerUrl + "/api/interview/resume",
                formdata,
                { withCredentials: true }
            )

            console.log(result.data)

            setRole(result.data.role || "");
            setExperience(result.data.experience || "");
            setProjects(result.data.projects || []);
            setSkills(result.data.skills || []);
            setResumeText(result.data.resumeText || "");
            setAnalysisDone(true);

            setAnalyzing(false);

        } catch (error) {
            console.log(error)
            setAnalyzing(false);
        }
    }


    const handleStart = async () => {
        setLoading(true)

        try {

            const result = await axios.post(
                ServerUrl + "/api/interview/generate-questions",
                {
                    role,
                    experience,
                    mode,
                    resumeText,
                    projects,
                    skills
                },
                { withCredentials: true }
            )

            console.log(result.data)

            if (userData) {
                dispatch(
                    setUserData({
                        ...userData,
                        credits: result.data.creditsLeft
                    })
                )
            }

            setLoading(false)
            onStart(result.data)

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }


    return (

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}

            className='min-h-screen flex items-center justify-center bg-[#070A13] px-4 py-10'
        >

            <div className='w-full max-w-6xl bg-[#0d111d] rounded-3xl shadow-2xl shadow-black/40 border border-[#252b40] grid md:grid-cols-2 overflow-hidden'>


                {/* LEFT SIDE */}

                <motion.div
                    initial={{ x: -80, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}

                    className='relative bg-gradient-to-br from-[#11152a] via-[#101426] to-[#0b0e19] p-8 sm:p-12 flex flex-col justify-center'
                >

                    {/* Decorative glow */}

                    <div className='absolute top-[-100px] left-[-100px] w-64 h-64 bg-violet-600/10 rounded-full blur-3xl pointer-events-none'></div>

                    <div className='relative z-10'>

                        <div className='inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-400 px-4 py-2 rounded-full text-sm mb-6'>
                            <FaMicrophoneAlt size={14} />
                            AI Interview
                        </div>


                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                            Start Your AI Interview
                        </h2>


                        <p className="text-slate-400 mb-10 leading-relaxed">
                            Practice real interview scenarios powered by AI.
                            Improve communication, technical skills, and confidence.
                        </p>


                        <div className='space-y-5'>

                            {
                                [
                                    {
                                        icon: <FaUserTie className="text-violet-400 text-xl" />,
                                        text: "Choose Role & Experience",
                                    },
                                    {
                                        icon: <FaMicrophoneAlt className="text-cyan-400 text-xl" />,
                                        text: "Smart Voice Interview",
                                    },
                                    {
                                        icon: <FaChartLine className="text-violet-400 text-xl" />,
                                        text: "Performance Analytics",
                                    },
                                ].map((item, index) => (

                                    <motion.div
                                        key={index}
                                        initial={{ y: 30, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 + index * 0.15 }}
                                        whileHover={{ scale: 1.03 }}

                                        className='flex items-center space-x-4 bg-[#151a2a] border border-[#272d43] p-4 rounded-xl shadow-lg cursor-pointer hover:border-violet-500/40 transition'
                                    >

                                        <div className='w-10 h-10 rounded-lg bg-[#1b2034] flex items-center justify-center'>
                                            {item.icon}
                                        </div>

                                        <span className='text-slate-200 font-medium'>
                                            {item.text}
                                        </span>

                                    </motion.div>

                                ))
                            }

                        </div>

                    </div>

                </motion.div>


                {/* RIGHT SIDE */}

                <motion.div
                    initial={{ x: 80, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}

                    className="p-7 sm:p-12 bg-[#0d111d]"
                >

                    <h2 className='text-3xl font-bold text-white mb-8'>
                        Interview Setup
                    </h2>


                    <div className='space-y-6'>


                        {/* ROLE */}

                        <div className='relative'>

                            <FaUserTie className='absolute top-4 left-4 text-slate-500' />

                            <input
                                type='text'
                                placeholder='Enter role'

                                className='w-full pl-12 pr-4 py-3 bg-[#111827] border border-[#30364d] text-white placeholder:text-slate-500 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition'

                                onChange={(e) => setRole(e.target.value)}
                                value={role}
                            />

                        </div>


                        {/* EXPERIENCE */}

                        <div className='relative'>

                            <FaBriefcase className='absolute top-4 left-4 text-slate-500' />

                            <input
                                type='text'
                                placeholder='Experience (e.g. 2 years)'

                                className='w-full pl-12 pr-4 py-3 bg-[#111827] border border-[#30364d] text-white placeholder:text-slate-500 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition'

                                onChange={(e) => setExperience(e.target.value)}
                                value={experience}
                            />

                        </div>


                        {/* INTERVIEW MODE */}

                        <select
                            value={mode}
                            onChange={(e) => setMode(e.target.value)}

                            className='w-full py-3 px-4 bg-[#111827] border border-[#30364d] text-white rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition'
                        >

                            <option value="Technical">
                                Technical Interview
                            </option>

                            <option value="HR">
                                HR Interview
                            </option>

                        </select>


                        {/* RESUME UPLOAD */}

                        {!analysisDone && (

                            <motion.div
                                whileHover={{ scale: 1.02 }}

                                onClick={() =>
                                    document.getElementById("resumeUpload").click()
                                }

                                className='border-2 border-dashed border-[#30364d] rounded-xl p-8 text-center cursor-pointer hover:border-violet-500 hover:bg-violet-500/5 transition'
                            >

                                <FaFileUpload className='text-4xl mx-auto text-violet-400 mb-3' />

                                <input
                                    type="file"
                                    accept="application/pdf"
                                    id="resumeUpload"
                                    className='hidden'
                                    onChange={(e) =>
                                        setResumeFile(e.target.files[0])
                                    }
                                />

                                <p className='text-slate-300 font-medium'>
                                    {resumeFile
                                        ? resumeFile.name
                                        : "Click to upload resume (Optional)"}
                                </p>


                                {resumeFile && (

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}

                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleUploadResume()
                                        }}

                                        className='mt-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-5 py-2 rounded-lg hover:opacity-90 transition'
                                    >

                                        {analyzing
                                            ? "Analyzing..."
                                            : "Analyze Resume"}

                                    </motion.button>

                                )}

                            </motion.div>

                        )}


                        {/* ANALYSIS RESULT */}

                        {analysisDone && (

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}

                                className='bg-[#111827] border border-[#30364d] rounded-xl p-5 space-y-4'
                            >

                                <h3 className='text-lg font-semibold text-white'>
                                    Resume Analysis Result
                                </h3>


                                {projects.length > 0 && (

                                    <div>

                                        <p className='font-medium text-slate-300 mb-1'>
                                            Projects:
                                        </p>

                                        <ul className='list-disc list-inside text-slate-400 space-y-1'>

                                            {projects.map((p, i) => (
                                                <li key={i}>{p}</li>
                                            ))}

                                        </ul>

                                    </div>

                                )}


                                {skills.length > 0 && (

                                    <div>

                                        <p className='font-medium text-slate-300 mb-1'>
                                            Skills:
                                        </p>


                                        <div className='flex flex-wrap gap-2'>

                                            {skills.map((s, i) => (

                                                <span
                                                    key={i}
                                                    className='bg-violet-500/10 border border-violet-500/20 text-violet-300 px-3 py-1 rounded-full text-sm'
                                                >
                                                    {s}
                                                </span>

                                            ))}

                                        </div>

                                    </div>

                                )}

                            </motion.div>

                        )}


                        {/* START INTERVIEW */}

                        <motion.button
                            onClick={handleStart}

                            disabled={!role || !experience || loading}

                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.95 }}

                            className='w-full disabled:bg-slate-700 disabled:text-slate-400 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white py-3 rounded-full text-lg font-semibold transition duration-300 shadow-lg shadow-violet-900/20'
                        >

                            {loading
                                ? "Starting..."
                                : "Start Interview"}

                        </motion.button>

                    </div>

                </motion.div>

            </div>

        </motion.div>
    )
}

export default Step1SetUp