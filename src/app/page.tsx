import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="w-20 h-20 bg-gold rounded-xl flex items-center justify-center mx-auto mb-8">
          <span className="text-3xl font-bold text-navy">GT</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-navy mb-4">
          GT Real Estate Club
        </h1>
        <p className="text-lg text-secondary mb-8">
          Georgia Tech&apos;s premier real estate organization. Connect with
          industry professionals, explore career opportunities, and build your
          network.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/jobs"
            className="px-6 py-3 bg-gold text-white font-semibold rounded-lg hover:bg-gold-hover transition-colors"
          >
            Browse Jobs
          </Link>
          <Link
            href="/alumni"
            className="px-6 py-3 bg-navy text-white font-semibold rounded-lg hover:bg-navy/90 transition-colors"
          >
            Alumni Network
          </Link>
        </div>
      </div>
    </div>
  );
}
