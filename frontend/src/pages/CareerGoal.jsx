import TopAppBar from '../components/layout/TopAppBar';
import { useState, useEffect } from 'react';
import careerGoalService from '../services/careerGoalService';

const CareerGoal = () => {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    targetRole: '',
    preferredCompany: '',
    generalIndustryReqs: false,
    graduationYear: '2025',
    experienceLevel: 'fresher'
  });

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const data = await careerGoalService.getGoal();
        if (data) {
          setFormData({
            targetRole: data.targetRole || '',
            preferredCompany: data.preferredCompany || '',
            generalIndustryReqs: data.generalIndustryReqs || false,
            graduationYear: data.graduationYear || '2025',
            experienceLevel: data.experienceLevel || 'fresher'
          });
        }
      } catch (err) {
        console.error("Failed to fetch career goal", err);
      } finally {
        setFetching(false);
      }
    };
    fetchGoal();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await careerGoalService.saveGoal(formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to save career goal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TopAppBar title="Career Goal" />
      <div className="flex flex-col items-center justify-center p-gutter mt-10">
        <div className="w-full max-w-[540px] animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          <div className="glass-card rounded-xl p-stack-lg overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 ai-shimmer"></div>
            <header className="mb-stack-lg">
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-stack-sm">Set Your Career Goal</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Define your target role and company to get a personalized readiness analysis.</p>
            </header>
            
            <form onSubmit={handleSubmit} className="space-y-stack-md">
              {error && (
                <div className="bg-error-container/50 border border-error/20 text-error text-sm p-3 rounded-xl mb-4">
                  {error}
                </div>
              )}

              {fetching ? (
                 <div className="text-center py-8">
                   <span className="material-symbols-outlined animate-spin text-primary text-4xl">sync</span>
                   <p className="mt-2 text-on-surface-variant font-body-sm">Loading your goals...</p>
                 </div>
              ) : (
                <>
              <div>
                <label className="block font-label-md text-label-md text-on-surface-variant mb-unit" htmlFor="targetRole">Target Job Role <span className="text-error">*</span></label>
                <div className="relative">
                  <select name="targetRole" className="w-full h-12 px-4 bg-surface-container-lowest border border-outline-variant rounded-xl appearance-none font-body-md text-body-md input-focus-ring" id="targetRole" required value={formData.targetRole} onChange={handleChange}>
                    <option disabled value="">Select a role...</option>
                    <option value="software_engineer">Software Engineer</option>
                    <option value="data_scientist">Data Scientist</option>
                    <option value="ai_engineer">AI Engineer</option>
                    <option value="product_manager">Product Manager</option>
                    <option value="ux_designer">UX Designer</option>
                    <option value="cybersecurity_analyst">Cybersecurity Analyst</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-on-surface-variant">
                    <span className="material-symbols-outlined">expand_more</span>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block font-label-md text-label-md text-on-surface-variant mb-unit" htmlFor="preferredCompany">Preferred Company (Optional)</label>
                <div className="relative mb-unit">
                  <span className="material-symbols-outlined absolute left-4 top-3 text-on-surface-variant text-xl">search</span>
                  <input name="preferredCompany" className="w-full h-12 pl-12 pr-4 bg-surface-container-lowest border border-outline-variant rounded-xl font-body-md text-body-md input-focus-ring" id="preferredCompany" placeholder="Search Google, Microsoft, Amazon..." type="text" value={formData.preferredCompany} onChange={handleChange} />
                </div>
                <div className="flex items-center gap-2 px-1">
                  <input name="generalIndustryReqs" className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary" id="generalIndustryReqs" type="checkbox" checked={formData.generalIndustryReqs} onChange={handleChange} />
                  <label className="font-body-sm text-body-sm text-on-surface-variant cursor-pointer" htmlFor="generalIndustryReqs">General Industry Requirements</label>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-stack-md">
                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-unit" htmlFor="graduationYear">Graduation Year</label>
                  <div className="relative">
                    <select name="graduationYear" className="w-full h-12 px-4 bg-surface-container-lowest border border-outline-variant rounded-xl appearance-none font-body-md text-body-md input-focus-ring" id="graduationYear" value={formData.graduationYear} onChange={handleChange}>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027+</option>
                      <option value="graduated">Already Graduated</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-on-surface-variant">
                      <span className="material-symbols-outlined">calendar_today</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-unit">Experience Level</label>
                  <div className="relative">
                    <select name="experienceLevel" className="w-full h-12 px-4 bg-surface-container-lowest border border-outline-variant rounded-xl appearance-none font-body-md text-body-md input-focus-ring" id="experienceLevel" value={formData.experienceLevel} onChange={handleChange}>
                      <option value="fresher">Fresher</option>
                      <option value="internship">Internship Experience</option>
                      <option value="experienced">Experienced Professional</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-on-surface-variant">
                      <span className="material-symbols-outlined">work_history</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-stack-md">
                <button disabled={loading || fetching} className="w-full h-12 bg-primary text-white font-label-md text-label-md rounded-xl shadow-lg shadow-primary/25 hover:bg-primary-container transition-all active:scale-95 flex items-center justify-center gap-2 group disabled:opacity-75 disabled:active:scale-100" type="submit">
                  {loading ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-lg">sync</span>
                      Saving...
                    </>
                  ) : saved ? (
                    <>
                      <span className="material-symbols-outlined text-lg">check_circle</span>
                      Saved Successfully
                    </>
                  ) : (
                    <>
                      Save Career Goal
                      <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </>
                  )}
                </button>
                <p className="mt-stack-sm text-center font-body-sm text-body-sm text-on-surface-variant">
                  You can update these goals anytime in settings.
                </p>
              </div>
              </>
              )}
            </form>
          </div>
          
          {/* Decorative Accents */}
          <div className="mt-stack-lg flex justify-center gap-stack-lg text-on-surface-variant/40">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-xl">auto_awesome</span>
              <span className="font-label-sm text-label-sm uppercase tracking-widest">AI Readiness</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-xl">verified</span>
              <span className="font-label-sm text-label-sm uppercase tracking-widest">Market Alignment</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CareerGoal;
