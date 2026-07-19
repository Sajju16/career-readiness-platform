import TopAppBar from '../components/layout/TopAppBar';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import careerGoalService from '../services/careerGoalService';
import resumeService from '../services/resumeService';
import analysisService from '../services/analysisService';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const userName = user?.fullName || 'Complete your profile';
  const userEmail = user?.email || 'No email provided';
  const [careerGoal, setCareerGoal] = useState(null);
  const [resume, setResume] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [goal, res, an] = await Promise.all([
          careerGoalService.getGoal().catch(() => null),
          resumeService.getResume().catch(() => null),
          analysisService.getAnalysis().catch(() => null)
        ]);
        setCareerGoal(goal);
        setResume(res);
        setAnalysis(an);
      } catch (err) {
        console.error("Error fetching data on profile", err);
      }
    };
    fetchData();
  }, []);

  const handleRunAnalysis = async () => {
    setAnalyzing(true);
    setError('');
    try {
      const result = await analysisService.analyzeResume();
      setAnalysis(result);
    } catch (err) {
      setError(err.response?.data || 'Failed to analyze resume. Please ensure you have uploaded a resume and set a career goal.');
    } finally {
      setAnalyzing(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return ['#22c55e', '#16a34a']; // Green
    if (score >= 50) return ['#eab308', '#ca8a04']; // Yellow
    return ['#ef4444', '#dc2626']; // Red
  };

  const readinessScore = analysis?.readinessScore ?? 0;
  const extractedSkills = analysis?.extractedSkills ?? [];
  const missingSkills = analysis?.missingSkills ?? [];
  const recommendations = analysis?.recommendations ?? [];
  const scoreColors = analysis ? getScoreColor(readinessScore) : ['#e5e7eb', '#d1d5db'];

  return (
    <>
      <TopAppBar title="Student Profile" />
      <div className="max-w-container-max mx-auto px-margin-desktop mt-stack-lg pb-10">
        
        {error && (
          <div className="mb-6 p-4 bg-error-container text-on-error-container rounded-lg border border-error/20 flex items-center gap-3">
            <span className="material-symbols-outlined">error</span>
            {error}
          </div>
        )}

        {/* Bento Profile Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="md:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl p-8 flex flex-col md:flex-row items-center md:items-start gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <span className="px-3 py-1 bg-primary-container/10 text-primary font-bold text-label-sm rounded-full border border-primary/20">
                {analysis ? 'AI-VERIFIED' : 'UNVERIFIED'}
              </span>
            </div>
            <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-surface shadow-sm shrink-0 flex items-center justify-center bg-primary/10">
              <span className="material-symbols-outlined text-[64px] text-primary">person</span>
            </div>
            <div className="text-center md:text-left flex-grow">
              <h3 className="font-display-lg text-display-lg text-on-surface mb-1">{userName}</h3>
              <p className="font-headline-md text-headline-md text-primary font-semibold mb-4">
                {careerGoal ? `${careerGoal.targetRole.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} Aspirant` : "Career Goal Not Set"}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container rounded-lg text-on-surface-variant font-label-md text-label-md">
                  <span className="material-symbols-outlined text-[18px]">mail</span>
                  {userEmail}
                </span>
              </div>
            </div>
          </div>
          
          {/* Readiness Gauge */}
          <div className="md:col-span-4 bg-surface-container-lowest border border-outline-variant rounded-xl p-8 flex flex-col items-center justify-center text-center">
            <h4 className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant mb-6">Career Readiness</h4>
            
            {analysis ? (
              <>
                <div className="relative w-32 h-32 flex items-center justify-center mb-4">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle className="text-surface-container-high" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeWidth="10"></circle>
                    <circle 
                      cx="64" cy="64" fill="transparent" r="58" stroke="url(#gradient)" 
                      strokeDasharray="364.4" 
                      strokeDashoffset={364.4 - (364.4 * readinessScore) / 100} 
                      strokeLinecap="round" strokeWidth="12"
                      className="transition-all duration-1000 ease-out"
                    ></circle>
                    <defs>
                      <linearGradient id="gradient" x1="0%" x2="100%" y1="0%" y2="0%">
                        <stop offset="0%" style={{ stopColor: scoreColors[0] }}></stop>
                        <stop offset="100%" style={{ stopColor: scoreColors[1] }}></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="absolute font-display-lg text-display-lg" style={{ color: scoreColors[1] }}>{readinessScore}</span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant">Role Alignment Score</p>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-32 w-full">
                <button 
                  onClick={handleRunAnalysis} 
                  disabled={analyzing || !resume || !careerGoal}
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-on-primary font-bold rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
                >
                  {analyzing ? (
                    <span className="material-symbols-outlined animate-spin">refresh</span>
                  ) : (
                    <span className="material-symbols-outlined">analytics</span>
                  )}
                  {analyzing ? 'Analyzing...' : 'Run Analysis'}
                </button>
                {(!resume || !careerGoal) && (
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-4 text-center">
                    Upload resume and set career goal first
                  </p>
                )}
              </div>
            )}
          </div>

          {/* AI Gap Analysis Section */}
          {analysis && (
            <div className="md:col-span-12 bg-surface-container-lowest border border-outline-variant rounded-xl p-8 mt-4">
              <div className="flex items-center gap-3 mb-8">
                <span className="material-symbols-outlined text-primary text-[28px]">psychology</span>
                <h4 className="font-headline-lg text-headline-lg">AI Gap Analysis</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h5 className="font-label-lg text-label-lg text-on-surface mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-green-600">check_circle</span>
                    Matched Skills
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {analysis.extractedSkills && analysis.extractedSkills.length > 0 ? (
                      analysis.extractedSkills.map((skill, idx) => (
                        <span key={idx} className="px-3 py-1.5 bg-green-100 text-green-800 font-label-md rounded-lg border border-green-200">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="text-on-surface-variant text-body-md">No technical skills detected.</p>
                    )}
                  </div>
                </div>

                <div>
                  <h5 className="font-label-lg text-label-lg text-on-surface mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-red-500">warning</span>
                    Missing Skills
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {analysis.missingSkills && analysis.missingSkills.length > 0 ? (
                      analysis.missingSkills.map((skill, idx) => (
                        <span key={idx} className="px-3 py-1.5 bg-red-50 text-red-700 font-label-md rounded-lg border border-red-200">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="text-on-surface-variant text-body-md">All required skills matched!</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-outline-variant">
                <h5 className="font-label-lg text-label-lg text-on-surface mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary">lightbulb</span>
                  Recommendations
                </h5>
                <ul className="space-y-3">
                  {(analysis.recommendations || []).map((rec, idx) => (
                    <li key={idx} className="flex gap-3 text-on-surface-variant text-body-md">
                      <span className="material-symbols-outlined text-primary text-[20px] shrink-0">arrow_right</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Career Goal */}
          <div className="md:col-span-12 bg-surface-container-lowest border border-outline-variant rounded-xl p-8 flex flex-col md:flex-row justify-between items-center gap-6 mt-4">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary text-[32px]">target</span>
              </div>
              <div className="space-y-1">
                <h4 className="font-headline-md text-headline-md">Career Goal</h4>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    <span className="font-bold text-on-surface">Preferred Role:</span> {careerGoal ? careerGoal.targetRole.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Not Set'}
                  </p>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    <span className="font-bold text-on-surface">Preferred Company:</span> {careerGoal?.preferredCompany || 'Any'}
                  </p>
                </div>
              </div>
            </div>
            <button onClick={() => navigate('/goal')} className="flex items-center gap-2 px-6 py-2 border border-outline text-on-surface font-bold text-label-md rounded-lg hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">edit</span>
              Edit
            </button>
          </div>
          
          {/* Resume History */}
          <div className="md:col-span-12 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden mt-4">
            <div className="p-stack-lg border-b border-outline-variant flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">history</span>
                <h4 className="font-headline-md text-headline-md">Resume Status</h4>
              </div>
              <button onClick={() => navigate('/upload')} className="flex items-center gap-2 px-4 py-2 border border-primary text-primary font-bold text-label-md rounded-lg hover:bg-primary/5 transition-colors">
                <span className="material-symbols-outlined text-[18px]">add</span>
                Upload New Version
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-surface-container-low">
                  <tr>
                    <th className="px-8 py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Date</th>
                    <th className="px-8 py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">File Name</th>
                    <th className="px-8 py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-center">Status</th>
                    <th className="px-8 py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {resume ? (
                    <tr className="hover:bg-surface transition-colors">
                      <td className="px-8 py-4 font-body-sm text-body-sm">{new Date(resume.uploadedAt).toLocaleDateString()}</td>
                      <td className="px-8 py-4 flex items-center gap-3">
                        <span className="material-symbols-outlined text-error">picture_as_pdf</span>
                        <span className="font-label-md text-label-md">{resume.fileName}</span>
                      </td>
                      <td className="px-8 py-4 text-center">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 font-bold text-[12px] rounded-full">
                          Uploaded
                        </span>
                      </td>
                      <td className="px-8 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => window.open(resume.fileUrl, '_blank')} className="p-2 hover:bg-surface-container-high rounded-full transition-colors text-on-surface-variant" title="Download">
                            <span className="material-symbols-outlined text-[20px]">download</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-8 py-8 text-center text-on-surface-variant font-body-md">
                        No resume uploaded yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Profile;
