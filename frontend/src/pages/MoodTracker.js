import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaSmile, FaMeh, FaFrown, FaAngry, FaFlushed, FaCalendarAlt, FaChartLine } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState("");
  const [moodHistory, setMoodHistory] = useState([]);
  const [view, setView] = useState("track"); // 'track' or 'history'
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Load saved moods from localStorage
  useEffect(() => {
    const savedMoods = JSON.parse(localStorage.getItem('moodHistory')) || [];
    setMoodHistory(savedMoods);
  }, []);

  // Save moods to localStorage when they change
  useEffect(() => {
    localStorage.setItem('moodHistory', JSON.stringify(moodHistory));
  }, [moodHistory]);

  const moods = [
    { id: 1, name: "Excellent", icon: <FaSmile />, color: "bg-[#4CAF50]", emoji: "😊" },
    { id: 2, name: "Good", icon: <FaSmile />, color: "bg-[#8BC34A]", emoji: "🙂" },
    { id: 3, name: "Neutral", icon: <FaMeh />, color: "bg-[#FFC107]", emoji: "😐" },
    { id: 4, name: "Poor", icon: <FaFrown />, color: "bg-[#FF9800]", emoji: "😕" },
    { id: 5, name: "Stressed", icon: <FaFlushed />, color: "bg-[#FF5722]", emoji: "😟" },
    { id: 6, name: "Angry", icon: <FaAngry />, color: "bg-[#F44336]", emoji: "😠" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedMood) return;

    const newEntry = {
      id: Date.now(),
      date: selectedDate,
      mood: selectedMood,
      note,
      timestamp: new Date().toISOString()
    };

    setMoodHistory([...moodHistory, newEntry]);
    setSelectedMood(null);
    setNote("");
  };

  const filteredMoods = moodHistory.filter(entry => 
    entry.date === selectedDate
  );

  // Prepare data for chart
  const last7Days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().split('T')[0];
  }).reverse();

  const chartData = {
    labels: last7Days,
    datasets: [
      {
        label: 'Mood Level',
        data: last7Days.map(date => {
          const entry = moodHistory.find(e => e.date === date);
          return entry ? moods.findIndex(m => m.id === entry.mood) + 1 : null;
        }),
        borderColor: '#A47148',
        backgroundColor: '#D1A68E',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        min: 1,
        max: 6,
        ticks: {
          callback: function(value) {
            return moods[value - 1]?.name || '';
          }
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            const entry = moodHistory.find(e => 
              e.date === last7Days[context.dataIndex]
            );
            return [
              `Mood: ${moods[context.raw - 1]?.name}`,
              entry?.note && `Note: ${entry.note}`
            ].filter(Boolean);
          }
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between font-[Poppins] bg-gradient-to-b from-[#fffaf5] to-[#f5e9dc]">
      <Navbar />
      
      <main className="flex-grow px-4 py-8 md:px-10 lg:px-20 xl:px-32">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-[#6F4F28]">Mood Tracker</h1>
          <p className="text-lg text-[#8D6E4E] max-w-3xl mx-auto">
            Track your emotional well-being and identify patterns over time
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 bg-[#f5e9dc] p-1 rounded-lg">
            <button
              onClick={() => setView("track")}
              className={`px-4 py-2 rounded-md transition-colors ${
                view === "track" ? "bg-white text-[#6F4F28] shadow-sm" : "text-[#8D6E4E] hover:bg-[#f0e0d0]"
              }`}
            >
              Track Mood
            </button>
            <button
              onClick={() => setView("history")}
              className={`px-4 py-2 rounded-md transition-colors ${
                view === "history" ? "bg-white text-[#6F4F28] shadow-sm" : "text-[#8D6E4E] hover:bg-[#f0e0d0]"
              }`}
            >
              View History
            </button>
          </div>
        </div>

        {view === "track" ? (
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
            <h2 className="text-2xl font-semibold text-[#6F4F28] mb-6 text-center">
              How are you feeling today?
            </h2>
            
            <div className="mb-6">
              <label className="block text-[#8D6E4E] mb-2 flex items-center">
                <FaCalendarAlt className="mr-2" />
                Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-2 border border-[#D1A68E] rounded-md focus:outline-none focus:ring-2 focus:ring-[#A47148]"
                max={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="mb-8">
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                {moods.map((mood) => (
                  <button
                    key={mood.id}
                    onClick={() => setSelectedMood(mood.id)}
                    className={`flex flex-col items-center p-3 rounded-lg transition-all ${
                      selectedMood === mood.id
                        ? `${mood.color} text-white transform scale-105 shadow-md`
                        : "bg-[#f9f5f0] text-[#6F4F28] hover:bg-[#f0e0d0]"
                    }`}
                  >
                    <span className="text-2xl mb-1">{mood.emoji}</span>
                    <span className="text-sm">{mood.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-[#8D6E4E] mb-2">
                Add a note (optional)
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="What's influencing your mood today?"
                className="w-full px-4 py-2 border border-[#D1A68E] rounded-md focus:outline-none focus:ring-2 focus:ring-[#A47148] min-h-[100px]"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={!selectedMood}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                selectedMood
                  ? "bg-[#A47148] hover:bg-[#8D6E4E] text-white"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              Record My Mood
            </button>

            {filteredMoods.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-medium text-[#6F4F28] mb-3">
                  Today's Mood Entries
                </h3>
                <div className="space-y-3">
                  {filteredMoods.map((entry) => (
                    <div
                      key={entry.id}
                      className="p-3 bg-[#f9f5f0] rounded-lg border-l-4 border-[#D1A68E]"
                    >
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">
                          {moods.find(m => m.id === entry.mood)?.emoji}
                        </span>
                        <div>
                          <p className="font-medium">
                            {moods.find(m => m.id === entry.mood)?.name}
                          </p>
                          {entry.note && (
                            <p className="text-sm text-[#8D6E4E]">{entry.note}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-8">
              <h2 className="text-2xl font-semibold text-[#6F4F28] mb-6 flex items-center">
                <FaChartLine className="mr-2" />
                Your Mood History
              </h2>
              
              <div className="h-64 mb-8">
                <Line data={chartData} options={chartOptions} />
              </div>

              {moodHistory.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#e8d9c9]">
                        <th className="text-left py-3 text-[#8D6E4E]">Date</th>
                        <th className="text-left py-3 text-[#8D6E4E]">Mood</th>
                        <th className="text-left py-3 text-[#8D6E4E]">Note</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...moodHistory].reverse().map((entry) => (
                        <tr key={entry.id} className="border-b border-[#e8d9c9] hover:bg-[#f9f5f0]">
                          <td className="py-3">{entry.date}</td>
                          <td className="py-3">
                            <div className="flex items-center">
                              <span className="text-xl mr-2">
                                {moods.find(m => m.id === entry.mood)?.emoji}
                              </span>
                              {moods.find(m => m.id === entry.mood)?.name}
                            </div>
                          </td>
                          <td className="py-3 text-[#8D6E4E]">{entry.note || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12 text-[#8D6E4E]">
                  <p className="text-lg">No mood entries yet.</p>
                  <button
                    onClick={() => setView("track")}
                    className="mt-4 px-6 py-2 bg-[#A47148] text-white rounded-lg hover:bg-[#8D6E4E] transition-colors"
                  >
                    Track Your First Mood
                  </button>
                </div>
              )}
            </div>

            <div className="bg-[#f5e9dc] rounded-xl p-6 text-center">
              <h3 className="text-xl font-medium text-[#6F4F28] mb-3">
                Mood Tracking Tips
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-[#6F4F28] text-left max-w-4xl mx-auto">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium mb-2">🌞 Track consistently</h4>
                  <p className="text-sm">Record your mood at the same time each day for more accurate patterns.</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium mb-2">📝 Add details</h4>
                  <p className="text-sm">Notes help identify triggers and positive influences.</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium mb-2">🔍 Review weekly</h4>
                  <p className="text-sm">Check your history to spot trends and improvement areas.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default MoodTracker;