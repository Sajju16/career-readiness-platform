import TopAppBar from '../components/layout/TopAppBar';

const LearningRoadmap = () => {
  return (
    <>
      <TopAppBar title="Learning Roadmap" />
      <div className="p-margin-desktop max-w-container-max mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        <header className="mb-stack-lg flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-display-lg text-display-lg text-on-surface mb-2">Your Path to Data Scientist</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">Customized based on your resume analysis and target role.</p>
          </div>
          <div className="bg-surface-container-low px-4 py-2 rounded-xl border border-outline-variant inline-flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">psychology</span>
            <div>
              <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">AI Generated</p>
              <p className="font-label-md text-on-surface">3 Modules Left</p>
            </div>
          </div>
        </header>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[23px] top-8 bottom-8 w-0.5 bg-outline-variant/50 hidden md:block"></div>

          <div className="space-y-8">
            
            {/* Completed Module */}
            <div className="relative flex gap-6 opacity-70">
              <div className="hidden md:flex w-12 h-12 rounded-full bg-green-100 border border-green-200 items-center justify-center relative z-10 shrink-0">
                <span className="material-symbols-outlined text-green-700">check</span>
              </div>
              <div className="flex-1 bg-surface-container-lowest border border-outline-variant rounded-xl p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-headline-md text-headline-md text-on-surface line-through">Python & SQL Foundations</h3>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-label-sm font-bold rounded-full">Completed</span>
                </div>
                <p className="font-body-sm text-on-surface-variant mb-4">You have successfully demonstrated these skills in your resume.</p>
              </div>
            </div>

            {/* In Progress Module */}
            <div className="relative flex gap-6">
              <div className="hidden md:flex w-12 h-12 rounded-full bg-primary-container text-on-primary-container border-2 border-primary items-center justify-center relative z-10 shrink-0 shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined text-[20px]">play_arrow</span>
              </div>
              <div className="flex-1 bg-surface-container-lowest border-2 border-primary rounded-xl p-6 shadow-xl shadow-primary/5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-headline-md text-headline-md text-on-surface">Apache Spark for Data Engineering</h3>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-label-sm font-bold rounded-full border border-primary/20">In Progress</span>
                </div>
                <p className="font-body-md text-on-surface-variant mb-6 max-w-2xl">
                  This is the largest gap preventing you from a Senior Data Scientist role. 
                  Learn distributed data processing, RDDs, and Spark SQL.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 border border-outline-variant rounded-lg hover:border-primary transition-colors cursor-pointer group">
                    <span className="material-symbols-outlined text-outline-variant group-hover:text-primary">radio_button_unchecked</span>
                    <div className="flex-1">
                      <p className="font-label-md text-on-surface">Introduction to RDDs</p>
                      <p className="font-body-sm text-on-surface-variant">45 mins • Video + Quiz</p>
                    </div>
                    <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-transform group-hover:translate-x-1">arrow_forward</span>
                  </div>
                  <div className="flex items-center gap-4 p-4 border border-outline-variant rounded-lg hover:border-primary transition-colors cursor-pointer group">
                    <span className="material-symbols-outlined text-outline-variant group-hover:text-primary">radio_button_unchecked</span>
                    <div className="flex-1">
                      <p className="font-label-md text-on-surface">Spark SQL & DataFrames</p>
                      <p className="font-body-sm text-on-surface-variant">1.5 hrs • Hands-on Lab</p>
                    </div>
                    <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-transform group-hover:translate-x-1">arrow_forward</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Locked Module */}
            <div className="relative flex gap-6 opacity-60 hover:opacity-100 transition-opacity">
              <div className="hidden md:flex w-12 h-12 rounded-full bg-surface-container border border-outline-variant items-center justify-center relative z-10 shrink-0">
                <span className="material-symbols-outlined text-on-surface-variant">lock</span>
              </div>
              <div className="flex-1 bg-surface-container-lowest border border-outline-variant rounded-xl p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-headline-md text-headline-md text-on-surface">Cloud Architecture (AWS)</h3>
                  <span className="px-3 py-1 bg-surface-container text-on-surface-variant text-label-sm font-bold rounded-full">Locked</span>
                </div>
                <p className="font-body-sm text-on-surface-variant">Deploying models and managing data lakes using AWS services.</p>
              </div>
            </div>

            {/* Locked Module */}
            <div className="relative flex gap-6 opacity-60 hover:opacity-100 transition-opacity">
              <div className="hidden md:flex w-12 h-12 rounded-full bg-surface-container border border-outline-variant items-center justify-center relative z-10 shrink-0">
                <span className="material-symbols-outlined text-on-surface-variant">lock</span>
              </div>
              <div className="flex-1 bg-surface-container-lowest border border-outline-variant rounded-xl p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-headline-md text-headline-md text-on-surface">NoSQL Databases</h3>
                  <span className="px-3 py-1 bg-surface-container text-on-surface-variant text-label-sm font-bold rounded-full">Locked</span>
                </div>
                <p className="font-body-sm text-on-surface-variant">Understanding MongoDB, Cassandra, and when to use them over traditional relational databases.</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default LearningRoadmap;
