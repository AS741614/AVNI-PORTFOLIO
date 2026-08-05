import { SITE } from "./config";

// Single source of truth for the FAQ page UI *and* its FAQPage JSON-LD, so the
// visible answer and the structured-data answer can never drift apart (Google
// penalises schema that doesn't match on-page content).
//
// Answers are deliberately grounded in Avni's own first-hand experience rather
// than generic scraped statistics: unique first-person answers are what answer
// engines and AI Overviews actually quote, and they're the part no competitor
// can copy. Anything regulatory (visas, immigration) points to official sources
// instead of giving advice.
export const FAQS = [
  {
    category: "About Avni",
    q: "Who is Avni in Ireland?",
    a: `Avni is an Indian creator based in Dublin, Ireland. She grew up in Aligarh, Uttar Pradesh, studied B.Tech Computer Science at Amity University Noida, and worked at Magic Software and HCL Technologies before moving to Ireland for an MSc in Data Analytics at National College of Ireland (NCI). Since October 2024 she has worked full-time as a Data Analyst at permanent tsb (PTSB), and she makes videos about Ireland travel, international-student life and Indian culture abroad alongside that job — not instead of it.`,
  },
  {
    category: "About Avni",
    q: "Did Avni get married in Ireland or in India?",
    a: `In India. Avni married Akash on 2 February 2026 with a full traditional Indian wedding — Haldi, Varmala and Saat Phera ceremonies — back home in India, not in Ireland. The ceremonies were filmed and became some of the most-watched videos on the channel.`,
  },
  {
    category: "Moving to Ireland",
    q: "How did you move from India to Ireland as a student?",
    a: `The route was: finish a B.Tech in Computer Science in India, work a few years in the industry (Magic Software, then HCL Technologies), then apply to an Irish university for a Master's — in my case MSc Data Analytics at National College of Ireland in Dublin. Having real work experience before the Master's made a genuine difference both to the application and to finding a job here afterwards. The hardest part wasn't the paperwork, it was the conversation at home: I sat my parents down and talked it through properly rather than presenting it as a decision already made.`,
  },
  {
    category: "Moving to Ireland",
    q: "What does it actually cost to live in Dublin as an international student?",
    a: `The honest answer is that it varies more than any blog figure suggests — accommodation is by far the biggest variable and it swings dramatically depending on whether you're in student housing, a shared flat, or renting alone, and how far out from the city centre you're willing to live. Rather than quote a number that ages badly, the way to budget is by category: accommodation, food and groceries, transport (a Leap Card is worth getting on day one), phone and utilities, college fees separate from all of the above, and a buffer for setup costs in your first month, which are always higher than you expect. If you want real current numbers for your specific situation, that's exactly what I go through in a 1:1 session.`,
  },
  {
    category: "Moving to Ireland",
    q: "How do you find accommodation in Dublin?",
    a: `Start earlier than you think you need to, and treat it as a numbers game. Dublin's rental market is genuinely competitive, so the students who land somewhere good are usually the ones who started looking well before arriving, had their documents ready to send immediately, and were flexible about location and commuting. Student accommodation and shared housing are the two realistic routes for most people arriving. This is one of the most common things people book a mentoring session about, because the practical detail matters more than the general advice.`,
  },
  {
    category: "Studying & working",
    q: "Is National College of Ireland (NCI) good for an MSc in Data Analytics?",
    a: `It worked for me — I did the MSc in Data Analytics at NCI and I'm now working as a Data Analyst at permanent tsb, an Irish bank, so the course did the job it was supposed to do. NCI sits right in Dublin's IFSC financial district, which is genuinely useful for networking and for the kind of analytics roles that exist in Dublin. As with any course, what you get out depends heavily on what you put in and how early you start job hunting.`,
  },
  {
    category: "Studying & working",
    q: "Can international students work in Ireland after finishing a Master's?",
    a: `Yes — Ireland has a well-established post-study pathway that lets graduates stay and look for work, and that's the route I took into my current analyst role. Immigration rules do change and your eligibility depends on your specific course, level and circumstances, so always check the current official guidance from Irish Immigration Service Delivery rather than relying on any creator's summary, including mine. What I can speak to is the practical side: start applying before you graduate, not after.`,
  },
  {
    category: "Studying & working",
    q: "How do you make videos while working a full-time job?",
    a: `Badly, sometimes — and that's the honest answer. I'm a Data Analyst at permanent tsb Monday to Friday, so filming and editing happen around it: evenings, weekends, and on trips I'd be taking anyway. Dashboards by day, storyboards by night. The reason the videos look like real life is that they are real life, filmed around a real job.`,
  },
  {
    category: "Work with me",
    q: "Do you offer 1:1 sessions or mentoring?",
    a: `Yes. I do 1:1 advisory sessions for internationals moving to Ireland — covering jobs and applications, accommodation, cost of living, college life, and career direction after graduation. I've done the move myself and now work here full time, so the advice is first-hand rather than theoretical. Sessions are booked through Topmate; the link is on the Work with me page.`,
  },
  {
    category: "Work with me",
    q: "Can brands collaborate with you?",
    a: `Yes — sponsored videos, Instagram content, longer-term ambassadorships, and travel or experience collaborations. The audience is a mix international students living abroad and the Indian diaspora, which is a combination most brands struggle to reach in one place. The fastest way to start is an email to ${SITE.email} with the brand and the campaign idea.`,
  },
];

export const FAQ_CATEGORIES = [...new Set(FAQS.map((f) => f.category))];

// Schema.org FAQPage — the structure Google reads for rich results, People
// Also Ask, and AI Overview grounding.
export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://avniinireland.com/faq#faqpage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
