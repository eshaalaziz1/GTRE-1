import Image from "next/image";
import Link from "next/link";
import { MAIN_NAV } from "@/lib/nav";

export default function Footer() {
  return (
    <footer className="bg-navy text-white/80 mt-24">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10 py-14 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Image
            src="/gtre-logo-white.png"
            alt="Georgia Tech Real Estate Club"
            width={1450}
            height={340}
            className="h-12 w-auto"
          />
          <p className="mt-5 text-sm max-w-sm leading-relaxed text-white/70">
            The student-run home for real estate at Georgia Tech. We connect
            students with alumni and industry through education, events, and a
            vetted analyst network.
          </p>
        </div>

        <div>
          <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-gold mb-4">
            Explore
          </div>
          <ul className="space-y-2.5 text-sm">
            {MAIN_NAV.map((i) => (
              <li key={i.href}>
                <Link href={i.href} className="hover:text-white transition-colors">
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-gold mb-4">
            Connect
          </div>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a href="mailto:rjalali6@gatech.edu" className="hover:text-white transition-colors">
                rjalali6@gatech.edu
              </a>
            </li>
            <li>Scheller College of Business</li>
            <li>800 W Peachtree St NW, Atlanta, GA</li>
            <li className="flex gap-4 pt-2">
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10 py-5 text-[12px] text-white/50 flex flex-wrap justify-between gap-2">
          <span>© {new Date().getFullYear()} Georgia Tech Real Estate Club. Placeholder content shown in this prototype.</span>
          <span>Georgia Institute of Technology</span>
        </div>
      </div>
    </footer>
  );
}
