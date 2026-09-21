import React from 'react'
import maleVideo from "../assets/videos/male-ai.mp4"
import femaleVideo from "../assets/videos/female-ai.mp4"
import Timer from './Timer'
import { motion } from "motion/react"
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import axios from "axios"
import { ServerUrl } from '../App'
import { BsArrowRight, BsSoundwave } from 'react-icons/bs'

function Step2Interview({ interviewData, onFinish }) {
  const { interviewId, questions, userName } = interviewData;
  const [isIntroPhase, setIsIntroPhase] = useState(true);

  const [isMicOn, setIsMicOn] = useState(true);
  const recognitionRef = useRef(null);
  const [isAIPlaying, setIsAIPlaying] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(
    questions[0]?.timeLimit || 60
  );
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voiceGender, setVoiceGender] = useState("female");
  const [subtitle, setSubtitle] = useState("");

  const videoRef = useRef(null);

  const currentQuestion = questions[currentIndex];


  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return;

      const femaleVoice =
        voices.find(v =>
          v.name.toLowerCase().includes("zira") ||
          v.name.toLowerCase().includes("samantha") ||
          v.name.toLowerCase().includes("female")
        );

      if (femaleVoice) {
        setSelectedVoice(femaleVoice);
        setVoiceGender("female");
        return;
      }

      const maleVoice =
        voices.find(v =>
          v.name.toLowerCase().includes("david") ||
          v.name.toLowerCase().includes("mark") ||
          v.name.toLowerCase().includes("male")
        );

      if (maleVoice) {
        setSelectedVoice(maleVoice);
        setVoiceGender("male");
        return;
      }

      setSelectedVoice(voices[0]);
      setVoiceGender("female");
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

  }, [])

  const videoSource = voiceGender === "male" ? maleVideo : femaleVideo;


  /* ---------------- SPEAK FUNCTION ---------------- */

  const speakText = (text) => {
    return new Promise((resolve) => {
      if (!window.speechSynthesis || !selectedVoice) {
        resolve();
        return;
      }

      window.speechSynthesis.cancel();

      const humanText = text
        .replace(/,/g, ", ... ")
        .replace(/\./g, ". ... ");

      const utterance = new SpeechSynthesisUtterance(humanText);

      utterance.voice = selectedVoice;

      utterance.rate = 0.92;
      utterance.pitch = 1.05;
      utterance.volume = 1;

      utterance.onstart = () => {
        setIsAIPlaying(true);
        stopMic()
        videoRef.current?.play();
      };


      utterance.onend = () => {
        videoRef.current?.pause();
        videoRef.current.currentTime = 0;
        setIsAIPlaying(false);

        if (isMicOn) {
          startMic();
        }

        setTimeout(() => {
          setSubtitle("");
          resolve();
        }, 300);
      };

      setSubtitle(text);

      window.speechSynthesis.speak(utterance);
    });
  };


  useEffect(() => {
    if (!selectedVoice) {
      return;
    }

    const runIntro = async () => {

      if (isIntroPhase) {

        await speakText(
          `Hi ${userName}, it's great to meet you today. I hope you're feeling confident and ready.`
        );

        await speakText(
          "I'll ask you a few questions. Just answer naturally, and take your time. Let's begin."
        );

        setIsIntroPhase(false)

      } else if (currentQuestion) {

        await new Promise(r => setTimeout(r, 800));

        if (currentIndex === questions.length - 1) {
          await speakText("Alright, this one might be a bit more challenging.");
        }

        await speakText(currentQuestion.question);

        if (isMicOn) {
          startMic();
        }
      }

    }

    runIntro()

  }, [selectedVoice, isIntroPhase, currentIndex])


  useEffect(() => {
    if (isIntroPhase) return;
    if (!currentQuestion) return;

    const timer = setInterval(() => {

      setTimeLeft((prev) => {

        if (prev <= 1) {
          clearInterval(timer)
          return 0;
        }

        return prev - 1

      })

    }, 1000);

    return () => clearInterval(timer)

  }, [isIntroPhase, currentIndex])


  useEffect(() => {
    if (!isIntroPhase && currentQuestion) {
      setTimeLeft(currentQuestion.timeLimit || 60);
    }
  }, [currentIndex]);


  useEffect(() => {

    if (!("webkitSpeechRecognition" in window)) return;

    const recognition = new window.webkitSpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event) => {

      const transcript =
        event.results[event.results.length - 1][0].transcript;

      setAnswer((prev) => prev + " " + transcript);
    };

    recognitionRef.current = recognition;

  }, []);


  const startMic = () => {

    if (recognitionRef.current && !isAIPlaying) {

      try {
        recognitionRef.current.start();
      } catch { }

    }
  };


  const stopMic = () => {

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

  };


  const toggleMic = () => {

    if (isMicOn) {
      stopMic();
    } else {
      startMic();
    }

    setIsMicOn(!isMicOn);
  };


  const submitAnswer = async () => {

    if (isSubmitting) return;

    stopMic()
    setIsSubmitting(true)

    try {

      const result = await axios.post(
        ServerUrl + "/api/interview/submit-answer",
        {
          interviewId,
          questionIndex: currentIndex,
          answer,
          timeTaken:
            currentQuestion.timeLimit - timeLeft,
        },
        { withCredentials: true }
      )

      setFeedback(result.data.feedback)
      speakText(result.data.feedback)
      setIsSubmitting(false)

    } catch (error) {

      console.log(error)
      setIsSubmitting(false)

    }
  }


  const handleNext = async () => {

    setAnswer("");
    setFeedback("");

    if (currentIndex + 1 >= questions.length) {

      finishInterview();
      return;

    }

    await speakText("Alright, let's move to the next question.");

    setCurrentIndex(currentIndex + 1);

    setTimeout(() => {

      if (isMicOn) startMic();

    }, 500);

  }


  const finishInterview = async () => {

    stopMic()
    setIsMicOn(false)

    try {

      const result = await axios.post(
        ServerUrl + "/api/interview/finish",
        { interviewId },
        { withCredentials: true }
      )

      console.log(result.data)
      onFinish(result.data)

    } catch (error) {

      console.log(error)

    }
  }


  useEffect(() => {

    if (isIntroPhase) return;
    if (!currentQuestion) return;

    if (timeLeft === 0 && !isSubmitting && !feedback) {
      submitAnswer()
    }

  }, [timeLeft]);


  useEffect(() => {

    return () => {

      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current.abort();
      }

      window.speechSynthesis.cancel();

    };

  }, []);


  return (

    <div className='min-h-screen bg-[#070A13] flex items-center justify-center p-4 sm:p-6'>

      <div className='w-full max-w-7xl min-h-[80vh] bg-[#0d111d] rounded-3xl shadow-2xl shadow-black/50 border border-[#252b40] flex flex-col lg:flex-row overflow-hidden'>


        {/* VIDEO SECTION */}

        <div className='w-full lg:w-[35%] bg-[#0a0e18] flex flex-col items-center p-5 sm:p-6 space-y-6 border-r border-[#252b40]'>

          {/* AI VIDEO */}

          <div className='w-full max-w-md rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-[#30364d] relative'>

            <video
              src={videoSource}
              key={videoSource}
              ref={videoRef}
              muted
              playsInline
              preload="auto"
              className="w-full h-auto object-cover"
            />

            <div className='absolute top-3 left-3 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-xs text-white border border-white/10'>

              <span className='w-2 h-2 rounded-full bg-cyan-400 animate-pulse'></span>

              AI Interviewer

            </div>

          </div>


          {/* SUBTITLE */}

          {subtitle && (

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}

              className='w-full max-w-md bg-[#111827] border border-[#30364d] rounded-xl p-4 shadow-xl'
            >

              <div className='flex items-start gap-3'>

                <BsSoundwave className='text-cyan-400 text-xl mt-0.5 shrink-0' />

                <p className='text-slate-300 text-sm sm:text-base font-medium leading-relaxed'>
                  {subtitle}
                </p>

              </div>

            </motion.div>

          )}


          {/* TIMER / STATUS */}

          <div className='w-full max-w-md bg-[#111827] border border-[#30364d] rounded-2xl shadow-xl p-6 space-y-5'>

            <div className='flex justify-between items-center'>

              <span className='text-sm text-slate-400'>
                Interview Status
              </span>

              {isAIPlaying && (

                <span className='flex items-center gap-2 text-sm font-semibold text-cyan-400'>

                  <span className='w-2 h-2 bg-cyan-400 rounded-full animate-pulse'></span>

                  AI Speaking

                </span>

              )}

            </div>


            <div className="h-px bg-[#252b40]"></div>


            <div className='flex justify-center'>

              <Timer
                timeLeft={timeLeft}
                totalTime={currentQuestion?.timeLimit}
              />

            </div>


            <div className="h-px bg-[#252b40]"></div>


            <div className='grid grid-cols-2 gap-6 text-center'>

              <div>

                <span className='block text-2xl font-bold text-violet-400'>
                  {currentIndex + 1}
                </span>

                <span className='text-xs text-slate-500'>
                  Current Question
                </span>

              </div>


              <div>

                <span className='block text-2xl font-bold text-cyan-400'>
                  {questions.length}
                </span>

                <span className='text-xs text-slate-500'>
                  Total Questions
                </span>

              </div>

            </div>

          </div>

        </div>


        {/* TEXT SECTION */}

        <div className='flex-1 flex flex-col p-5 sm:p-6 md:p-8 relative'>

          {/* HEADER */}

          <div className='flex items-center justify-between mb-6'>

            <div>

              <p className='text-xs text-violet-400 font-semibold tracking-wider uppercase mb-1'>
                Live Session
              </p>

              <h2 className='text-xl sm:text-2xl font-bold text-white'>
                AI Smart Interview
              </h2>

            </div>

            <div className='hidden sm:flex items-center gap-2 text-xs text-slate-500 bg-[#111827] border border-[#252b40] px-3 py-2 rounded-full'>
              <span className='w-2 h-2 bg-violet-400 rounded-full'></span>
              Question {currentIndex + 1}/{questions.length}
            </div>

          </div>


          {/* QUESTION */}

          {!isIntroPhase && (

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}

              className='relative mb-6 bg-[#111827] p-5 sm:p-6 rounded-2xl border border-[#30364d] shadow-lg'
            >

              <div className='flex items-center gap-2 mb-3'>

                <span className='text-xs text-violet-400 font-semibold uppercase tracking-wider'>
                  Question {currentIndex + 1}
                </span>

                <span className='h-1 w-1 rounded-full bg-slate-600'></span>

                <span className='text-xs text-slate-500'>
                  Interview Prompt
                </span>

              </div>

              <div className='text-base sm:text-lg font-semibold text-slate-100 leading-relaxed'>
                {currentQuestion?.question}
              </div>

            </motion.div>

          )}


          {/* ANSWER BOX */}

          <textarea
            placeholder="Type your answer here..."
            onChange={(e) => setAnswer(e.target.value)}
            value={answer}

            className="flex-1 min-h-[180px] bg-[#0a0e18] p-4 sm:p-6 rounded-2xl resize-none outline-none border border-[#30364d] focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition text-slate-200 placeholder:text-slate-600"
          />


          {/* CONTROLS */}

          {!feedback ? (

            <div className='flex items-center gap-4 mt-6'>

              <motion.button
                onClick={toggleMic}
                whileTap={{ scale: 0.9 }}

                className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full text-white shadow-lg transition ${
                  isMicOn
                    ? "bg-gradient-to-br from-violet-600 to-indigo-600 shadow-violet-900/30"
                    : "bg-[#252b40] border border-[#3a425c]"
                }`}
              >

                {isMicOn
                  ? <FaMicrophone size={20} />
                  : <FaMicrophoneSlash size={20} />
                }

              </motion.button>


              <motion.button
                onClick={submitAnswer}
                disabled={isSubmitting}

                whileTap={{ scale: 0.95 }}

                className='flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-3 sm:py-4 rounded-2xl shadow-lg shadow-violet-900/20 hover:from-violet-500 hover:to-indigo-500 transition font-semibold disabled:bg-slate-700 disabled:text-slate-400'
              >

                {isSubmitting
                  ? "Submitting..."
                  : "Submit Answer"
                }

              </motion.button>

            </div>

          ) : (

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}

              className='mt-6 bg-violet-500/10 border border-violet-500/20 p-5 rounded-2xl shadow-lg'
            >

              <div className='flex items-start gap-3 mb-4'>

                <div className='w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0'>
                  <BsSoundwave className='text-violet-400' />
                </div>

                <p className='text-violet-200 font-medium leading-relaxed'>
                  {feedback}
                </p>

              </div>


              <button
                onClick={handleNext}

                className='w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-3 rounded-xl shadow-md shadow-violet-900/20 hover:from-violet-500 hover:to-indigo-500 transition flex items-center justify-center gap-2 font-semibold'
              >

                Next Question

                <BsArrowRight size={18} />

              </button>

            </motion.div>

          )}

        </div>

      </div>

    </div>

  )
}

export default Step2Interview