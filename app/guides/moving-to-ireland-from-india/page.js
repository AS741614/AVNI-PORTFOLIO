import Link from "next/link";
import { SITE } from "@/lib/config";
import Newsletter from "@/components/Newsletter";
import { CompassIcon } from "@/components/icons";
import { InlineDoodle, PlaneDoodle } from "@/components/Doodles";

const BASE = "https://avniinireland.com";
const URL = `${BASE}/guides/moving-to-ireland-from-india`;

export const metadata = {
  title: "Moving to Ireland from India as a student — the honest guide",
  description:
    "A first-hand guide to moving from India to Ireland to study: choosing a course, the application, budgeting, finding accommodation in Dublin, your first week (PPS, bank, Leap Card, IRP), and working after you graduate.",
  keywords: [
    "moving to Ireland from India",
    "study in Ireland for Indian students",
    "Ireland study guide",
    "MSc in Ireland",
    "student life Dublin",
    "Indian students Ireland",
    "living in Dublin",
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: "Moving to Ireland from India as a student — the honest guide",
    description:
      "What I actually did, in order: course choice, application, money, accommodation, first week in Dublin, and working after graduation.",
    url: URL,
    type: "article",
    images: ["/opengraph-image"],
  },
};

// Article + HowTo. HowTo is what Google uses for step-style rich results, and
// it's what answer engines lift when someone asks "how do I move to Ireland
// from India to study?" — the exact query this page is written for.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${URL}#article`,
      headline: "Moving to Ireland from India as a student — the honest guide",
      description:
        "A first-hand guide to moving from India to Ireland to study, written by someone who did it and now works in Dublin.",
      author: { "@id": `${BASE}/#avni` },
      publisher: { "@id": `${BASE}/#avni` },
      isPartOf: { "@id": `${BASE}/#site` },
      mainEntityOfPage: URL,
      inLanguage: "en",
      about: [
        { "@type": "Thing", name: "Studying in Ireland" },
        { "@type": "Thing", name: "International students" },
        { "@type": "Place", name: "Dublin, Ireland" },
      ],
    },
    {
      "@type": "HowTo",
      "@id": `${URL}#howto`,
      name: "How to move from India to Ireland as a student",
      description:
        "The sequence I followed to move from India to Dublin for a Master's, and then into a job here.",
      step: [
        { "@type": "HowToStep", position: 1, name: "Pick the course before the country", url: `${URL}#course` },
        { "@type": "HowToStep", position: 2, name: "Apply, and get your documents in order early", url: `${URL}#apply` },
        { "@type": "HowToStep", position: 3, name: "Budget by category, not by a number you read online", url: `${URL}#money` },
        { "@type": "HowToStep", position: 4, name: "Start the accommodation hunt far earlier than feels sensible", url: `${URL}#accommodation` },
        { "@type": "HowToStep", position: 5, name: "Do the boring admin in your first week", url: `${URL}#first-week` },
        { "@type": "HowToStep", position: 6, name: "Start job hunting before you graduate", url: `${URL}#working` },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE },
        { "@type": "ListItem", position: 2, name: "Guides", item: `${BASE}/guides` },
        {
          "@type": "ListItem",
          position: 3,
          name: "Moving to Ireland from India",
          item: URL,
        },
      ],
    },
  ],
};

function Section({ id, title, children }) {
  return (
    <section id={id} className="mt-12 scroll-mt-24">
      <h2 className="font-display text-2xl mb-4" style={{ fontFamily: "var(--font-display)" }}>
        {title}
      </h2>
      <div className="text-[17px] leading-8 space-y-4" style={{ color: "var(--ink)" }}>
        {children}
      </div>
    </section>
  );
}

const CONTENTS = [
  { id: "course", label: "Pick the course before the country" },
  { id: "apply", label: "Applying, and the paperwork" },
  { id: "money", label: "Money: how to actually budget" },
  { id: "accommodation", label: "Accommodation — the hard part" },
  { id: "first-week", label: "Your first week in Dublin" },
  { id: "settling", label: "Settling in (and homesickness)" },
  { id: "working", label: "Working during and after study" },
  { id: "differently", label: "What I'd do differently" },
];

export default function MovingToIrelandGuide() {
  return (
    <div className="container-x py-12 max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <p className="text-sm font-bold mb-3" style={{ color: "var(--red)" }}>
        <Link href="/guides">Guides</Link> → Moving to Ireland
      </p>

      <h1 className="font-display text-4xl mb-4 leading-tight" style={{ fontFamily: "var(--font-display)" }}>
        Moving to Ireland from India as a student
        <InlineDoodle rotate={8}>
          <PlaneDoodle size={30} />
        </InlineDoodle>
      </h1>

      <p className="text-lg mb-6" style={{ color: "var(--muted)" }}>
        I moved from Aligarh to Dublin for an MSc in Data Analytics at National College of Ireland, and I've been
        working here as a Data Analyst at permanent tsb since October 2024. This is the sequence I actually followed,
        including the parts nobody warns you about.
      </p>

      {/* Trust box — E-E-A-T signal, and genuinely useful framing for the reader */}
      <div className="card-pop p-5 mb-8" style={{ background: "var(--yellow)" }}>
        <p className="text-sm leading-7">
          <strong>Why trust this one:</strong> I'm not an agency and I don't earn commission from any college. I did
          this move myself, got the degree, and then got hired here. Where something depends on official immigration
          rules, I say so and point you at the official source instead of guessing — those rules change, and getting
          them wrong costs you a visa.
        </p>
      </div>

      {/* Table of contents — helps users, and gives Google jump-links in results */}
      <nav aria-label="On this page" className="card-pop p-5 mb-4">
        <p className="font-bold mb-3">On this page</p>
        <ol className="text-[15px] leading-8 list-decimal pl-5" style={{ color: "var(--ink)" }}>
          {CONTENTS.map((c) => (
            <li key={c.id}>
              <a href={`#${c.id}`} style={{ color: "var(--red)", fontWeight: 600 }}>
                {c.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <Section id="course" title="1. Pick the course before you pick the country">
        <p>
          The mistake I see most often is falling in love with a country and then hunting for any course that gets you
          there. Do it the other way around. Work out what you want to be doing in three years, then find the course
          that gets you there — and only then check which countries teach it well.
        </p>
        <p>
          I chose Data Analytics because I already had a B.Tech in Computer Science and a few years in the industry at
          Magic Software and HCL, and analytics was the direction I actually wanted to move in. That continuity
          mattered more than I expected: it made my application coherent, and later it made me an easier hire, because
          my CV told one story instead of three.
        </p>
        <p>
          On the college itself — I studied at National College of Ireland, which sits in Dublin's IFSC financial
          district. Being physically near the industry you want to work in is an underrated advantage. Whatever you
          choose, look at where its graduates actually end up, not the brochure.
        </p>
      </Section>

      <Section id="apply" title="2. Applying, and getting your paperwork in order">
        <p>
          Start earlier than the deadlines suggest. Not because the application takes long, but because everything
          feeding into it does: transcripts from your Indian university, English-language test results if required,
          reference letters from people who take weeks to reply, financial documentation, and passport validity.
        </p>
        <p>
          Keep one folder — digital and physical — with every document scanned clearly. You will be asked for the same
          five documents by four different people, and the students who sail through are simply the ones who can send
          them within the hour.
        </p>
        <p>
          On the visa and immigration side, I'm deliberately not going to give you specifics here. The rules genuinely
          change, and your situation depends on your course level, duration and nationality. Use the official Irish
          Immigration Service guidance as your source of truth, and treat every blog and YouTube video — including
          mine — as context, not instructions.
        </p>
      </Section>

      <Section id="money" title="3. Money: budget by category, not by a number you read online">
        <p>
          Every "cost of living in Dublin" article gives you a single monthly figure, and every one of them is wrong
          for somebody. The figure swings enormously depending on where you live, whether you're sharing, and how you
          eat. So rather than repeat a number that'll age badly, here's the structure to build your own:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Tuition</strong> — separate from everything below, usually paid in instalments. Know your dates.
          </li>
          <li>
            <strong>Accommodation</strong> — the single biggest variable by a wide margin, and the one worth optimising
            hardest. See the next section.
          </li>
          <li>
            <strong>Setup costs, month one</strong> — deposit, bedding, kitchen basics, a SIM, maybe a winter coat you
            didn't own in India. Always higher than people plan for. Budget for a spike.
          </li>
          <li>
            <strong>Food and groceries</strong> — where cooking versus eating out changes your monthly total more than
            any other habit.
          </li>
          <li>
            <strong>Transport</strong> — get a Leap Card early; student fares are significantly cheaper than paying per
            journey.
          </li>
          <li>
            <strong>Phone, utilities, and the small recurring things</strong> — individually trivial, collectively not.
          </li>
          <li>
            <strong>A genuine buffer</strong> — for the month something goes wrong, because one will.
          </li>
        </ul>
        <p>
          If you want real current numbers for your specific course and city, that's exactly what I go through in a 1:1
          session — because giving you my actual figures is useful, and inventing an average for the internet isn't.
        </p>
      </Section>

      <Section id="accommodation" title="4. Accommodation — start earlier than feels sensible">
        <p>
          This is the hardest part of moving to Dublin, and I'd rather be blunt about it than sell you a fantasy. The
          rental market here is genuinely competitive, and it is the thing most likely to cause you stress in your
          first months.
        </p>
        <p>What actually separates students who land somewhere decent from students who don't:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>They started before arriving.</strong> Not the week they landed.
          </li>
          <li>
            <strong>They had documents ready to send instantly</strong> — offer letter, ID, proof of funds. Listings go
            fast; the reply speed genuinely decides it.
          </li>
          <li>
            <strong>They were flexible on location.</strong> Living a longer commute out is often the difference
            between affordable and impossible, and Dublin's transport makes it workable.
          </li>
          <li>
            <strong>They treated it as a numbers game</strong> rather than waiting for the perfect place.
          </li>
        </ul>
        <p>
          Purpose-built student accommodation and house shares are the two realistic routes for most people arriving.
          Be careful of anyone asking for a large deposit before you've seen a place or verified who they are —
          accommodation scams target new international students specifically, precisely because they're desperate and
          far away.
        </p>
      </Section>

      <Section id="first-week" title="5. Your first week in Dublin: the boring admin that unblocks everything">
        <p>
          Nothing here is exciting, and all of it gates something you'll need later. Do it in the first week, not the
          first month:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>PPS number</strong> — Ireland's personal public service number. You need it to work and to access
            public services. Apply as early as you can; appointments can take time.
          </li>
          <li>
            <strong>Irish bank account</strong> — much easier once you have proof of address and your college letter.
          </li>
          <li>
            <strong>Leap Card</strong> — with the student version if you're eligible. Do this on day one.
          </li>
          <li>
            <strong>Immigration registration (IRP)</strong> — register within the timeframe you're given. Check
            official guidance for the current process and don't leave it late.
          </li>
          <li>
            <strong>Register with a GP</strong> — before you're ill, not while you're ill.
          </li>
          <li>
            <strong>An Irish SIM</strong> — cheap, and needed for basically every verification step above.
          </li>
        </ul>
      </Section>

      <Section id="settling" title="6. Settling in, and the part people don't post about">
        <p>
          The logistics are the easy half. The harder half is the evening in November when it's dark at four, you've
          eaten the same pasta three days running, and a festival is happening at home that nobody around you has
          heard of. That hit me harder than any paperwork.
        </p>
        <p>
          What helped: finding the Indian grocery shops early, cooking properly instead of surviving on convenience
          food, saying yes to invitations in the first month while everyone is still forming groups, and calling home
          on a schedule rather than only when I was low. And going outside — Ireland is genuinely beautiful, and the
          weekends I spent on the coast or up in the hills did more for my head than anything else.
        </p>
        <p>
          I started filming partly for this reason: it turned homesick evenings into something I was making instead of
          something I was enduring.
        </p>
      </Section>

      <Section id="working" title="7. Working during your course, and after it">
        <p>
          Ireland has a well-established post-study pathway that lets graduates stay and look for work, and that's the
          route I took into my analyst role. Your specific eligibility depends on your course and circumstances, and
          the rules do change — so check the current official guidance rather than relying on any creator's summary,
          mine included.
        </p>
        <p>
          The practical advice I'd actually stand behind is this: <strong>start applying before you graduate, not
          after.</strong> Irish hiring processes take time, and finishing your dissertation with zero applications out
          is a stressful way to begin. Go to meetups, use your college's careers service properly, and treat LinkedIn
          as a working tool rather than a trophy cabinet.
        </p>
        <p>
          Prior work experience from India counts for more than people assume. Mine was a large part of why I landed a
          role at an Irish bank rather than starting from zero.
        </p>
      </Section>

      <Section id="differently" title="8. What I'd do differently">
        <p>
          I'd have started the accommodation search earlier — that's the honest one. I'd have worried less about
          having a perfect plan for after graduation and more about talking to people already doing the job I wanted.
          And I'd have been kinder to myself in the first three months, which are hard for almost everyone and which
          nobody photographs.
        </p>
        <p>
          The move was worth it. Not because it was smooth — it wasn't — but because the version of me on the other
          side of it is someone I like more.
        </p>
      </Section>

      <div className="card-pop halftone p-8 text-center mt-14" style={{ background: "var(--yellow)" }}>
        <p className="font-display text-2xl mb-2" style={{ fontFamily: "var(--font-display)" }}>
          Questions this guide didn't answer?
        </p>
        <p className="text-sm mb-6 max-w-lg mx-auto">
          Book a 1:1 and ask me directly — your course, your budget, your timeline. I've done the move and I work here
          now, so the answers are first-hand rather than theoretical.
        </p>
        <a href={SITE.topmate} target="_blank" rel="noopener noreferrer" className="btn-pop">
          <CompassIcon size={15} /> Book a 1:1
        </a>
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link href="/faq" className="text-sm font-bold" style={{ color: "var(--red)" }}>
          Read the FAQ →
        </Link>
        <Link href="/about" className="text-sm font-bold" style={{ color: "var(--red)" }}>
          My full story →
        </Link>
        <Link href="/stories" className="text-sm font-bold" style={{ color: "var(--red)" }}>
          Watch the videos →
        </Link>
      </div>

      <div className="mt-12">
        <Newsletter />
      </div>
    </div>
  );
}
