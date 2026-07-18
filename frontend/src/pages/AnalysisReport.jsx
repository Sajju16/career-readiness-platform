import TopAppBar from '../components/layout/TopAppBar';
import { useNavigate } from 'react-router-dom';

const AnalysisReport = () => {
  const navigate = useNavigate();

  return (
    <>
      <TopAppBar title="Analysis Report" />
      <div className="p-margin-desktop max-w-container-max mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        <div className="mb-gutter space-y-2">
          <div className="flex flex-wrap gap-6 items-center">
            <div className="flex flex-col">
              <span className="text-label-sm text-on-surface-variant uppercase tracking-wider">Target Role</span>
              <span className="text-headline-sm font-bold text-primary">Data Scientist</span>
            </div>
            <div className="w-px h-8 bg-outline-variant/30 hidden md:block"></div>
            <div className="flex flex-col">
              <span className="text-label-sm text-on-surface-variant uppercase tracking-wider">Preferred Company</span>
              <span className="text-headline-sm font-bold text-primary">Google</span>
            </div>
            <div className="w-px h-8 bg-outline-variant/30 hidden md:block"></div>
            <div className="flex flex-col">
              <span className="text-label-sm text-on-surface-variant uppercase tracking-wider">Resume Match</span>
              <span className="text-headline-sm font-bold text-secondary">84%</span>
            </div>
          </div>
          <p className="text-body-sm text-on-surface-variant italic">This analysis compares your resume against the selected target role and company requirements.</p>
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
                  <circle className="text-primary transition-all duration-1000 ease-in-out" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" strokeDasharray="440" strokeDashoffset="70" strokeWidth="12"></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-display-lg text-display-lg text-primary">84%</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Readiness</span>
                </div>
              </div>
            </div>
            <div className="flex-1 text-center md:text-left space-y-2">
              <h3 className="font-headline-lg text-headline-lg text-on-surface">Precision Report: Data Scientist</h3>
              <p className="text-on-surface-variant font-body-lg text-body-lg">Your resume shows a strong alignment with senior-level roles in technology and research sectors.</p>
              <div className="flex flex-wrap gap-2 pt-4 justify-center md:justify-start">
                <span className="px-4 py-1.5 bg-green-100 text-green-800 rounded-full font-label-md text-label-md flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Placement: High
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
              <p className="text-on-surface-variant font-body-sm text-body-sm mb-6">Percentage of target qualifications missing from your current profile.</p>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="font-display-lg text-display-lg text-secondary">15%</span>
                <span className="text-on-surface-variant font-label-md text-label-md mb-2">Target Gap</span>
              </div>
              <div className="h-4 bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-secondary skill-bar-animate rounded-full" style={{ width: '15%' }}></div>
              </div>
              <p className="text-on-surface-variant font-body-sm text-body-sm italic">"Only 3 key certifications away from 95% compatibility."</p>
            </div>
          </div>
        </div>

        {/* Bento Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
          {/* Extracted Skills */}
          <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-lg">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-headline-md text-headline-md flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">psychology</span> Extracted Skills
              </h4>
              <button className="text-primary font-label-md hover:underline">Edit List</button>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="px-4 py-2 bg-surface-container rounded-lg border border-outline-variant/30 font-label-md text-on-surface flex items-center gap-2">
                Python <span className="w-2 h-2 rounded-full bg-green-500"></span>
              </div>
              <div className="px-4 py-2 bg-surface-container rounded-lg border border-outline-variant/30 font-label-md text-on-surface flex items-center gap-2">
                SQL <span className="w-2 h-2 rounded-full bg-green-500"></span>
              </div>
              <div className="px-4 py-2 bg-surface-container rounded-lg border border-outline-variant/30 font-label-md text-on-surface flex items-center gap-2">
                Project Management <span className="w-2 h-2 rounded-full bg-primary/40"></span>
              </div>
              <div className="px-4 py-2 bg-surface-container rounded-lg border border-outline-variant/30 font-label-md text-on-surface flex items-center gap-2">
                Machine Learning <span className="w-2 h-2 rounded-full bg-green-500"></span>
              </div>
              <div className="px-4 py-2 bg-surface-container rounded-lg border border-outline-variant/30 font-label-md text-on-surface flex items-center gap-2">
                Data Visualization <span className="w-2 h-2 rounded-full bg-green-500"></span>
              </div>
              <div className="px-4 py-2 bg-surface-container rounded-lg border border-outline-variant/30 font-label-md text-on-surface flex items-center gap-2">
                A/B Testing <span className="w-2 h-2 rounded-full bg-primary/40"></span>
              </div>
            </div>

            {/* Skills Comparison Chart */}
            <div className="mt-12">
              <h5 className="font-label-md text-label-md text-on-surface-variant uppercase mb-6">Skill Proficiency vs. Market Standard</h5>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between font-label-md">
                    <span>Python Proficiency</span>
                    <span className="text-primary">92%</span>
                  </div>
                  <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full skill-bar-animate" style={{ width: '92%' }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between font-label-md">
                    <span>Data Engineering</span>
                    <span className="text-primary">65%</span>
                  </div>
                  <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-primary/60 rounded-full skill-bar-animate" style={{ width: '65%' }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between font-label-md">
                    <span>Statistical Modeling</span>
                    <span className="text-primary">88%</span>
                  </div>
                  <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full skill-bar-animate" style={{ width: '88%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Missing & Recommendations */}
          <div className="space-y-gutter">
            {/* Missing Skills */}
            <div className="bg-surface-container-highest border border-outline-variant rounded-xl p-stack-lg">
              <h4 className="font-headline-md text-headline-md text-on-surface mb-4">Missing Skills</h4>
              <p className="text-on-surface-variant font-body-sm mb-4">Critical for <span className="font-bold text-on-surface">Target: Data Scientist</span></p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-error-container/20 border border-error/20 rounded-lg">
                  <span className="material-symbols-outlined text-error text-[20px]">warning</span>
                  <span className="font-label-md text-on-surface">Apache Spark</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-error-container/20 border border-error/20 rounded-lg">
                  <span className="material-symbols-outlined text-error text-[20px]">warning</span>
                  <span className="font-label-md text-on-surface">Cloud Architecture (AWS)</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-error-container/20 border border-error/20 rounded-lg">
                  <span className="material-symbols-outlined text-error text-[20px]">warning</span>
                  <span className="font-label-md text-on-surface">NoSQL Databases</span>
                </div>
              </div>
            </div>
            
            {/* Strengths & Weaknesses */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
              <div className="bg-primary/5 p-4 border-b border-outline-variant">
                <h4 className="font-label-md text-label-md text-primary uppercase">Quick Analysis</h4>
              </div>
              <div className="p-stack-md space-y-4">
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant mb-2 uppercase tracking-wide">Strengths</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-body-sm">
                      <span className="material-symbols-outlined text-green-600 text-[18px]">check_circle</span>
                      Exemplary academic background in STEM.
                    </li>
                    <li className="flex items-start gap-2 text-body-sm">
                      <span className="material-symbols-outlined text-green-600 text-[18px]">check_circle</span>
                      Dense quantitative project history.
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant mb-2 uppercase tracking-wide">Weaknesses</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-body-sm">
                      <span className="material-symbols-outlined text-error text-[18px]">info</span>
                      Lack of industry-specific certifications.
                    </li>
                    <li className="flex items-start gap-2 text-body-sm">
                      <span className="material-symbols-outlined text-error text-[18px]">info</span>
                      Soft skills are under-represented in text.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Recommendation Banner */}
        <div className="mt-gutter p-8 bg-gradient-to-r from-secondary-container to-secondary rounded-xl text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-secondary/20">
          <div className="flex items-center gap-6">
            <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md">
              <span className="material-symbols-outlined text-[48px]">school</span>
            </div>
            <div>
              <h4 className="font-headline-md text-headline-md">Close your 15% gap now.</h4>
              <p className="opacity-90 font-body-md">We've generated a custom Learning Path for Apache Spark & AWS.</p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/roadmap')} 
            className="bg-white text-secondary px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-all flex items-center gap-2 whitespace-nowrap"
          >
            View My Path <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default AnalysisReport;
