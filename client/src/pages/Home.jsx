import React from 'react'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import { motion } from "motion/react";
import {
  BsRobot,
  BsMic,
  BsClock,
  BsBarChart,
  BsFileEarmarkText
} from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AuthModel from '../components/AuthModel';
import hrImg from "../assets/HR.png";
import techImg from "../assets/tech.png";
import confidenceImg from "../assets/confi.png";
import creditImg from "../assets/credit.png";
import evalImg from "../assets/ai-ans.png";
import resumeImg from "../assets/resume.png";
import pdfImg from "../assets/pdf.png";
import analyticsImg from "../assets/history.png";
import Footer from '../components/Footer';


function Home() {
  const { userData } = useSelector((state) => state.user)
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate()

  return (
    <div className='min-h-screen bg-[#070A13] text-white flex flex-col'>

      <Navbar />

      <div className='flex-1 px-5 sm:px-6 py-20'>

        <div className='max-w-6xl mx-auto'>

          {/* HERO BADGE */}
          <div className='flex justify-center mb-7'>
            <div className='bg-[#111827] border border-[#272b3f] text-slate-300 text-sm px-5 py-2.5 rounded-full flex items-center gap-2 shadow-lg'>
              <HiSparkles
                size={16}
                className="text-violet-400"
              />
              AI Powered Smart Interview Platform
            </div>
          </div>


          {/* HERO SECTION */}
          <div className='text-center mb-28'>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight max-w-4xl mx-auto text-white'
            >
              Practice Interviews with{" "}

              <span className='relative inline-block mt-2'>
                <span className='bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent'>
                  AI Intelligence
                </span>
              </span>

            </motion.h1>


            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className='text-slate-400 mt-7 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed'
            >
              Role-based mock interviews with smart follow-ups,
              adaptive difficulty and real-time performance evaluation.
            </motion.p>


            {/* BUTTONS */}
            <div className='flex flex-wrap justify-center gap-4 mt-10'>

              <motion.button
                onClick={() => {
                  if (!userData) {
                    setShowAuth(true)
                    return;
                  }
                  navigate("/interview")
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className='bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-10 py-3 rounded-full hover:from-violet-500 hover:to-indigo-500 transition shadow-lg shadow-violet-900/30 font-medium'
              >
                Start Interview
              </motion.button>


              <motion.button
                onClick={() => {
                  if (!userData) {
                    setShowAuth(true)
                    return;
                  }
                  navigate("/history")
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className='border border-[#30364d] bg-[#0d111d] text-slate-200 px-10 py-3 rounded-full hover:bg-[#151a2a] hover:border-violet-500/50 transition font-medium'
              >
                View History
              </motion.button>

            </div>

          </div>


          {/* 3 STEP CARDS */}
          <div className='flex flex-col md:flex-row justify-center items-center gap-10 mb-32'>

            {
              [
                {
                  icon: <BsRobot size={24} />,
                  step: "STEP 1",
                  title: "Role & Experience Selection",
                  desc: "AI adjusts difficulty based on selected job role."
                },
                {
                  icon: <BsMic size={24} />,
                  step: "STEP 2",
                  title: "Smart Voice Interview",
                  desc: "Dynamic follow-up questions based on your answers."
                },
                {
                  icon: <BsClock size={24} />,
                  step: "STEP 3",
                  title: "Timer Based Simulation",
                  desc: "Real interview pressure with time tracking."
                }
              ].map((item, index) => (

                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 + index * 0.2 }}
                  whileHover={{ rotate: 0, scale: 1.05 }}

                  className={`
                    relative
                    bg-[#0d111d]
                    rounded-3xl
                    border border-[#252b40]
                    hover:border-violet-500/60
                    p-10
                    w-80
                    max-w-[90%]
                    shadow-xl
                    shadow-black/20
                    hover:shadow-violet-900/10
                    transition-all duration-300

                    ${index === 0 ? "rotate-[-4deg]" : ""}
                    ${index === 1 ? "rotate-[3deg] md:-mt-6 shadow-2xl" : ""}
                    ${index === 2 ? "rotate-[-3deg]" : ""}
                  `}
                >

                  {/* ICON */}
                  <div className='absolute -top-8 left-1/2 -translate-x-1/2 bg-[#111827] border border-violet-500/60 text-violet-400 w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl shadow-violet-900/20'>
                    {item.icon}
                  </div>


                  <div className='pt-10 text-center'>

                    <div className='text-xs text-violet-400 font-semibold mb-2 tracking-wider'>
                      {item.step}
                    </div>

                    <h3 className='font-semibold mb-3 text-lg text-white'>
                      {item.title}
                    </h3>

                    <p className='text-sm text-slate-400 leading-relaxed'>
                      {item.desc}
                    </p>

                  </div>

                </motion.div>

              ))
            }

          </div>


          {/* ADVANCED AI CAPABILITIES */}
          <div className='mb-32'>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-3xl sm:text-4xl font-semibold text-center mb-16 text-white'
            >
              Advanced AI{" "}

              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Capabilities
              </span>

            </motion.h2>


            <div className='grid md:grid-cols-2 gap-8 sm:gap-10'>

              {
                [
                  {
                    image: evalImg,
                    icon: <BsBarChart size={20} />,
                    title: "AI Answer Evaluation",
                    desc: "Scores communication, technical accuracy and confidence."
                  },
                  {
                    image: resumeImg,
                    icon: <BsFileEarmarkText size={20} />,
                    title: "Resume Based Interview",
                    desc: "Project-specific questions based on uploaded resume."
                  },
                  {
                    image: pdfImg,
                    icon: <BsFileEarmarkText size={20} />,
                    title: "Downloadable PDF Report",
                    desc: "Detailed strengths, weaknesses and improvement insights."
                  },
                  {
                    image: analyticsImg,
                    icon: <BsBarChart size={20} />,
                    title: "History & Analytics",
                    desc: "Track progress with performance graphs and topic analysis."
                  }
                ].map((item, index) => (

                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}

                    className='bg-[#0d111d] border border-[#252b40] rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl hover:border-violet-500/40 transition-all'
                  >

                    <div className='flex flex-col md:flex-row items-center gap-8'>

                      <div className='w-full md:w-1/2 flex justify-center'>

                        <div className='bg-[#111827] rounded-2xl p-4 border border-[#252b40]'>
                          <img
                            src={item.image}
                            alt={item.title}
                            className='w-full h-auto object-contain max-h-64'
                          />
                        </div>

                      </div>


                      <div className='w-full md:w-1/2'>

                        <div className='bg-violet-500/10 text-violet-400 border border-violet-500/20 w-12 h-12 rounded-xl flex items-center justify-center mb-6'>
                          {item.icon}
                        </div>

                        <h3 className='font-semibold mb-3 text-xl text-white'>
                          {item.title}
                        </h3>

                        <p className='text-slate-400 text-sm leading-relaxed'>
                          {item.desc}
                        </p>

                      </div>

                    </div>

                  </motion.div>

                ))
              }

            </div>

          </div>


          {/* INTERVIEW MODES */}
          <div className='mb-20'>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-3xl sm:text-4xl font-semibold text-center mb-16 text-white'
            >
              Multiple Interview{" "}

              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Modes
              </span>

            </motion.h2>


            <div className='grid md:grid-cols-2 gap-8 sm:gap-10'>

              {
                [
                  {
                    img: hrImg,
                    title: "HR Interview Mode",
                    desc: "Behavioral and communication based evaluation."
                  },
                  {
                    img: techImg,
                    title: "Technical Mode",
                    desc: "Deep technical questioning based on selected role."
                  },
                  {
                    img: confidenceImg,
                    title: "Confidence Detection",
                    desc: "Basic tone and voice analysis insights."
                  },
                  {
                    img: creditImg,
                    title: "Credits System",
                    desc: "Unlock premium interview sessions easily."
                  }
                ].map((mode, index) => (

                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -6 }}

                    className="bg-[#0d111d] border border-[#252b40] rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:border-cyan-500/30 transition-all"
                  >

                    <div className='flex items-center justify-between gap-6'>

                      <div className="w-1/2">

                        <h3 className="font-semibold text-xl mb-3 text-white">
                          {mode.title}
                        </h3>

                        <p className="text-slate-400 text-sm leading-relaxed">
                          {mode.desc}
                        </p>

                      </div>


                      <div className="w-1/2 flex justify-end">

                        <img
                          src={mode.img}
                          alt={mode.title}
                          className="w-28 h-28 object-contain"
                        />

                      </div>

                    </div>

                  </motion.div>

                ))
              }

            </div>

          </div>

        </div>

      </div>


      {showAuth && (
        <AuthModel onClose={() => setShowAuth(false)} />
      )}

      <Footer />

    </div>
  )
}

export default Home