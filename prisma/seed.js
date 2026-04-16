const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const password = process.env.ADMIN_PASSWORD || "ChangeMe123!";
  const email = process.env.ADMIN_EMAIL || "admin@shakilahmad.com";
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: { passwordHash, name: "Shakil Ahmad" },
    create: {
      email,
      name: "Shakil Ahmad",
      passwordHash
    }
  });

  const practiceAreas = [
    {
      slug: "litigation",
      title: "Litigation",
      icon: "Scale",
      summary: "Strategic courtroom advocacy built on rigorous preparation and decisive execution.",
      description:
        "From pre-trial positioning to final hearing advocacy, each litigation mandate is handled with deep procedural discipline, evidence strategy, and a relentless focus on the client’s commercial and legal objectives."
    },
    {
      slug: "corporate-law",
      title: "Corporate Law",
      icon: "BriefcaseBusiness",
      summary: "Boardroom-ready counsel for growth, structure, governance, and transactional confidence.",
      description:
        "Corporate advisory services span entity structuring, governance, contracts, shareholder matters, due diligence, and legal risk controls tailored to ambitious businesses and promoters."
    },
    {
      slug: "documentation",
      title: "Documentation",
      icon: "FileText",
      summary: "Precision drafting that protects value, reduces ambiguity, and prevents disputes.",
      description:
        "Contracts, notices, deeds, agreements, internal policies, and regulatory documentation are crafted with commercial clarity, enforceability, and detail-oriented risk allocation."
    },
    {
      slug: "arbitration",
      title: "Arbitration",
      icon: "Landmark",
      summary: "Private dispute resolution strategy designed for speed, confidentiality, and leverage.",
      description:
        "Arbitration matters are managed with a balanced approach combining procedural agility, evidentiary strategy, negotiation leverage, and outcome-oriented advocacy."
    },
    {
      slug: "income-tax",
      title: "Income Tax",
      icon: "BadgeDollarSign",
      summary: "Clear tax guidance for assessments, disputes, compliance, and strategic positioning.",
      description:
        "Income tax services cover advisory, assessments, notices, litigation support, compliance strategy, and issue-specific representation with strong command of commercial realities."
    },
    {
      slug: "vat",
      title: "VAT",
      icon: "ReceiptText",
      summary: "Commercially grounded VAT counsel across compliance, disputes, and documentation.",
      description:
        "VAT matters are approached through a practical blend of statutory interpretation, operational process review, and defendable compliance structures."
    }
  ];

  for (const area of practiceAreas) {
    await prisma.practiceArea.upsert({
      where: { slug: area.slug },
      update: area,
      create: area
    });
  }

  const caseStudies = [
    {
      slug: "cross-border-shareholder-dispute",
      title: "Cross-Border Shareholder Dispute",
      excerpt: "Stabilized a high-value business conflict while preserving governance continuity.",
      problem:
        "A leadership deadlock involving ownership rights and board control threatened business continuity and investor confidence.",
      strategy:
        "Structured a coordinated approach combining legal notices, governance analysis, negotiation leverage, and targeted dispute preparation.",
      outcome:
        "The matter moved toward a commercially acceptable settlement while preserving the company’s operational standing and strategic optionality.",
      featured: true
    },
    {
      slug: "vat-risk-restructuring",
      title: "VAT Risk Restructuring for Growth Company",
      excerpt: "Reframed documentation and workflows to reduce compliance exposure at scale.",
      problem:
        "Rapid expansion exposed the company to VAT documentation gaps and process inconsistencies across departments.",
      strategy:
        "Delivered a legal-process audit, redesigned internal documentation standards, and aligned evidence flows with statutory requirements.",
      outcome:
        "The company gained stronger compliance confidence, cleaner audit readiness, and clearer internal accountability."
    },
    {
      slug: "high-stakes-litigation-strategy",
      title: "High-Stakes Litigation Strategy",
      excerpt: "Built a disciplined litigation posture that strengthened leverage before hearing.",
      problem:
        "A complex dispute carried financial, reputational, and timeline risk across multiple counterparties.",
      strategy:
        "Created a sequenced litigation strategy with evidentiary mapping, pressure-point analysis, and hearing preparedness.",
      outcome:
        "The client entered proceedings with stronger leverage, tighter arguments, and a more favorable negotiation position."
    }
  ];

  for (const study of caseStudies) {
    await prisma.caseStudy.upsert({
      where: { slug: study.slug },
      update: study,
      create: study
    });
  }

  const testimonials = [
    {
      name: "Managing Director, Industrial Group",
      role: "Corporate Client",
      company: "Confidential",
      quote:
        "Shakil Ahmad combines courtroom strength with boardroom clarity. His advice is measured, commercially astute, and deeply dependable."
    },
    {
      name: "Founder, Growth Venture",
      role: "Business Founder",
      company: "Private",
      quote:
        "We relied on his judgment during a sensitive legal inflection point. The quality of documentation and strategic thinking was exceptional."
    },
    {
      name: "Senior Executive",
      role: "Private Client",
      company: "N/A",
      quote:
        "Calm under pressure, precise in communication, and unwavering in execution. He gave us confidence when it mattered most."
    }
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.upsert({
      where: { id: `${testimonial.name}-${testimonial.role}` },
      update: testimonial,
      create: { id: `${testimonial.name}-${testimonial.role}`, ...testimonial }
    });
  }

  await prisma.blogPost.upsert({
    where: { slug: "the-new-standard-for-corporate-legal-readiness" },
    update: {},
    create: {
      title: "The New Standard for Corporate Legal Readiness",
      slug: "the-new-standard-for-corporate-legal-readiness",
      excerpt:
        "Why modern businesses need legal architecture that is proactive, documented, and commercially intelligent.",
      coverImage:
        "https://images.unsplash.com/photo-1528747008803-1b92fe4f3fbd?auto=format&fit=crop&w=1200&q=80",
      status: "PUBLISHED",
      featured: true,
      publishedAt: new Date(),
      content: `
        <h2>Legal readiness is no longer a reactive function.</h2>
        <p>For serious businesses, legal structure has become part of operational excellence. Contracts, governance, compliance systems, and dispute preparedness now influence speed, confidence, and enterprise value.</p>
        <h3>What high-performing companies do differently</h3>
        <ul>
          <li>They review risk before transactions, not after conflict.</li>
          <li>They standardize documents so teams can move faster with fewer errors.</li>
          <li>They treat tax and compliance as strategic layers, not administrative chores.</li>
        </ul>
        <p>The strongest legal strategy is often invisible. It is embedded in the way a company approves, signs, records, and escalates decisions.</p>
      `
    }
  });

  console.log("Database seeded successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
