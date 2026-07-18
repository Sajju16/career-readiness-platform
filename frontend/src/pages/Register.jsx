import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (!firstName || !lastName || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    try {
      const fullName = `${firstName} ${lastName}`.trim();
      await register(fullName, email, password);
      navigate('/dashboard');
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('Registration failed. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface-bright min-h-screen flex flex-col items-center justify-center p-gutter">
      <main className="w-full max-w-[480px] animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Logo Branding */}
        <div className="flex flex-col items-center mb-stack-lg">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-stack-sm shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>insights</span>
          </div>
          <h1 className="font-headline-md text-headline-md font-extrabold tracking-tight text-primary">CareerVelocity</h1>
        </div>

        {/* Main Card */}
        <div className="glass-card rounded-xl p-stack-lg overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 ai-shimmer"></div>
          
          <header className="mb-stack-lg text-center">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-stack-sm">Create an account</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Start your AI-guided career journey.</p>
          </header>

          {error && (
            <div className="bg-error-container/50 border border-error/20 text-error text-sm p-3 rounded-xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-stack-md">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-label-md text-label-md text-on-surface-variant mb-unit" htmlFor="firstName">First name</label>
                <input
                  id="firstName"
                  type="text"
                  className="w-full h-12 px-4 bg-surface-container-lowest border border-outline-variant rounded-xl font-body-md text-body-md input-focus-ring"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block font-label-md text-label-md text-on-surface-variant mb-unit" htmlFor="lastName">Last name</label>
                <input
                  id="lastName"
                  type="text"
                  className="w-full h-12 px-4 bg-surface-container-lowest border border-outline-variant rounded-xl font-body-md text-body-md input-focus-ring"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block font-label-md text-label-md text-on-surface-variant mb-unit" htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                className="w-full h-12 px-4 bg-surface-container-lowest border border-outline-variant rounded-xl font-body-md text-body-md input-focus-ring"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block font-label-md text-label-md text-on-surface-variant mb-unit" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="w-full h-12 px-4 bg-surface-container-lowest border border-outline-variant rounded-xl font-body-md text-body-md input-focus-ring"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 text-xs">Must be at least 6 characters</p>
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-primary text-white font-label-md text-label-md rounded-xl shadow-lg shadow-primary/25 hover:bg-primary-container transition-all active:scale-95 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:active:scale-100"
              >
                {loading ? 'Creating account...' : 'Create Account'}
                {!loading && <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>}
              </button>
            </div>
          </form>

          <p className="text-center font-body-sm text-body-sm text-on-surface-variant mt-stack-md">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:text-primary-container font-semibold transition-colors">Sign in</Link>
          </p>
        </div>
      </main>
      
      {/* Background Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 opacity-30 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] right-[10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[100px]"></div>
        <div className="absolute bottom-[10%] left-[10%] w-[30%] h-[30%] rounded-full bg-secondary/10 blur-[80px]"></div>
      </div>
    </div>
  )
}

export default Register
