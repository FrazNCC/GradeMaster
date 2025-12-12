import React, { useState } from 'react';
import { Unit, QualificationType, Subject, CalculationResult } from '../types';
import { getAIAdvice } from '../services/geminiService';
import { Sparkles, Loader2, MessageSquareQuote } from 'lucide-react';

interface AIAdvisorProps {
  subject: Subject;
  qualification: QualificationType;
  units: Unit[];
  results: CalculationResult;
}

const AIAdvisor: React.FC<AIAdvisorProps> = ({ subject, qualification, units, results }) => {
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    const result = await getAIAdvice(subject, qualification, units, results);
    setAdvice(result);
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl shadow-lg p-6 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl"></div>
      
      <div className="flex items-center justify-between mb-4 relative z-10">
        <h2 className="text-xl font-bold flex items-center">
          <Sparkles className="w-5 h-5 mr-2 text-yellow-300" />
          AI Academic Advisor
        </h2>
      </div>

      <p className="text-indigo-200 text-sm mb-6 relative z-10">
        Get personalized feedback on your grade profile, university recommendations, and improvement strategies powered by Google Gemini.
      </p>

      {!advice && !loading && (
        <button
          onClick={handleAnalyze}
          className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-lg transition-all flex items-center justify-center backdrop-blur-sm relative z-10"
        >
          Generate Report
        </button>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center py-8 space-y-3 text-indigo-200">
          <Loader2 className="w-8 h-8 animate-spin text-white" />
          <span className="text-sm animate-pulse">Analyzing unit grades...</span>
        </div>
      )}

      {advice && !loading && (
        <div className="bg-white/10 rounded-lg p-4 border border-white/10 text-sm text-indigo-50 max-h-96 overflow-y-auto custom-scrollbar relative z-10">
           <div className="whitespace-pre-wrap font-sans leading-relaxed">
             {advice}
           </div>
           <button 
             onClick={() => setAdvice(null)}
             className="mt-4 text-xs text-indigo-300 hover:text-white underline"
           >
             Clear & Analyze Again
           </button>
        </div>
      )}
      
      {/* Visual embellishment */}
      <div className="absolute bottom-4 right-4 text-white/5 transform rotate-12">
        <MessageSquareQuote size={80} />
      </div>
    </div>
  );
};

export default AIAdvisor;