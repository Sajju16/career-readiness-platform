const Footer = () => {
  return (
    <footer className="lg:ml-[280px] bg-surface-container-lowest border-t border-outline-variant flex flex-col md:flex-row justify-between items-center px-margin-desktop py-stack-lg w-auto mt-auto">
      <p className="font-body-sm text-body-sm text-on-surface-variant">© 2024 CareerVelocity AI. Guided Velocity for Modern Careers.</p>
      <div className="flex gap-6 mt-4 md:mt-0">
        <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-all" href="#">Privacy</a>
        <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-all" href="#">Terms</a>
        <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-all" href="#">Support</a>
        <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-all" href="#">Contact</a>
      </div>
    </footer>
  );
};

export default Footer;
