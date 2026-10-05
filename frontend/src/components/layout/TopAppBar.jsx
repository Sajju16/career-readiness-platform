const TopAppBar = ({ title }) => {
  return (
    <header className="h-16 flex items-center justify-between px-margin-desktop bg-surface-container-lowest/80 backdrop-blur-xl border-b border-outline-variant sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <h2 className="font-headline-md text-headline-md font-bold tracking-tight text-primary">
          {title}
        </h2>
      </div>
    </header>
  );
};

export default TopAppBar;
