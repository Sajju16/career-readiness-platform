import TopAppBar from '../components/layout/TopAppBar';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import careerGoalService from '../services/careerGoalService';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const userName = user?.fullName || 'Complete your profile';
  const userEmail = user?.email || 'No email provided';
  const [careerGoal, setCareerGoal] = useState(null);

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const goal = await careerGoalService.getGoal();
        setCareerGoal(goal);
      } catch (err) {
        console.error("Error fetching career goal on profile", err);
      }
    };
    fetchGoal();
  }, []);

  return (
    <>
      <TopAppBar title="Student Profile" />
      <div className="max-w-container-max mx-auto px-margin-desktop mt-stack-lg">
        {/* Bento Profile Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="md:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl p-8 flex flex-col md:flex-row items-center md:items-start gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <span className="px-3 py-1 bg-primary-container/10 text-primary font-bold text-label-sm rounded-full border border-primary/20">AI-VERIFIED</span>
            </div>
            <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-surface shadow-sm shrink-0">
              <img className="w-full h-full object-cover" alt="Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzqR3eW2PVa1Asukb0RTs-terQqXolYQpTT18R8_YH2xusj0mW_7VPgoXj7oYRjyi62E5Nb-KiBkUZKeqbYozU1sifqJLo4JL1mw2Hooxb_0HmJ-KNtPD9invOD6MQOUokBZFQjJ9eFddX2maYpsQLdtogsAfBTxGzupM9N21LCSzVg4CcPkkawLQW2cFRo4XPWmQ59SfPW4W2SYjZWwkSZ6BJj7-8O4t4EwqB68h5prhIWexOS3K2" />
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
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container rounded-lg text-on-surface-variant font-label-md text-label-md">
                  <span className="material-symbols-outlined text-[18px]">link</span>
                  linkedin.com/in/arivera-ds
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container rounded-lg text-on-surface-variant font-label-md text-label-md">
                  <span className="material-symbols-outlined text-[18px]">school</span>
                  Stanford University
                </span>
              </div>
            </div>
          </div>
          
          {/* Readiness Gauge */}
          <div className="md:col-span-4 bg-surface-container-lowest border border-outline-variant rounded-xl p-8 flex flex-col items-center justify-center text-center">
            <h4 className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant mb-6">Career Readiness</h4>
            <div className="relative w-32 h-32 flex items-center justify-center mb-4">
              <svg className="w-full h-full transform -rotate-90">
                <circle className="text-surface-container-high" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeWidth="10"></circle>
                <circle cx="64" cy="64" fill="transparent" r="58" stroke="url(#gradient)" strokeDasharray="364.4" strokeDashoffset="43.7" strokeLinecap="round" strokeWidth="12"></circle>
                <defs>
                  <linearGradient id="gradient" x1="0%" x2="100%" y1="0%" y2="0%">
                    <stop offset="0%" style={{ stopColor: '#4648d4' }}></stop>
                    <stop offset="100%" style={{ stopColor: '#6b38d4' }}></stop>
                  </linearGradient>
                </defs>
              </svg>
              <span className="absolute font-display-lg text-display-lg text-primary">88</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant">Top 5% for Junior DS roles</p>
          </div>
          
          {/* Education & Certifications */}
          <div className="md:col-span-6 bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-lg">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary">history_edu</span>
              <h4 className="font-headline-md text-headline-md">Education</h4>
            </div>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-on-surface-variant">school</span>
                </div>
                <div>
                  <h5 className="font-label-md text-label-md text-on-surface">Bachelor of Computer Science</h5>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Stanford University • 2021 - 2025</p>
                  <div className="mt-2 inline-block px-2 py-0.5 bg-secondary-container/10 text-secondary font-bold text-[10px] rounded uppercase tracking-tighter">GPA 3.9/4.0</div>
                </div>
              </div>
            </div>
            <div className="mt-10 mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">verified</span>
              <h4 className="font-headline-md text-headline-md">Certifications</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border border-outline-variant rounded-lg hover:border-primary transition-colors cursor-pointer group">
                <div className="flex items-center justify-between mb-2">
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary">cloud</span>
                  <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-transform group-hover:translate-x-1">chevron_right</span>
                </div>
                <h5 className="font-label-md text-label-md text-on-surface">AWS Certified Practitioner</h5>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Cloud Foundations</p>
              </div>
              <div className="p-4 border border-outline-variant rounded-lg hover:border-primary transition-colors cursor-pointer group">
                <div className="flex items-center justify-between mb-2">
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary">database</span>
                  <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-transform group-hover:translate-x-1">chevron_right</span>
                </div>
                <h5 className="font-label-md text-label-md text-on-surface">Coursera SQL Mastery</h5>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Advanced Queries</p>
              </div>
            </div>
          </div>

          {/* Projects */}
          <div className="md:col-span-6 bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-lg">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary">folder_special</span>
              <h4 className="font-headline-md text-headline-md">Featured Projects</h4>
            </div>
            <div className="space-y-4">
              <div className="group relative block rounded-xl border border-outline-variant overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="h-40 w-full overflow-hidden">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Project" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBH_jrlzrFdLLCsRE7216k8IUv2ze6tusmkp3x7Rr_uuoQ70jlriK9xvEWZVT3f-RRPc79kel0UbABICjd3FRr4bgvpk858L2G_SmyeJIWmcmYtrvTBLIWC3fg47iBWYGJiPdJq0pitDQdHPt4mOkzRz8bhu2-i4HK6tyQoveJwORCGkyFG1llyT17E2jmNjKTX8bl52Wyq0sUyQE0c7EaPBhfSowBukK93pCriQFiC7Du-_ooSkL91" />
                </div>
                <div className="p-4 bg-surface-container-lowest">
                  <h5 className="font-label-md text-label-md text-on-surface">NLP-Based Career Assistant</h5>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Python, TensorFlow, OpenAI API</p>
                </div>
              </div>
              <div className="group relative flex items-center gap-4 p-4 rounded-xl border border-outline-variant hover:bg-surface transition-colors">
                <div className="w-16 h-16 rounded-lg bg-primary/5 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary">web</span>
                </div>
                <div className="flex-grow">
                  <h5 className="font-label-md text-label-md text-on-surface">Data Portfolio v2.0</h5>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Interactive D3.js Visualizations</p>
                </div>
                <button className="p-2 text-on-surface-variant hover:text-primary">
                  <span className="material-symbols-outlined">open_in_new</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Resume History */}
          <div className="md:col-span-12 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
            <div className="p-stack-lg border-b border-outline-variant flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">history</span>
                <h4 className="font-headline-md text-headline-md">Resume Upload History</h4>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-primary text-primary font-bold text-label-md rounded-lg hover:bg-primary/5 transition-colors">
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
                    <th className="px-8 py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-center">AI Match Score</th>
                    <th className="px-8 py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  <tr className="hover:bg-surface transition-colors">
                    <td className="px-8 py-4 font-body-sm text-body-sm">Oct 12, 2024</td>
                    <td className="px-8 py-4 flex items-center gap-3">
                      <span className="material-symbols-outlined text-error">picture_as_pdf</span>
                      <span className="font-label-md text-label-md">AlexRivera_DS_v3.pdf</span>
                    </td>
                    <td className="px-8 py-4 text-center">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 font-bold text-[12px] rounded-full">
                        88/100
                      </span>
                    </td>
                    <td className="px-8 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors text-on-surface-variant">
                          <span className="material-symbols-outlined text-[20px]">visibility</span>
                        </button>
                        <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors text-on-surface-variant">
                          <span className="material-symbols-outlined text-[20px]">download</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="md:col-span-12 bg-surface-container-lowest border border-outline-variant rounded-xl p-8 flex flex-col md:flex-row justify-between items-center gap-6">
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
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    <span className="font-bold text-on-surface">Graduation:</span> {careerGoal?.graduationYear || 'Not Set'}
                  </p>
                </div>
              </div>
            </div>
            <button onClick={() => navigate('/goal')} className="flex items-center gap-2 px-6 py-2 border border-outline text-on-surface font-bold text-label-md rounded-lg hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">edit</span>
              Edit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
