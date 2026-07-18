import TopAppBar from '../components/layout/TopAppBar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import careerGoalService from '../services/careerGoalService';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const firstName = user?.fullName?.split(' ')[0] || 'User';
  const [careerGoal, setCareerGoal] = useState(null);

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const goal = await careerGoalService.getGoal();
        setCareerGoal(goal);
      } catch (err) {
        console.error("Error fetching career goal on dashboard", err);
      }
    };
    fetchGoal();
  }, []);

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
              <h2 className="font-headline-md text-headline-md text-on-surface mb-2">
                {careerGoal ? `Career Goal: ${careerGoal.targetRole.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}` : "Career Goal: Not Set"}
              </h2>
              <p className="font-body-md text-on-surface-variant mb-6 max-w-lg">
                {careerGoal 
                  ? `Your profile is being analyzed for a ${careerGoal.targetRole.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} role.`
                  : "Set a career goal to get a personalized readiness analysis and learning roadmap."}
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => navigate('/report')}
                  className="bg-primary text-on-primary px-6 py-2.5 rounded-xl font-bold hover:bg-primary-container transition-colors shadow-lg shadow-primary/20 flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">analytics</span>
                  View Detailed Report
                </button>
                <button 
                  onClick={() => navigate('/upload')}
                  className="bg-surface-container text-on-surface px-6 py-2.5 rounded-xl font-bold border border-outline-variant hover:bg-surface-container-high transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">upload_file</span>
                  Update Resume
                </button>
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
                <p className="font-headline-md text-headline-md text-on-surface">45% Completed</p>
              </div>
            </div>
            <div className="flex-1 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary-container/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary text-[24px]">psychology</span>
              </div>
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Skills Verified</p>
                <p className="font-headline-md text-headline-md text-on-surface">12 Core Skills</p>
              </div>
            </div>
          </div>

        </div>

        {/* Action Items */}
        <h3 className="font-headline-md text-headline-md text-on-surface mb-6 mt-12">Recommended Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          <div 
            onClick={() => navigate('/roadmap')}
            className="p-6 bg-surface-container-lowest border border-outline-variant rounded-xl cursor-pointer hover:border-primary hover:shadow-lg transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary">menu_book</span>
              </div>
              <span className="px-2 py-1 bg-error-container/20 text-error text-[10px] font-bold rounded uppercase tracking-wider border border-error/20">High Priority</span>
            </div>
            <h4 className="font-label-md text-label-md text-on-surface mb-2 group-hover:text-primary transition-colors">Start Apache Spark Module</h4>
            <p className="font-body-sm text-on-surface-variant">Estimated 4 hours to complete. This is a critical gap for your target role.</p>
          </div>

          <div 
            onClick={() => navigate('/profile')}
            className="p-6 bg-surface-container-lowest border border-outline-variant rounded-xl cursor-pointer hover:border-primary hover:shadow-lg transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary">person_add</span>
              </div>
              <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase tracking-wider border border-primary/20">Medium</span>
            </div>
            <h4 className="font-label-md text-label-md text-on-surface mb-2 group-hover:text-primary transition-colors">Complete Profile Details</h4>
            <p className="font-body-sm text-on-surface-variant">Add your LinkedIn URL and missing project details for a better analysis.</p>
          </div>

          <div className="p-6 bg-surface-container-lowest border border-outline-variant rounded-xl hover:shadow-lg transition-all opacity-70">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center">
                <span className="material-symbols-outlined text-on-surface-variant">check_circle</span>
              </div>
              <span className="px-2 py-1 bg-surface-container text-on-surface-variant text-[10px] font-bold rounded uppercase tracking-wider">Done</span>
            </div>
            <h4 className="font-label-md text-label-md text-on-surface mb-2 line-through">Set Career Goal</h4>
            <p className="font-body-sm text-on-surface-variant">Target role: Data Scientist. Saved on Oct 15.</p>
          </div>
        </div>

      </div>
    </>
  );
};

export default Dashboard;
