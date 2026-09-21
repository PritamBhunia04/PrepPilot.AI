import React from 'react'
import { FaArrowLeft, FaDownload, FaChartLine, FaComments, FaBullseye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion } from "motion/react"
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

function Step3Report({ report }) {

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#070A13]">
        <p className="text-slate-400 text-lg">
          Loading Report...
        </p>
      </div>
    );
  }

  const navigate = useNavigate()

  const {
    finalScore = 0,
    confidence = 0,
    communication = 0,
    correctness = 0,
    questionWiseScore = [],
  } = report;

  const questionScoreData = questionWiseScore.map((score, index) => ({
    name: `Q${index + 1}`,
    score: score.score || 0
  }))

  const skills = [
    { label: "Confidence", value: confidence },
    { label: "Communication", value: communication },
    { label: "Correctness", value: correctness },
  ];

  let performanceText = "";
  let shortTagline = "";

  if (finalScore >= 8) {
    performanceText = "Ready for job opportunities.";
    shortTagline = "Excellent clarity and structured responses.";
  } else if (finalScore >= 5) {
    performanceText = "Needs minor improvement before interviews.";
    shortTagline = "Good foundation, refine articulation.";
  } else {
    performanceText = "Significant improvement required.";
    shortTagline = "Work on clarity and confidence.";
  }

  const score = finalScore;
  const percentage = (score / 10) * 100;


  /* ================= PDF GENERATION ================= */

  const downloadPDF = () => {
    const doc = new jsPDF("p", "mm", "a4");

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;

    let currentY = 25;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(34, 197, 94);

    doc.text(
      "AI Interview Performance Report",
      pageWidth / 2,
      currentY,
      { align: "center" }
    );

    currentY += 5;

    doc.setDrawColor(34, 197, 94);
    doc.line(
      margin,
      currentY + 2,
      pageWidth - margin,
      currentY + 2
    );

    currentY += 15;

    doc.setFillColor(240, 253, 244);

    doc.roundedRect(
      margin,
      currentY,
      contentWidth,
      20,
      4,
      4,
      "F"
    );

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);

    doc.text(
      `Final Score: ${finalScore}/10`,
      pageWidth / 2,
      currentY + 12,
      { align: "center" }
    );

    currentY += 30;

    doc.setFillColor(249, 250, 251);

    doc.roundedRect(
      margin,
      currentY,
      contentWidth,
      30,
      4,
      4,
      "F"
    );

    doc.setFontSize(12);

    doc.text(
      `Confidence: ${confidence}`,
      margin + 10,
      currentY + 10
    );

    doc.text(
      `Communication: ${communication}`,
      margin + 10,
      currentY + 18
    );

    doc.text(
      `Correctness: ${correctness}`,
      margin + 10,
      currentY + 26
    );

    currentY += 45;

    let advice = "";

    if (finalScore >= 8) {

      advice =
        "Excellent performance. Maintain confidence and structure. Continue refining clarity and supporting answers with strong real-world examples.";

    } else if (finalScore >= 5) {

      advice =
        "Good foundation shown. Improve clarity and structure. Practice delivering concise, confident answers with stronger supporting examples.";

    } else {

      advice =
        "Significant improvement required. Focus on structured thinking, clarity, and confident delivery. Practice answering aloud regularly.";

    }

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(220);

    doc.roundedRect(
      margin,
      currentY,
      contentWidth,
      35,
      4,
      4
    );

    doc.setFont("helvetica", "bold");

    doc.text(
      "Professional Advice",
      margin + 10,
      currentY + 10
    );

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    const splitAdvice = doc.splitTextToSize(
      advice,
      contentWidth - 20
    );

    doc.text(
      splitAdvice,
      margin + 10,
      currentY + 20
    );

    currentY += 50;

    autoTable(doc, {

      startY: currentY,

      margin: {
        left: margin,
        right: margin
      },

      head: [
        ["#", "Question", "Score", "Feedback"]
      ],

      body: questionWiseScore.map((q, i) => [

        `${i + 1}`,
        q.question,
        `${q.score}/10`,
        q.feedback,

      ]),

      styles: {
        fontSize: 9,
        cellPadding: 5,
        valign: "top",
      },

      headStyles: {
        fillColor: [34, 197, 94],
        textColor: 255,
        halign: "center",
      },

      columnStyles: {
        0: {
          cellWidth: 10,
          halign: "center"
        },

        1: {
          cellWidth: 55
        },

        2: {
          cellWidth: 20,
          halign: "center"
        },

        3: {
          cellWidth: "auto"
        },
      },

      alternateRowStyles: {
        fillColor: [249, 250, 251],
      },

    });

    doc.save("AI_Interview_Report.pdf");
  };


  return (

    <div className='min-h-screen bg-[#070A13] text-white px-4 sm:px-6 lg:px-10 py-8'>

      {/* HEADER */}

      <div className='max-w-7xl mx-auto mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5'>

        <div className='flex items-start gap-4'>

          <button
            onClick={() => navigate("/history")}

            className='mt-1 p-3 rounded-full bg-[#111827] border border-[#30364d] text-slate-300 hover:text-white hover:border-violet-500/60 hover:bg-[#151a2a] transition'
          >

            <FaArrowLeft />

          </button>


          <div>

            <div className='flex items-center gap-2 mb-2'>

              <FaChartLine className='text-violet-400' />

              <span className='text-xs uppercase tracking-wider text-violet-400 font-semibold'>
                Performance Analytics
              </span>

            </div>

            <h1 className='text-2xl sm:text-3xl font-bold text-white'>
              Interview Analytics Dashboard
            </h1>

            <p className='text-slate-500 mt-2'>
              AI-powered performance insights
            </p>

          </div>

        </div>


        <button
          onClick={downloadPDF}

          className='flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-6 py-3 rounded-xl shadow-lg shadow-violet-900/20 transition font-semibold text-sm sm:text-base'
        >

          <FaDownload />

          Download PDF

        </button>

      </div>


      <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8'>


        {/* LEFT COLUMN */}

        <div className='space-y-6'>


          {/* SCORE CARD */}

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}

            className='bg-[#0d111d] rounded-2xl sm:rounded-3xl border border-[#252b40] shadow-2xl p-6 sm:p-8 text-center'
          >

            <div className='flex items-center justify-center gap-2 mb-6'>

              <FaBullseye className='text-violet-400' />

              <h3 className='text-slate-400 text-sm sm:text-base'>
                Overall Performance
              </h3>

            </div>


            <div className='relative w-28 h-28 mx-auto'>

              <CircularProgressbar

                value={percentage}

                text={`${score}/10`}

                styles={buildStyles({

                  textSize: "18px",

                  pathColor: "#8b5cf6",

                  textColor: "#f8fafc",

                  trailColor: "#252b40",

                })}

              />

            </div>


            <p className='text-slate-600 mt-4 text-xs sm:text-sm'>
              Out of 10
            </p>


            <div className='mt-5'>

              <p className='font-semibold text-white text-sm sm:text-base'>
                {performanceText}
              </p>

              <p className='text-slate-500 text-xs sm:text-sm mt-2'>
                {shortTagline}
              </p>

            </div>

          </motion.div>


          {/* SKILLS */}

          <motion.div

            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}

            className='bg-[#0d111d] rounded-2xl sm:rounded-3xl border border-[#252b40] shadow-2xl p-6 sm:p-8'
          >

            <h3 className='text-base sm:text-lg font-semibold text-slate-200 mb-6'>
              Skill Evaluation
            </h3>


            <div className='space-y-6'>

              {skills.map((s, i) => (

                <div key={i}>

                  <div className='flex justify-between mb-2 text-sm'>

                    <span className='text-slate-400'>
                      {s.label}
                    </span>

                    <span className='font-semibold text-violet-400'>
                      {s.value}
                    </span>

                  </div>


                  <div className='bg-[#252b40] h-2 rounded-full overflow-hidden'>

                    <div

                      className='bg-gradient-to-r from-violet-600 to-cyan-400 h-full rounded-full transition-all'

                      style={{
                        width: `${s.value * 10}%`
                      }}

                    ></div>

                  </div>

                </div>

              ))}

            </div>

          </motion.div>

        </div>


        {/* RIGHT COLUMN */}

        <div className='lg:col-span-2 space-y-6'>


          {/* PERFORMANCE GRAPH */}

          <motion.div

            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}

            className='bg-[#0d111d] rounded-2xl sm:rounded-3xl border border-[#252b40] shadow-2xl p-5 sm:p-8'
          >

            <div className='flex items-center gap-3 mb-6'>

              <div className='w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center'>

                <FaChartLine className='text-violet-400' />

              </div>

              <div>

                <h3 className='text-base sm:text-lg font-semibold text-slate-200'>
                  Performance Trend
                </h3>

                <p className='text-xs text-slate-600 mt-1'>
                  Score across interview questions
                </p>

              </div>

            </div>


            <div className='h-64 sm:h-72'>

              <ResponsiveContainer width="100%" height="100%">

                <AreaChart data={questionScoreData}>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#252b40"
                  />

                  <XAxis
                    dataKey="name"
                    stroke="#64748b"
                  />

                  <YAxis
                    domain={[0, 10]}
                    stroke="#64748b"
                  />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#111827",
                      border: "1px solid #30364d",
                      borderRadius: "12px",
                      color: "#fff"
                    }}
                  />

                  <Area

                    type="monotone"

                    dataKey="score"

                    stroke="#8b5cf6"

                    fill="#8b5cf6"

                    fillOpacity={0.12}

                    strokeWidth={3}

                  />

                </AreaChart>

              </ResponsiveContainer>

            </div>

          </motion.div>


          {/* QUESTION BREAKDOWN */}

          <motion.div

            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}

            className='bg-[#0d111d] rounded-2xl sm:rounded-3xl border border-[#252b40] shadow-2xl p-5 sm:p-8'
          >

            <div className='flex items-center gap-3 mb-6'>

              <div className='w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center'>

                <FaComments className='text-cyan-400' />

              </div>

              <div>

                <h3 className='text-base sm:text-lg font-semibold text-slate-200'>
                  Question Breakdown
                </h3>

                <p className='text-xs text-slate-600 mt-1'>
                  Detailed AI feedback for each response
                </p>

              </div>

            </div>


            <div className='space-y-6'>

              {questionWiseScore.map((q, i) => (

                <div

                  key={i}

                  className='bg-[#0a0e18] p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-[#252b40]'
                >

                  <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4'>

                    <div>

                      <p className='text-xs text-violet-400 font-semibold uppercase tracking-wider mb-2'>
                        Question {i + 1}
                      </p>

                      <p className='font-semibold text-slate-200 text-sm sm:text-base leading-relaxed'>
                        {q.question || "Question not available"}
                      </p>

                    </div>


                    <div className='bg-violet-500/10 border border-violet-500/20 text-violet-300 px-3 py-1 rounded-full font-bold text-xs sm:text-sm w-fit'>
                      {q.score ?? 0}/10
                    </div>

                  </div>


                  <div className='bg-cyan-500/5 border border-cyan-500/10 p-4 rounded-xl'>

                    <p className='text-xs text-cyan-400 font-semibold mb-2'>
                      AI Feedback
                    </p>

                    <p className='text-sm text-slate-400 leading-relaxed'>

                      {q.feedback && q.feedback.trim() !== ""
                        ? q.feedback
                        : "No feedback available for this question."
                      }

                    </p>

                  </div>

                </div>

              ))}

            </div>

          </motion.div>

        </div>

      </div>

    </div>

  )
}

export default Step3Report