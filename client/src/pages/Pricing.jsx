import React, { useState } from 'react'
import { FaArrowLeft, FaCheckCircle, FaCreditCard } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { motion } from "motion/react";
import axios from 'axios';
import { ServerUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Pricing() {

  const navigate = useNavigate()

  const [selectedPlan, setSelectedPlan] = useState("free");
  const [loadingPlan, setLoadingPlan] = useState(null);

  const dispatch = useDispatch()


  const plans = [

    {
      id: "free",
      name: "Free",
      price: "₹0",
      credits: 100,

      description:
        "Perfect for beginners starting interview preparation.",

      features: [
        "100 AI Interview Credits",
        "Basic Performance Report",
        "Voice Interview Access",
        "Limited History Tracking",
      ],

      default: true,
    },

    {
      id: "basic",
      name: "Starter Pack",
      price: "₹100",
      credits: 150,

      description:
        "Great for focused practice and skill improvement.",

      features: [
        "150 AI Interview Credits",
        "Detailed Feedback",
        "Performance Analytics",
        "Full Interview History",
      ],
    },

    {
      id: "pro",
      name: "Pro Pack",
      price: "₹500",
      credits: 650,

      description:
        "Best value for serious job preparation.",

      features: [
        "650 AI Interview Credits",
        "Advanced AI Feedback",
        "Skill Trend Analysis",
        "Priority AI Processing",
      ],

      badge: "Best Value",
    },

  ];


  /* ================= PAYMENT LOGIC ================= */

  const handlePayment = async (plan) => {

    try {

      setLoadingPlan(plan.id)

      const amount =
        plan.id === "basic" ? 100 :
        plan.id === "pro" ? 500 : 0;

      const result = await axios.post(
        ServerUrl + "/api/payment/order",
        {
          planId: plan.id,
          amount: amount,
          credits: plan.credits,
        },
        { withCredentials: true }
      )


      const options = {

        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: result.data.amount,

        currency: "INR",

        name: "PrepPilot.AI",

        description: `${plan.name} - ${plan.credits} Credits`,

        order_id: result.data.id,


        handler: async function (response) {

          const verifypay = await axios.post(
            ServerUrl + "/api/payment/verify",
            response,
            { withCredentials: true }
          )

          dispatch(setUserData(verifypay.data.user))

          alert("Payment Successful 🎉 Credits Added!");

          navigate("/")

        },


        theme: {
          color: "#8b5cf6",
        },

      }


      const rzp = new window.Razorpay(options)

      rzp.open()

      setLoadingPlan(null);

    } catch (error) {

      console.log(error)

      setLoadingPlan(null);

    }

  }


  return (

    <div className='min-h-screen bg-[#070A13] text-white py-12 sm:py-16 px-4 sm:px-6'>


      {/* HEADER */}

      <div className='max-w-6xl mx-auto mb-12 sm:mb-14 flex items-start gap-4'>


        <button

          onClick={() => navigate("/")}

          className='mt-2 p-3 rounded-full bg-[#111827] border border-[#30364d] text-slate-400 hover:text-white hover:border-violet-500/60 transition'
        >

          <FaArrowLeft />

        </button>


        <div className="text-center w-full pr-8">

          <div className='flex justify-center items-center gap-2 mb-3'>

            <FaCreditCard className='text-violet-400' />

            <span className='text-xs uppercase tracking-wider text-violet-400 font-semibold'>
              Credits & Plans
            </span>

          </div>


          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Choose Your Plan
          </h1>


          <p className="text-slate-500 mt-3 text-sm sm:text-lg">
            Flexible pricing to match your interview preparation goals.
          </p>

        </div>

      </div>


      {/* PLANS */}

      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto'>


        {plans.map((plan) => {

          const isSelected = selectedPlan === plan.id


          return (

            <motion.div

              key={plan.id}

              whileHover={!plan.default ? { scale: 1.02, y: -4 } : {}}

              onClick={() =>
                !plan.default &&
                setSelectedPlan(plan.id)
              }

              className={`relative rounded-3xl p-6 sm:p-8 transition-all duration-300 border

                ${
                  isSelected

                    ? "border-violet-500 shadow-2xl shadow-violet-950/30 bg-[#111827]"

                    : "border-[#252b40] bg-[#0d111d] shadow-xl"
                }

                ${plan.default
                  ? "cursor-default"
                  : "cursor-pointer hover:border-violet-500/40"
                }
              `}
            >


              {/* BADGE */}

              {plan.badge && (

                <div className="absolute top-6 right-6 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs px-4 py-1.5 rounded-full shadow-lg shadow-violet-900/20">

                  {plan.badge}

                </div>

              )}


              {/* DEFAULT */}

              {plan.default && (

                <div className="absolute top-6 right-6 bg-[#252b40] text-slate-400 text-xs px-3 py-1.5 rounded-full border border-[#30364d]">

                  Default

                </div>

              )}


              {/* PLAN ICON */}

              <div className='w-11 h-11 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-5'>

                <FaCreditCard className='text-violet-400' />

              </div>


              {/* PLAN NAME */}

              <h3 className="text-xl font-semibold text-slate-100">

                {plan.name}

              </h3>


              {/* PRICE */}

              <div className="mt-4">

                <span className="text-3xl font-bold text-violet-400">

                  {plan.price}

                </span>


                <p className="text-slate-500 mt-1">

                  {plan.credits} Credits

                </p>

              </div>


              {/* DESCRIPTION */}

              <p className="text-slate-500 mt-4 text-sm leading-relaxed min-h-[42px]">

                {plan.description}

              </p>


              <div className='h-px bg-[#252b40] my-6'></div>


              {/* FEATURES */}

              <div className="space-y-4 text-left">

                {plan.features.map((feature, i) => (

                  <div
                    key={i}
                    className="flex items-center gap-3"
                  >

                    <FaCheckCircle className="text-cyan-400 text-sm shrink-0" />

                    <span className="text-slate-400 text-sm">

                      {feature}

                    </span>

                  </div>

                ))}

              </div>


              {/* BUTTON */}

              {!plan.default && (

                <button

                  disabled={loadingPlan === plan.id}

                  onClick={(e) => {

                    e.stopPropagation();

                    if (!isSelected) {

                      setSelectedPlan(plan.id)

                    } else {

                      handlePayment(plan)

                    }

                  }}

                  className={`w-full mt-8 py-3 rounded-xl font-semibold transition

                    ${
                      isSelected

                        ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-900/20"

                        : "bg-[#151a2a] border border-[#30364d] text-slate-300 hover:border-violet-500/40 hover:text-white"
                    }
                  `}
                >

                  {loadingPlan === plan.id

                    ? "Processing..."

                    : isSelected

                      ? "Proceed to Pay"

                      : "Select Plan"

                  }

                </button>

              )}

            </motion.div>

          )

        })}

      </div>


      {/* FOOTER NOTE */}

      <div className='max-w-6xl mx-auto mt-10 text-center'>

        <p className='text-xs text-slate-600'>

          Secure payments powered by Razorpay

        </p>

      </div>


    </div>

  )
}

export default Pricing