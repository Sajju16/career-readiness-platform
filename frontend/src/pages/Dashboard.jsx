import TopAppBar from '../components/layout/TopAppBar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import careerGoalService from '../services/careerGoalService';
import resumeService from '../services/resumeService';
import analysisService from '../services/analysisService';
import roadmapService from '../services/roadmapService';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const firstName = user?.fullName?.split(' ')[0] || 'User';
  
  const [data, setData] = useState({
    careerGoal: null,
    resume: null,
    analysis: null,
    roadmap: null,
    isLoading: true
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [goalRes, resumeRes, analysisRes, roadmapRes] = await Promise.allSettled([
          careerGoalService.getGoal(),
          resumeService.getResume(),
          analysisService.getAnalysis(),
          roadmapService.getRoadmap()
        ]);

        setData({
          careerGoal: goalRes.status === 'fulfilled' ? goalRes.value : null,
          resume: resumeRes.status === 'fulfilled' ? resumeRes.value : null,
          analysis: analysisRes.status === 'fulfilled' ? analysisRes.value : null,
          roadmap: roadmapRes.status === 'fulfilled' ? roadmapRes.value : null,
          isLoading: false
        });
      } catch (err) {
        console.error("Error fetching dashboard data", err);
        setData(prev => ({ ...prev, isLoading: false }));
      }
    };
    fetchData();
  }, []);

  const { careerGoal, resume, analysis, roadmap, isLoading } = data;

  if (isLoading) {
    return (
      <>
        <TopAppBar title="Dashboard" />
        <div className="p-margin-desktop flex items-center justify-center h-[50vh]">
          <div className="flex flex-col items-center gap-4">
            <span className="material-symbols-outlined animate-spin text-primary text-[32px]">progress_activity</span>
            <p className="text-on-surface-variant">Loading your dashboard...</p>
          </div>
        </div>
      </>
    );
  }

  // Calculate metrics
  const learningProgress = analysis ? `${analysis.readinessScore || 0}% Completed` : '0% Completed';
  const skillsVerified = analysis ? `${analysis.matchedSkills?.length || 0} Core Skills` : '0 Core Skills';

  // Determine Subtitle & CTA based on Scenarios
  let subtitle = "";
  let primaryAction = { label: "", onClick: () => {}, icon: "" };

  if (analysis) {
    // Scenario 4
    subtitle = `Your profile has been analyzed for a ${careerGoal?.targetRole?.replace(/_/g, ' ') || 'selected'} role. Follow your recommended actions below.`;
    primaryAction = { label: "View Detailed Report", onClick: () => navigate('/report'), icon: "analytics" };
  } else if (resume && careerGoal) {
    // Scenario 3
    subtitle = "You have uploaded your resume and set a goal. Run an analysis to generate your learning roadmap.";
    primaryAction = { label: "Run Resume Analysis", onClick: () => navigate('/upload'), icon: "analytics" };
  } else if (careerGoal && !resume) {
    // Scenario 2
    subtitle = "You have set a career goal. Upload your resume to begin analysis.";
    primaryAction = { label: "Upload Resume", onClick: () => navigate('/upload'), icon: "upload_file" };
  } else {
    // Scenario 1
    subtitle = "Set a career goal and upload your resume to get a personalized readiness analysis and learning roadmap.";
    primaryAction = { label: "Set Career Goal", onClick: () => navigate('/profile'), icon: "flag" };
  }

  // Recommended Actions Logic
  const actionItems = [];

  if (analysis && roadmap?.phases?.length > 0) {
    // Show top 3 phases from the roadmap
    roadmap.phases.slice(0, 3).forEach((phase, index) => {
      actionItems.push({
        id: `phase-${index}`,
        title: phase.title,
        description: `Estimated ${phase.estimatedHours} hours to complete. ${phase.reason}`,
        icon: "menu_book",
        priority: phase.priority,
        priorityClass: phase.priority === "HIGH" ? "bg-error-container/20 text-error border-error/20" : "bg-primary/10 text-primary border-primary/20",
        onClick: () => navigate('/roadmap'),
        isDone: false
      });
    });
  } else if (analysis && roadmap?.phases?.length === 0) {
    // Analysis exists but no gaps
    actionItems.push({
      id: "no-gaps",
      title: "You are ready!",
      description: "You have matched all the core skills for this role. Consider applying or doing advanced projects.",
      icon: "task_alt",
      priority: "Done",
      priorityClass: "bg-surface-container text-on-surface-variant border-outline-variant",
      onClick: () => {},
      isDone: true
    });
  } else {
    // Scenario 1, 2, 3: Checklist style
    actionItems.push({
      id: "set-goal",
      title: "Set Career Goal",
      description: careerGoal ? `Target role: ${careerGoal.targetRole?.replace(/_/g, ' ') || 'Not Set'}` : "Select a target role and company.",
      icon: careerGoal ? "check_circle" : "flag",
      priority: careerGoal ? "Done" : "High Priority",
      priorityClass: careerGoal ? "bg-surface-container text-on-surface-variant border-outline-variant" : "bg-error-container/20 text-error border-error/20",
      onClick: () => navigate('/profile'),
      isDone: !!careerGoal
    });

    actionItems.push({
      id: "upload-resume",
      title: "Upload Resume",
      description: resume ? `Uploaded: ${resume.fileName}` : "Upload your latest resume in PDF format.",
      icon: resume ? "check_circle" : "upload_file",
      priority: resume ? "Done" : "High Priority",
      priorityClass: resume ? "bg-surface-container text-on-surface-variant border-outline-variant" : "bg-error-container/20 text-error border-error/20",
      onClick: () => navigate('/upload'),
      isDone: !!resume
    });

    actionItems.push({
      id: "run-analysis",
      title: "Run Resume Analysis",
      description: "Compare your resume to industry requirements.",
      icon: "analytics",
      priority: "Pending",
      priorityClass: "bg-primary/10 text-primary border-primary/20",
      onClick: () => navigate('/upload'),
      isDone: false
    });
  }

  return (
    <>
      <TopAppBar title="Dashboard" />
      <div className="p-margin-desktop max-w-container-max mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        <header className="mb-stack-lg">
          <h1 className="font-display-lg text-display-lg text-on-surface mb-2">Welcome back, {firstName}.</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Here is your career readiness overview.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-gutter">
          
          {/* Main Status Card */}
          <div className="md:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl p-8 relative overflow-hidden flex flex-col justify-center">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <span className="material-symbols-outlined text-[120px]">rocket_launch</span>
            </div>
            <div className="relative z-10">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-2 capitalize">
                {careerGoal ? `Career Goal: ${careerGoal.targetRole?.replace(/_/g, ' ') || 'Not Set'}` : "Career Goal: Not Set"}
              </h2>
              <p className="font-body-md text-on-surface-variant mb-6 max-w-lg">
                {subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={primaryAction.onClick}
                  className="bg-primary text-on-primary px-6 py-2.5 rounded-xl font-bold hover:bg-primary-container transition-colors shadow-lg shadow-primary/20 flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">{primaryAction.icon}</span>
                  {primaryAction.label}
                </button>
                {analysis && (
                  <button 
                    onClick={() => navigate('/upload')}
                    className="bg-surface-container text-on-surface px-6 py-2.5 rounded-xl font-bold border border-outline-variant hover:bg-surface-container-high transition-colors flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">upload_file</span>
                    Update Resume
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="md:col-span-4 flex flex-col gap-gutter">
            <div className="flex-1 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-container/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-[24px]">school</span>
              </div>
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Learning Path</p>
                <p className="font-headline-md text-headline-md text-on-surface">{learningProgress}</p>
              </div>
            </div>
            <div className="flex-1 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary-container/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary text-[24px]">psychology</span>
              </div>
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Skills Verified</p>
                <p className="font-headline-md text-headline-md text-on-surface">{skillsVerified}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Action Items */}
        <h3 className="font-headline-md text-headline-md text-on-surface mb-6 mt-12">Recommended Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {actionItems.map(item => (
            <div 
              key={item.id}
              onClick={item.onClick}
              className={`p-6 bg-surface-container-lowest border border-outline-variant rounded-xl transition-all group ${item.isDone ? 'opacity-70' : 'cursor-pointer hover:border-primary hover:shadow-lg'}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center ${!item.isDone ? 'group-hover:bg-primary/10 transition-colors' : ''}`}>
                  <span className={`material-symbols-outlined text-on-surface-variant ${!item.isDone ? 'group-hover:text-primary' : ''}`}>{item.icon}</span>
                </div>
                <span className={`px-2 py-1 text-[10px] font-bold rounded uppercase tracking-wider border ${item.priorityClass}`}>
                  {item.priority}
                </span>
              </div>
              <h4 className={`font-label-md text-label-md text-on-surface mb-2 ${item.isDone ? 'line-through' : 'group-hover:text-primary transition-colors'}`}>
                {item.title}
              </h4>
              <p className="font-body-sm text-on-surface-variant line-clamp-2">{item.description}</p>
            </div>
          ))}
        </div>

      </div>
    </>
  );
};

export default Dashboard;
