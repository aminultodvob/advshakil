import {
  BookOpen,
  BriefcaseBusiness,
  Mail,
  Phone,
  Scale,
  ShieldCheck,
  Target
} from "lucide-react";
import Image from "next/image";

import { SiteShell } from "@/components/site/site-shell";
import { SectionHeading } from "@/components/ui/section-heading";
import { MotionDiv } from "@/components/site/motion";

const timeline = [
  {
    year: "Early Education",
    title: "Foundational studies from Gangni to advanced madrasa education",
    copy:
      "He studied up to class five in Gangni before continuing high school education outside Meherpur district. He later completed both Dakhil and Alim with Golden A Plus from Ta'mirul Millat Kamil Madrasa, Tongi."
  },
  {
    year: "Legal Studies",
    title: "Honors and Masters in Law",
    copy:
      "He went on to complete both Honors and Masters in Law from Northern University, establishing the academic base for a career in high-level legal practice."
  },
  {
    year: "Professional Practice",
    title: "Supreme Court advocacy and special public prosecution",
    copy:
      "He currently practices law at the Bangladesh Supreme Court and serves as a Special Public Prosecutor with the rank of Assistant Attorney General in the Pilkhana massacre case, while also leading 'Law Seba' Law Chamber as Head of Chamber."
  },
  {
    year: "July 2024",
    title: "Legal support during the July movement and after the mass uprising",
    copy:
      "From the early phase of the July movement, he provided free legal assistance to protesting students and citizens after police arrests began. He actively participated in Rampura until August 2, 2024, and in Shahbag from August 3, 2024 to August 5, 2024. After the July mass uprising, he worked as filing lawyer in the cases of more than ten martyrs, including Shaheed Ashabul Yamin and Shaheed Sabit."
  }
];

export default function AboutPage() {
  return (
    <SiteShell>
      <section className="section-space">
        <div className="container-shell grid gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <SectionHeading
              eyebrow="Professional Profile"
              title="A legal career defined by courtroom seriousness, public service, and disciplined advocacy."
              copy="Advocate Shakil Ahmad combines Supreme Court practice, public-interest legal work, and strategic advisory experience with a profile shaped by academic distinction and direct service in moments of national significance."
            />
            <div className="glass-panel gold-ring p-8 sm:p-10">
              <p className="text-lg leading-9 text-ink/80 dark:text-white/90">
                He is currently practicing law at the Bangladesh Supreme Court
                and serving as a Special Public Prosecutor with the rank of
                Assistant Attorney General in the Pilkhana massacre case. He
                also leads <span className="font-semibold text-ink">'Law Seba'</span> Law Chamber as Head of Chamber.
              </p>
              <p className="mt-6 text-lg leading-9 text-ink/80 dark:text-white/90">
                His profile is distinguished not only by legal practice, but by
                direct involvement in public-interest legal support. From the
                beginning of the July movement, he provided free legal assistance
                to arrested students and citizens across the country, reflecting
                a sustained commitment to access to justice.
              </p>
            </div>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[56px] shadow-2xl ring-1 ring-gold/20">
              <Image
                src="/adv_shakil.jpg"
                alt="Advocate Shakil Ahmad in courtroom attire"
                fill
                className="rounded-[56px] object-cover object-top"
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </div>
            <div className="absolute -bottom-6 left-6 right-6 rounded-[26px] border border-white/10 bg-[linear-gradient(135deg,rgba(9,17,28,0.88),rgba(9,17,28,0.68))] p-6 text-white shadow-2xl backdrop-blur-md">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                Professional Presence
              </p>
              <p className="mt-3 font-serif text-3xl leading-tight">
                A professional identity shaped by courtroom discipline, public trust, and legal service.
              </p>
            </div>
            <div className="absolute -bottom-6 -left-6 -z-10 h-32 w-32 rounded-full bg-gold/10 blur-3xl" />
            <div className="absolute -right-6 -top-6 -z-10 h-32 w-32 rounded-full bg-gold/10 blur-3xl opacity-50" />
          </MotionDiv>
        </div>
      </section>

      <section className="section-space bg-white dark:bg-[#1b2633]">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Education & Practice"
            title="Academic distinction translated into serious legal work."
            copy="The journey from early education in Gangni to Supreme Court practice reflects both discipline and sustained professional growth."
          />
          <div className="mt-14 space-y-6">
            {timeline.map((item) => (
              <div
                key={item.year}
                className="grid gap-6 rounded-[28px] border border-ink/8 bg-mist p-8 lg:grid-cols-[220px_1fr] dark:bg-white/5"
              >
                <p className="font-serif text-3xl text-gold">{item.year}</p>
                <div>
                  <h3 className="font-serif text-3xl text-ink dark:text-white">{item.title}</h3>
                  <p className="mt-3 max-w-4xl text-base leading-8 text-ink/70 dark:text-white/80">
                    {item.copy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Key Areas"
            title="A profile shaped by education, litigation, public-interest action, and legal leadership."
            copy="These sections highlight the academic foundation, active legal mandates, movement-period legal service, and the institutional seriousness of his ongoing work."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {[
              {
                icon: BookOpen,
                title: "Education",
                copy:
                  "Studied up to class five in Gangni, then continued high school outside Meherpur district. Earned Golden A Plus in both Dakhil and Alim from Ta'mirul Millat Kamil Madrasa, Tongi, before completing Honors and Masters in Law from Northern University."
              },
              {
                icon: BriefcaseBusiness,
                title: "Professional Standing",
                copy:
                  "Currently practicing as a lawyer at the Bangladesh Supreme Court, serving as Special Public Prosecutor with the rank of Assistant Attorney General in the Pilkhana massacre case, and leading 'Law Seba' Law Chamber as Head of Chamber."
              },
              {
                icon: Scale,
                title: "Public-Interest Legal Work",
                copy:
                  "From the beginning of the July movement, he provided free legal assistance to arrested students and citizens across the country when police actions intensified, serving countless people in urgent need of legal protection."
              },
              {
                icon: ShieldCheck,
                title: "Post-Uprising Casework",
                copy:
                  "After the July mass uprising, he worked as filing lawyer in the cases of more than ten martyrs, including Shaheed Ashabul Yamin and Shaheed Sabit, extending legal service into the most sensitive and consequential matters."
              }
            ].map((item) => (
              <div key={item.title} className="glass-panel p-8">
                <item.icon className="h-6 w-6 text-gold" />
                <h3 className="mt-5 font-serif text-3xl text-ink dark:text-white">{item.title}</h3>
                <p className="mt-4 text-base leading-8 text-ink/75 dark:text-white/80">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="relative overflow-hidden rounded-[40px] shadow-2xl ring-1 ring-gold/20">
              <div className="relative min-h-[360px] sm:min-h-[460px]">
                <Image
                  src="/images/09.avif"
                  alt="Advocate Shakil Ahmad serving in political leadership with the National Citizen Party"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 620px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
              </div>
            </div>

            <div className="glass-panel gold-ring p-8 sm:p-10">
              <p className="eyebrow">Political Leadership</p>
              <h2 className="mt-6 font-serif text-4xl leading-tight text-ink sm:text-5xl">
                Serving the National Citizen Party with national-level coordination responsibility.
              </h2>
              <p className="mt-5 text-lg leading-8 text-ink/72 dark:text-white/90">
                Alongside his legal career, Advocate Shakil Ahmad serves the
                National Citizen Party (NCP) as <span className="font-semibold text-ink dark:text-white">Central Joint Chief Coordinator</span>.
                This role reflects an additional dimension of leadership built on
                organization, public engagement, institutional responsibility,
                and direct involvement in matters of national importance.
              </p>
              <p className="mt-5 text-lg leading-8 text-ink/70 dark:text-white/90">
                The combination of courtroom discipline and political coordination
                gives his profile a rare balance of legal authority, public trust,
                and strategic clarity in both civic and professional spheres.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="glass-panel gold-ring p-8 sm:p-10">
            <p className="eyebrow">July Movement</p>
            <h2 className="mt-6 font-serif text-4xl leading-tight text-ink sm:text-5xl">
              Legal service during the movement was practical, immediate, and deeply personal.
            </h2>
            <p className="mt-5 text-lg leading-8 text-ink/70">
              He remained actively involved in Rampura until August 2, 2024, and
              in Shahbag from August 3, 2024 through August 5, 2024. His role was
              not symbolic. It included direct participation, urgent legal support,
              and sustained help for those facing arrest and state pressure.
            </p>
          </div>

          <div className="grid gap-6">
            <div className="glass-panel p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                Contact
              </p>
              <div className="mt-6 space-y-5">
                <div className="flex items-center gap-4">
                  <div className="rounded-2xl bg-gold/10 p-3 text-gold">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-ink/55">WhatsApp</p>
                    <p className="text-lg font-medium text-ink">01916-948710</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="rounded-2xl bg-gold/10 p-3 text-gold">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-ink/55">Email</p>
                    <p className="text-lg font-medium text-ink">
                      shakilreal@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel p-8">
              <Target className="h-6 w-6 text-gold" />
              <h3 className="mt-5 font-serif text-3xl text-ink">
                Mission & Professional Orientation
              </h3>
              <p className="mt-4 text-base leading-8 text-ink/70">
                The work is grounded in legal seriousness, client service, and
                public responsibility. Whether acting in court, advising through
                sensitive disputes, or supporting citizens in times of crisis,
                the objective remains the same: clear strategy, principled action,
                and disciplined execution.
              </p>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
