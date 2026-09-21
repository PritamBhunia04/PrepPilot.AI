import React from 'react'
import { BsRobot } from 'react-icons/bs'

function Footer() {

  return (

    <div className='w-full bg-[#070A13] px-4 pb-10 pt-10'>

      <div className='w-full bg-[#0d111d] rounded-[24px] shadow-2xl shadow-black/20 border border-[#252b40] py-8 px-3 text-center'>

        <div className='flex justify-center items-center gap-3 mb-3'>

          <div className='bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-2 rounded-lg'>
            <BsRobot size={16} />
          </div>

          <h2 className='font-semibold text-white'>
            PrepPilot.AI
          </h2>

        </div>

        <p className='text-slate-500 text-sm max-w-xl mx-auto leading-relaxed'>
          AI-powered interview preparation platform designed to improve
          communication skills, technical depth and professional confidence.
        </p>

        <div className='mt-5 text-xs text-slate-600'>
          Practice smarter. Interview better.
        </div>

      </div>

    </div>

  )
}

export default Footer