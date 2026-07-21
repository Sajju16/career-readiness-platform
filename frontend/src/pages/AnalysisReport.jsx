import TopAppBar from '../components/layout/TopAppBar';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import analysisService from '../services/analysisService';
import careerGoalService from '../services/careerGoalService';

const AnalysisReport = () => {
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState(null);
  const [careerGoal, setCareerGoal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [an, goal] = await Promise.all([
          analysisService.getAnalysis().catch(() => null),
          careerGoalService.getGoal().catch(() => null),
        ]);
        setAnalysis(an);
        setCareerGoal(goal);
      } catch (err) {
        setError('Failed to load analysis data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const readinessScore = analysis?.readinessScore ?? 0;
  const extractedSkills = analysis?.extractedSkills ?? [];
  const matchedSkills = analysis?.matchedSkills ?? [];
  const missingSkills = analysis?.missingSkills ?? [];
  const recommendations = analysis?.recommendations ?? [];
  const requirementSource = analysis?.requirementSource ?? null;
  const skillGap = 100 - readinessScore;

  const targetRoleDisplay = careerGoal?.targetRole
    ? careerGoal.targetRole.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    : 'Not Set';

  const strokeDashoffset = 440 - (440 * readinessScore) / 100;

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  if (loading) {
    return (
      <>
        <TopAppBar title="Analysis Report" />
        <div className="flex items-center justify-center h-64">
          <span className="material-symbols-outlined animate-spin text-primary text-5xl">sync</span>
        </div>
      </>
    );
  }

  if (!analysis) {
    return (
      <>
        <TopAppBar title="Analysis Report" />
        <div className="p-margin-desktop max-w-container-max mx-auto text-center py-24">
          <span className="material-symbols-outlined text-[64px] text-on-surface-variant mb-4 block">analytics</span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-3">No Analysis Found</h2>
          <p className="text-on-surface-variant font-body-md mb-8">
            Upload your resume and run an analysis from your Profile page to see results here.
          </p>
          <button
            onClick={() => navigate('/profile')}
            className="px-8 py-3 bg-primary text-on-primary font-bold rounded-xl hover:bg-primary/90 transition-colors"
          >
            Go to Profile
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <TopAppBar title="Analysis Report" />
      <div className="p-margin-desktop max-w-container-max mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">

        {/* Header Context Strip */}
        <div className="mb-gutter space-y-2">
          <div className="flex flex-wrap gap-6 items-center">
            <div className="flex flex-col">
              <span className="text-label-sm text-on-surface-variant uppercase tracking-wider">Target Role</span>
              <span className="text-headline-sm font-bold text-primary">{targetRoleDisplay}</span>
            </div>
            {careerGoal?.preferredCompany && (
              <>
                <div className="w-px h-8 bg-outline-variant/30 hidden md:block"></div>
                <div className="flex flex-col">
                  <span className="text-label-sm text-on-surface-variant uppercase tracking-wider">Preferred Company</span>
                  <span className="text-headline-sm font-bold text-primary">{careerGoal.preferredCompany}</span>
                </div>
              </>
            )}
            <div className="w-px h-8 bg-outline-variant/30 hidden md:block"></div>
            <div className="flex flex-col">
              <span className="text-label-sm text-on-surface-variant uppercase tracking-wider">Resume Match</span>
              <span className={`text-headline-sm font-bold ${getScoreColor(readinessScore)}`}>{readinessScore}%</span>
            </div>
          </div>
          {requirementSource && (
            <p className="text-body-sm text-on-surface-variant italic">
              Analyzed against: <span className="font-semibold text-on-surface">{requirementSource}</span>
            </p>
          )}
        </div>

        {/* Hero Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-gutter">
          <div className="md:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl p-8 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 ai-glow">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <span className="material-symbols-outlined text-[120px]">auto_graph</span>
            </div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full transform -rotate-90">
                  <circle className="text-surface-container" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" strokeWidth="12"></circle>
                  <circle
                    className={`transition-all duration-1000 ease-in-out ${getScoreColor(readinessScore)}`}
                    cx="80" cy="80" fill="transparent" r="70"
                    stroke="currentColor"
                    strokeDasharray="440"
                    strokeDashoffset={strokeDashoffset}
                    strokeWidth="12"
                  ></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`font-display-lg text-display-lg ${getScoreColor(readinessScore)}`}>{readinessScore}%</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Readiness</span>
                </div>
              </div>
            </div>
            <div className="flex-1 text-center md:text-left space-y-2">
              <h3 className="font-headline-lg text-headline-lg text-on-surface">
                Precision Report: {targetRoleDisplay}
              </h3>
              <p className="text-on-surface-variant font-body-lg text-body-lg">
                {readinessScore >= 80
                  ? 'Your resume shows a strong alignment with the target role.'
                  : readinessScore >= 50
                    ? 'Your resume shows moderate alignment. A few key skills will close the gap.'
                    : 'Your resume needs significant improvement to match the target role.'}
              </p>
              {requirementSource && (
                <p className="text-body-sm text-on-surface-variant/70">
                  Profile: <span className="font-semibold text-on-surface">{requirementSource}</span>
                </p>
              )}
              <div className="flex flex-wrap gap-2 pt-4 justify-center md:justify-start">
                <span className={`px-4 py-1.5 rounded-full font-label-md text-label-md flex items-center gap-2 ${readinessScore >= 80 ? 'bg-green-100 text-green-800' : readinessScore >= 50 ? 'bg-yellow-50 text-yellow-800' : 'bg-red-50 text-red-700'}`}>
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {readinessScore >= 80 ? 'check_circle' : readinessScore >= 50 ? 'info' : 'warning'}
                  </span>
                  {readinessScore >= 80 ? 'High Match' : readinessScore >= 50 ? 'Moderate Match' : 'Low Match'}
                </span>
                <span className="px-4 py-1.5 bg-secondary-fixed text-on-secondary-fixed rounded-full font-label-md text-label-md flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">verified</span> AI-VERIFIED
                </span>
              </div>
            </div>
          </div>

          {/* Skill Gap Card */}
          <div className="md:col-span-4 bg-surface-container-lowest border border-outline-variant rounded-xl p-8 flex flex-col justify-between">
            <div>
              <h4 className="font-headline-md text-headline-md text-on-surface mb-2">Skill Gap</h4>
              <p className="text-on-surface-variant font-body-sm text-body-sm mb-6">
                Percentage of required skills missing from your current profile.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="font-display-lg text-display-lg text-secondary">{skillGap}%</span>
                <span className="text-on-surface-variant font-label-md text-label-md mb-2">Missing</span>
              </div>
              <div className="h-4 bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-secondary skill-bar-animate rounded-full" style={{ width: `${skillGap}%` }}></div>
              </div>
              <p className="text-on-surface-variant font-body-sm text-body-sm italic">
                {missingSkills.length > 0
                  ? `${missingSkills.length} skill${missingSkills.length > 1 ? 's' : ''} needed to reach 100% alignment.`
                  : 'All required skills matched!'}
              </p>
            </div>
          </div>
        </div>

        {/* Bento Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
          {/* Matched Skills */}
          <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-lg">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-headline-md text-headline-md flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">psychology</span>
                Matched Skills
              </h4>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                {matchedSkills.length} / {matchedSkills.length + missingSkills.length} required
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              {matchedSkills.length > 0 ? (
                matchedSkills.map((skill, idx) => (
                  <div key={idx} className="px-4 py-2 bg-green-50 border border-green-200 rounded-lg font-label-md text-green-800 flex items-center gap-2">
                    {skill} <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  </div>
                ))
              ) : (
                <p className="text-on-surface-variant font-body-sm">No required skills matched in your resume.</p>
              )}
            </div>

            {/* All Extracted Skills */}
            {extractedSkills.length > 0 && (
              <div className="mt-8 pt-6 border-t border-outline-variant">
                <h5 className="font-label-md text-label-md text-on-surface-variant uppercase mb-4">
                  All Extracted Skills ({extractedSkills.length} found)
                </h5>
                <div className="flex flex-wrap gap-2">
                  {extractedSkills.map((skill, idx) => (
                    <div key={idx} className="px-3 py-1.5 bg-surface-container border border-outline-variant/30 rounded-lg font-label-md text-on-surface text-sm">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Missing Skills & Recommendations */}
          <div className="space-y-gutter">
            {/* Missing Skills */}
            <div className="bg-surface-container-highest border border-outline-variant rounded-xl p-stack-lg">
              <h4 className="font-headline-md text-headline-md text-on-surface mb-4">Missing Skills</h4>
              {requirementSource && (
                <p className="text-on-surface-variant font-body-sm mb-4">
                  Required for <span className="font-bold text-on-surface">{requirementSource}</span>
                </p>
              )}
              <div className="space-y-3">
                {missingSkills.length > 0 ? (
                  missingSkills.map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-error-container/20 border border-error/20 rounded-lg">
                      <span className="material-symbols-outlined text-error text-[20px]">warning</span>
                      <span className="font-label-md text-on-surface">{skill}</span>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <span className="material-symbols-outlined text-green-600 text-[20px]">check_circle</span>
                    <span className="font-label-md text-green-800">All required skills matched!</span>
                  </div>
                )}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
              <div className="bg-primary/5 p-4 border-b border-outline-variant">
                <h4 className="font-label-md text-label-md text-primary uppercase">AI Recommendations</h4>
              </div>
              <div className="p-stack-md space-y-3">
                {recommendations.length > 0 ? (
                  recommendations.map((rec, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-body-sm">
                      <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">arrow_right</span>
                      <span className="text-on-surface-variant">{rec}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-on-surface-variant font-body-sm">Run analysis to see recommendations.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Learning Roadmap CTA */}
        {missingSkills.length > 0 && (
          <div className="mt-gutter p-8 bg-gradient-to-r from-secondary-container to-secondary rounded-xl text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-secondary/20">
            <div className="flex items-center gap-6">
              <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md">
                <span className="material-symbols-outlined text-[48px]">school</span>
              </div>
              <div>
                <h4 className="font-headline-md text-headline-md">
                  Close your {skillGap}% gap.
                </h4>
                <p className="opacity-90 font-body-md">
                  {missingSkills.slice(0, 2).join(' & ')} {missingSkills.length > 2 ? `and ${missingSkills.length - 2} more` : ''} are your priority skills.
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('/roadmap')}
              className="bg-white text-secondary px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-all flex items-center gap-2 whitespace-nowrap"
            >
              View My Path <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default AnalysisReport;
