const TopAppBar = ({ title }) => {
  return (
    <header className="h-16 flex items-center justify-between px-margin-desktop bg-surface-container-lowest/80 backdrop-blur-xl border-b border-outline-variant sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <h2 className="font-headline-md text-headline-md font-bold tracking-tight text-primary">
          {title}
        </h2>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-surface-container-low transition-colors duration-200 text-on-surface-variant">
          <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
        </button>
        <button className="p-2 rounded-full hover:bg-surface-container-low transition-colors duration-200 text-on-surface-variant">
          <span className="material-symbols-outlined" data-icon="sparkles" data-original-icon="sparkles">sparkles</span>
        </button>
        <img
          className="w-8 h-8 rounded-full border border-outline"
          alt="User Profile"
          src="https://ui-avatars.com/api/?name=User&background=4648d4&color=fff"
        />
      </div>
    </header>
  );
};

export default TopAppBar;
