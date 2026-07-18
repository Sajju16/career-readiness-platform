import { useNavigate, Link } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface-bright flex flex-col font-body-md text-on-surface overflow-x-hidden selection:bg-primary/20">
      
      {/* Decorative Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none opacity-40">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/20 blur-[100px]"></div>
      </div>

      {/* Navigation */}
      <nav className="w-full h-20 flex items-center justify-between px-margin-desktop border-b border-outline-variant/50 bg-surface-container-lowest/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>speed</span>
          </div>
          <span className="font-headline-md text-headline-md font-black text-primary tracking-tight">CareerVelocity</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">
            Log In
          </Link>
          <button 
            onClick={() => navigate('/register')}
            className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-label-md text-label-md hover:bg-primary-container transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-margin-desktop py-24 md:py-32 max-w-container-max mx-auto w-full animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container border border-outline-variant/50 mb-8">
          <span className="material-symbols-outlined text-primary text-[18px]">auto_awesome</span>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">AI-Powered Career Readiness</span>
        </div>
        
        <h1 className="font-display-lg text-display-lg text-on-surface max-w-4xl mb-6 leading-tight">
          Bridge the gap between your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">resume</span> and your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">dream role</span>.
        </h1>
        
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-12">
          Upload your resume, set your target position, and let our NLP engine generate a precise gap analysis and custom learning roadmap to get you hired faster.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button 
            onClick={() => navigate('/register')}
            className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2"
          >
            Analyze My Resume <span className="material-symbols-outlined">arrow_forward</span>
          </button>
          <button 
            onClick={() => navigate('/login')}
            className="bg-surface-container-lowest text-on-surface px-8 py-4 rounded-xl font-bold text-lg border border-outline-variant hover:bg-surface-container hover:border-outline transition-all flex items-center justify-center"
          >
            Sign In to Dashboard
          </button>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 w-full text-left">
          <div className="bg-surface-container-lowest/80 backdrop-blur-sm p-8 rounded-2xl border border-outline-variant hover:border-primary/50 transition-colors shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary text-[24px]">psychology</span>
            </div>
            <h3 className="font-headline-md text-headline-md mb-2">NLP Skill Extraction</h3>
            <p className="font-body-sm text-on-surface-variant">Advanced spaCy models extract your precise technical and soft skills from any resume format.</p>
          </div>
          
          <div className="bg-surface-container-lowest/80 backdrop-blur-sm p-8 rounded-2xl border border-outline-variant hover:border-primary/50 transition-colors shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-secondary text-[24px]">analytics</span>
            </div>
            <h3 className="font-headline-md text-headline-md mb-2">Market Gap Analysis</h3>
            <p className="font-body-sm text-on-surface-variant">Sentence Transformers compare your profile directly against current industry job descriptions.</p>
          </div>

          <div className="bg-surface-container-lowest/80 backdrop-blur-sm p-8 rounded-2xl border border-outline-variant hover:border-primary/50 transition-colors shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-tertiary-container/20 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-tertiary text-[24px]">route</span>
            </div>
            <h3 className="font-headline-md text-headline-md mb-2">Dynamic Roadmaps</h3>
            <p className="font-body-sm text-on-surface-variant">Generative AI creates a step-by-step learning path to acquire missing skills efficiently.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 text-center border-t border-outline-variant/50 mt-auto bg-surface-container-lowest">
        <p className="font-body-sm text-on-surface-variant">© 2024 CareerVelocity AI. Guided Velocity for Modern Careers.</p>
      </footer>
    </div>
  );
};

export default Landing;
