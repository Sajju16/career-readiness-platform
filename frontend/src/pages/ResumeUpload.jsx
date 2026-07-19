import TopAppBar from '../components/layout/TopAppBar';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import careerGoalService from '../services/careerGoalService';
import resumeService from '../services/resumeService';

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [careerGoal, setCareerGoal] = useState(null);
  const [existingResume, setExistingResume] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const goal = await careerGoalService.getGoal();
        setCareerGoal(goal);
        
        const resume = await resumeService.getResume();
        setExistingResume(resume);
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };
    fetchData();
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      handleUpload(e.target.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async (selectedFile) => {
    setError(null);
    setProgress(0);
    
    if (selectedFile.type !== 'application/pdf') {
      setError("Only PDF files are allowed.");
      return;
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("File exceeds maximum size of 5MB.");
      return;
    }

    setFile(selectedFile);
    
    // Simulate progress while uploading (since standard axios upload progress is complex to mock easily without config here)
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + 10 : prev));
    }, 200);

    try {
      const response = await resumeService.uploadResume(selectedFile);
      clearInterval(interval);
      setProgress(100);
      setExistingResume(response);
    } catch (err) {
      clearInterval(interval);
      setProgress(0);
      setFile(null);
      setError(err.response?.data || "Upload failed. Check if Supabase storage is configured.");
    }
  };

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      navigate('/report');
    }, 1500);
  };

  return (
    <>
      <TopAppBar title="Upload Resume" />
      <div className="w-full max-w-[800px] mx-auto px-margin-desktop py-stack-md mt-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Current Goal Box */}
        <div className="flex items-center justify-between bg-primary/5 border border-primary-fixed p-4 rounded-xl mb-8">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">target</span>
            <div>
              <p className="text-label-sm text-outline uppercase tracking-wider">Current Career Goal</p>
              <p className="font-bold text-on-surface">
                Target Role: <span className="text-primary">{careerGoal ? careerGoal.targetRole.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Not Set'}</span> | 
                Preferred Company: <span className="text-primary">{careerGoal?.preferredCompany || 'Any'}</span>
              </p>
            </div>
          </div>
          <button onClick={() => navigate('/goal')} className="text-primary font-label-md hover:underline flex items-center gap-1">
            <span className="material-symbols-outlined text-[18px]">edit</span>
            Change Career Goal
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-error-container/50 border border-error/20 text-error text-sm p-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        {/* Drag & Drop Zone */}
        <div 
          className="relative group cursor-pointer border-2 border-dashed border-outline-variant bg-surface-container-lowest rounded-[2rem] p-12 transition-all duration-300 hover:border-primary hover:shadow-xl hover:shadow-primary/5 flex flex-col items-center text-center"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input 
            accept=".pdf" 
            className="absolute inset-0 opacity-0 cursor-pointer z-10" 
            type="file"
            onChange={handleFileChange}
          />
          <div className="w-24 h-24 mb-6 rounded-3xl bg-primary-container/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
            <span className="material-symbols-outlined text-[48px] text-primary" style={{ fontVariationSettings: "'FILL' 0" }}>cloud_upload</span>
          </div>
          <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Drag and drop your resume</h3>
          <p className="text-on-surface-variant font-body-md mb-8">Support for PDF and DOCX formats (Max 10MB)</p>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-surface-container rounded-full border border-outline-variant">
              <span className="material-symbols-outlined text-[20px] text-red-500">picture_as_pdf</span>
              <span className="font-label-sm text-label-sm">PDF</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-surface-container rounded-full border border-outline-variant">
              <span className="material-symbols-outlined text-[20px] text-blue-500">description</span>
              <span className="font-label-sm text-label-sm">DOCX</span>
            </div>
          </div>
        </div>

        {/* Upload Progress Card */}
        {file && (
          <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant shadow-sm space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-surface-container-highest rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">article</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface">{file.name}</p>
                  <p className="text-[12px] text-on-surface-variant">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
              </div>
              <span className="font-label-md text-primary">{progress}%</span>
            </div>
            <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300 ease-out" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            {progress === 100 && (
              <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                <span className="text-[12px] font-bold uppercase tracking-wider">Uploaded successfully. AI processing not started (Milestone 5).</span>
              </div>
            )}
          </div>
        )}
        
        {/* Existing Resume Info */}
        {!file && existingResume && (
          <div className="bg-surface-container-low rounded-2xl p-6 border border-primary/20 shadow-sm space-y-4">
            <h4 className="font-headline-md text-primary">Currently Uploaded Resume</h4>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-surface-container-highest rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">picture_as_pdf</span>
              </div>
              <div>
                <p className="font-label-md text-label-md text-on-surface">{existingResume.fileName}</p>
                <p className="text-[12px] text-on-surface-variant">
                  {(existingResume.fileSize / (1024 * 1024)).toFixed(2)} MB • Uploaded: {new Date(existingResume.uploadedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Area */}
        <div className="flex flex-col items-center gap-6">
          <button 
            disabled={progress < 100 || analyzing}
            onClick={handleAnalyze}
            className={`w-full py-4 px-8 rounded-full font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden ${
              progress === 100 && !analyzing
                ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 cursor-pointer'
                : 'bg-outline-variant text-on-surface-variant cursor-not-allowed disabled:opacity-50'
            }`}
          >
            <span className="relative z-10">{analyzing ? 'Analyzing...' : 'Analyze Resume'}</span>
            <span className={`material-symbols-outlined relative z-10 ${analyzing ? 'animate-spin' : ''}`} style={analyzing ? {} : { fontVariationSettings: "'FILL' 1" }}>
              {analyzing ? 'sync' : 'sparkles'}
            </span>
          </button>
          <p className="text-on-surface-variant font-body-sm text-center max-w-[400px]">
            By uploading, you agree to our <a className="text-primary hover:underline" href="#">Privacy Policy</a> regarding AI data processing.
          </p>
        </div>

        {/* Career Velocity Tips Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter pt-8 border-t border-outline-variant">
          <div className="p-6 bg-surface-container-lowest rounded-2xl border border-outline-variant hover:shadow-lg transition-all group">
            <div className="w-12 h-12 rounded-xl bg-tertiary-container/10 flex items-center justify-center mb-4 group-hover:bg-primary-container/20 transition-colors">
              <span className="material-symbols-outlined text-tertiary group-hover:text-primary">tips_and_updates</span>
            </div>
            <h4 className="font-headline-md text-[18px] text-on-surface mb-2">Optimized Keywords</h4>
            <p className="text-on-surface-variant font-body-sm">Our AI checks for industry-specific terminology that ATS systems prioritize.</p>
          </div>
          <div className="p-6 bg-surface-container-lowest rounded-2xl border border-outline-variant hover:shadow-lg transition-all group">
            <div className="w-12 h-12 rounded-xl bg-tertiary-container/10 flex items-center justify-center mb-4 group-hover:bg-primary-container/20 transition-colors">
              <span className="material-symbols-outlined text-tertiary group-hover:text-primary">trending_up</span>
            </div>
            <h4 className="font-headline-md text-[18px] text-on-surface mb-2">Growth Prediction</h4>
            <p className="text-on-surface-variant font-body-sm">See how your current experience maps to six-figure leadership roles.</p>
          </div>
          <div className="p-6 bg-surface-container-lowest rounded-2xl border border-outline-variant hover:shadow-lg transition-all group">
            <div className="w-12 h-12 rounded-xl bg-tertiary-container/10 flex items-center justify-center mb-4 group-hover:bg-primary-container/20 transition-colors">
              <span className="material-symbols-outlined text-tertiary group-hover:text-primary">workspace_premium</span>
            </div>
            <h4 className="font-headline-md text-[18px] text-on-surface mb-2">Skill Verification</h4>
            <p className="text-on-surface-variant font-body-sm">Automatically extract and validate technical stacks and soft skills.</p>
          </div>
        </section>
      </div>
    </>
  );
};

export default ResumeUpload;
