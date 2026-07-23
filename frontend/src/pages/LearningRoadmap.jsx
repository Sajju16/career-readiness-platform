import TopAppBar from '../components/layout/TopAppBar';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import roadmapService from '../services/roadmapService';

// Priority badge colours
const PRIORITY_STYLES = {
  HIGH:   { badge: 'bg-red-50 text-red-700 border border-red-200',   dot: 'bg-red-500',    label: 'High Priority' },
  MEDIUM: { badge: 'bg-yellow-50 text-yellow-700 border border-yellow-200', dot: 'bg-yellow-500', label: 'Medium Priority' },
  LOW:    { badge: 'bg-blue-50 text-blue-700 border border-blue-200', dot: 'bg-blue-500',   label: 'Low Priority' },
};

// Resource type icons
const RESOURCE_ICON = {
  COURSE:   'school',
  VIDEO:    'play_circle',
  BOOK:     'menu_book',
  PRACTICE: 'code',
};

const LearningRoadmap = () => {
  const navigate = useNavigate();
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [expandedPhase, setExpandedPhase] = useState(0); // first phase open by default

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const data = await roadmapService.getRoadmap();
        setRoadmap(data);
        setError(null);
      } catch (err) {
        // 400 means no roadmap yet — show the generate button, not an error
        if (err.response?.status === 400) {
          setRoadmap(null);
          setError(null);
        } else {
          setError('Failed to load roadmap. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchRoadmap();
  }, []);

  const handleGenerate = async () => {
    setGenerating(true);
    setError(null);
    try {
      const data = await roadmapService.generateRoadmap();
      setRoadmap(data);
      setExpandedPhase(0);
    } catch (err) {
      const msg = err.response?.data || 'Failed to generate roadmap.';
      setError(msg);
    } finally {
      setGenerating(false);
    }
  };

  const togglePhase = (idx) => setExpandedPhase(expandedPhase === idx ? null : idx);

  // ---------- Loading ----------
  if (loading) {
    return (
      <>
        <TopAppBar title="Learning Roadmap" />
        <div className="flex items-center justify-center h-64">
          <span className="material-symbols-outlined animate-spin text-primary text-5xl">sync</span>
        </div>
      </>
    );
  }

  // ---------- No roadmap yet ----------
  if (!roadmap) {
    return (
      <>
        <TopAppBar title="Learning Roadmap" />
        <div className="p-margin-desktop max-w-container-max mx-auto">
          {error && (
            <div className="mb-6 p-4 bg-error-container text-on-error-container rounded-xl border border-error/20 flex items-center gap-3">
              <span className="material-symbols-outlined">error</span>
              {error}
            </div>
          )}
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-[48px] text-primary">route</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-3">
              Your Roadmap is Ready to Build
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md mb-8">
              Based on your resume analysis and skill gaps, we will generate a personalized
              week-by-week learning plan with curated resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleGenerate}
                disabled={generating}
                className="flex items-center gap-2 px-8 py-3 bg-primary text-on-primary font-bold rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {generating ? (
                  <span className="material-symbols-outlined animate-spin">refresh</span>
                ) : (
                  <span className="material-symbols-outlined">auto_awesome</span>
                )}
                {generating ? 'Generating...' : 'Generate My Roadmap'}
              </button>
              <button
                onClick={() => navigate('/report')}
                className="flex items-center gap-2 px-6 py-3 border border-outline text-on-surface font-bold rounded-xl hover:bg-surface-container transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">analytics</span>
                View Analysis First
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ---------- No skill gaps ----------
  if (roadmap.phases?.length === 0) {
    return (
      <>
        <TopAppBar title="Learning Roadmap" />
        <div className="p-margin-desktop max-w-container-max mx-auto">
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-[48px] text-green-600">check_circle</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-3">
              No Skill Gaps Found!
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
              {roadmap.message || 'Your resume already covers all required skills for your target role.'}
            </p>
          </div>
        </div>
      </>
    );
  }

  const phases = roadmap.phases ?? [];

  // ---------- Roadmap timeline ----------
  return (
    <>
      <TopAppBar title="Learning Roadmap" />
      <div className="p-margin-desktop max-w-container-max mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">

        {/* Header */}
        <header className="mb-stack-lg flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-display-lg text-display-lg text-on-surface mb-2">
              Your Path to {roadmap.targetRole}
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Analyzed against: <span className="font-semibold text-on-surface">{roadmap.requirementSource}</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="bg-surface-container-low px-4 py-2 rounded-xl border border-outline-variant inline-flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">calendar_month</span>
              <div>
                <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Duration</p>
                <p className="font-label-md text-on-surface">{roadmap.totalWeeks} Weeks</p>
              </div>
            </div>
            <div className="bg-surface-container-low px-4 py-2 rounded-xl border border-outline-variant inline-flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary">schedule</span>
              <div>
                <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Est. Hours</p>
                <p className="font-label-md text-on-surface">{roadmap.estimatedTotalHours}h total</p>
              </div>
            </div>
            <div className="bg-surface-container-low px-4 py-2 rounded-xl border border-outline-variant inline-flex items-center gap-3">
              <span className="material-symbols-outlined text-tertiary">layers</span>
              <div>
                <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Phases</p>
                <p className="font-label-md text-on-surface">{roadmap.totalPhases} Modules</p>
              </div>
            </div>
          </div>
        </header>

        {/* Re-generate button */}
        <div className="mb-gutter flex justify-end">
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="flex items-center gap-2 px-4 py-2 border border-outline text-on-surface-variant font-label-sm rounded-lg hover:bg-surface-container transition-colors disabled:opacity-50 text-sm"
          >
            {generating
              ? <span className="material-symbols-outlined animate-spin text-[16px]">refresh</span>
              : <span className="material-symbols-outlined text-[16px]">refresh</span>
            }
            {generating ? 'Regenerating...' : 'Regenerate'}
          </button>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-[23px] top-8 bottom-8 w-0.5 bg-outline-variant/40 hidden md:block"></div>

          <div className="space-y-6">
            {phases.map((phase, idx) => {
              const isOpen = expandedPhase === idx;
              const pStyle = PRIORITY_STYLES[phase.priority] ?? PRIORITY_STYLES.MEDIUM;

              return (
                <div key={idx} className="relative flex gap-6">
                  {/* Timeline dot */}
                  <div
                    className={`hidden md:flex w-12 h-12 rounded-full items-center justify-center relative z-10 shrink-0 text-white font-bold text-sm border-2
                      ${phase.priority === 'HIGH'
                        ? 'bg-primary border-primary shadow-lg shadow-primary/20'
                        : phase.priority === 'MEDIUM'
                        ? 'bg-secondary border-secondary'
                        : 'bg-surface-container border-outline-variant text-on-surface-variant'}`}
                  >
                    {phase.phaseNumber}
                  </div>

                  {/* Phase card */}
                  <div className="flex-1 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">

                    {/* Card header — always visible, clickable */}
                    <button
                      onClick={() => togglePhase(idx)}
                      className="w-full text-left p-6 hover:bg-surface-container/30 transition-colors"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="font-headline-md text-headline-md text-on-surface">
                              {phase.title}
                            </span>
                            <span className={`px-3 py-1 rounded-full font-label-sm text-label-sm ${pStyle.badge}`}>
                              {pStyle.label}
                            </span>
                          </div>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">
                            {phase.weekRange} · {phase.estimatedHours}h
                          </p>
                        </div>
                        <span className={`material-symbols-outlined text-on-surface-variant transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                          expand_more
                        </span>
                      </div>
                    </button>

                    {/* Expandable content */}
                    {isOpen && (
                      <div className="border-t border-outline-variant px-6 pb-6 pt-4 space-y-6">

                        {/* Why this skill */}
                        <div className="p-4 bg-primary/5 rounded-lg border-l-4 border-primary">
                          <p className="font-label-sm text-label-sm text-primary uppercase tracking-wider mb-1">Why This?</p>
                          <p className="font-body-md text-body-md text-on-surface">{phase.reason}</p>
                        </div>

                        {/* Learning objectives */}
                        <div>
                          <h4 className="font-label-lg text-label-lg text-on-surface mb-3 flex items-center gap-2">
                            <span className="material-symbols-outlined text-secondary text-[20px]">checklist</span>
                            Learning Objectives
                          </h4>
                          <ul className="space-y-2">
                            {(phase.learningObjectives ?? []).map((obj, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-green-600 text-[18px] shrink-0 mt-0.5">
                                  check_circle
                                </span>
                                <span className="font-body-md text-body-md text-on-surface-variant">{obj}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Resources */}
                        <div>
                          <h4 className="font-label-lg text-label-lg text-on-surface mb-3 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-[20px]">library_books</span>
                            Curated Resources
                          </h4>
                          <div className="space-y-3">
                            {(phase.resources ?? []).map((res, i) => (
                              <a
                                key={i}
                                href={res.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 border border-outline-variant rounded-lg hover:border-primary hover:bg-primary/5 transition-all group"
                              >
                                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary text-[24px] shrink-0">
                                  {RESOURCE_ICON[res.type] ?? 'open_in_new'}
                                </span>
                                <div className="flex-1 min-w-0">
                                  <p className="font-label-md text-on-surface truncate">{res.title}</p>
                                  <p className="font-body-sm text-on-surface-variant text-[12px]">{res.type}</p>
                                </div>
                                <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-transform group-hover:translate-x-1">
                                  arrow_forward
                                </span>
                              </a>
                            ))}
                          </div>
                        </div>

                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-gutter p-8 bg-surface-container-lowest border border-outline-variant rounded-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-headline-md text-headline-md text-on-surface">Track your progress</h4>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Complete each module and re-run your analysis to watch your readiness score improve.
            </p>
          </div>
          <button
            onClick={() => navigate('/report')}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-on-primary font-bold rounded-xl hover:bg-primary/90 transition-colors whitespace-nowrap"
          >
            <span className="material-symbols-outlined">analytics</span>
            View Analysis
          </button>
        </div>

      </div>
    </>
  );
};

export default LearningRoadmap;
