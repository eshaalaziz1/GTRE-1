export const metadata = {
  title: "Members Only | GT Real Estate Club",
};

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-navy rounded-xl flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl font-bold text-gold">GT</span>
        </div>

        <h1 className="text-2xl font-bold text-navy mb-3">
          Members Only
        </h1>

        <p className="text-secondary text-sm leading-relaxed mb-6">
          The Job Board is exclusively available to GT Real Estate Club members.
          Please log in through the club website to access job opportunities.
        </p>

        <a
          href="https://www.reatgt.org"
          className="inline-block px-6 py-3 bg-navy text-white font-semibold rounded hover:bg-gold transition-colors text-sm"
        >
          Go to GT Real Estate Club
        </a>

        <p className="text-xs text-secondary mt-6">
          Not a member?{" "}
          <a
            href="https://www.reatgt.org/contact"
            className="text-navy underline hover:text-gold"
          >
            Get involved
          </a>
        </p>
      </div>
    </div>
  );
}
