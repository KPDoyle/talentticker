export const stages = ["Prospect", "Contacted", "Active", "Success"] as const;
export const signalTypes = ["All signals", "Funding", "Expansion", "Leadership", "Hiring", "Market update"];
export type Stage = (typeof stages)[number];
export type Company = { id: string; name: string; sector: string; location: string; employees: number; website: string; description: string; color: string };
export type Signal = { id: string; companyId: string; title: string; type: string; date: string; summary: string; source: string; url: string; sample: boolean };
export type Contact = { id: string; companyId: string; name: string; role: string; location: string; email: string; skills: string; sample: boolean };
export type Vacancy = { id: string; companyId: string; title: string; location: string; type: string; salary: string; skills: string; url: string; sample: boolean };
export type Ticket = { id: string; companyId: string; title: string; stage: Stage; value: number; notes: string; due: string; contactIds: string[]; signalId: string; created: string };
export type Project = { id: string; name: string; description: string; contactIds: string[]; created: string };
export type Filters = { query: string; sector: string; location: string; type: string };
export type SavedSearch = Filters & { id: string; name: string; section: string };
export type TTState = { version: 1; companies: Company[]; signals: Signal[]; contacts: Contact[]; vacancies: Vacancy[]; tickets: Ticket[]; projects: Project[]; searches: SavedSearch[]; watchlist: string[]; savedSignals: string[]; lastRefreshed: string };
export const emptyFilters: Filters = { query: "", sector: "All sectors", location: "All locations", type: "All signals" };
const companyRows = [
  ["Northstar AI", "Technology", "London", 180, "Applied AI for enterprise operations and responsible automation.", "#e85d36"],
  ["Meridian Capital", "Finance", "London", 420, "Independent investment and financial advisory services.", "#6955b5"],
  ["Helix Health", "Healthcare", "Cambridge", 95, "Connected diagnostics and digital healthcare infrastructure.", "#318875"],
  ["VoltGrid Energy", "Energy", "Bristol", 210, "Software and services for a flexible, lower-carbon energy grid.", "#6b7d31"],
  ["Atlas Cyber", "Technology", "Manchester", 130, "Cybersecurity, risk management and cloud assurance.", "#476c9e"],
  ["Cedar Legal", "Legal", "Birmingham", 260, "Commercial legal advice for high-growth businesses.", "#a16d4e"],
  ["Aster Robotics", "Technology", "Oxford", 75, "Industrial robotics for advanced manufacturing.", "#b64d70"],
  ["Harbour Fintech", "Finance", "Edinburgh", 160, "Payments and treasury infrastructure for businesses.", "#477d8c"],
  ["Radius Diagnostics", "Healthcare", "Leeds", 320, "Regional diagnostic centres and clinical service delivery.", "#887049"],
  ["Evergreen Systems", "Energy", "Bristol", 65, "Energy optimisation and building management software.", "#58785d"],
];
export const seedCompanies: Company[] = companyRows.map((r, i) => ({ id: `c${i + 1}`, name: String(r[0]), sector: String(r[1]), location: String(r[2]), employees: Number(r[3]), website: "", description: String(r[4]), color: String(r[5]) }));
const signalRows = [
  ["c1", "Funding", "Northstar AI closes £24m growth round", "New investment is earmarked for product development and an expanded engineering team."],
  ["c3", "Expansion", "Helix Health plans a new Cambridge innovation centre", "A new diagnostics facility creates potential demand for clinical and technology specialists."],
  ["c2", "Leadership", "Meridian Capital appoints a Chief Technology Officer", "A leadership change may lead to a review of the technology roadmap and delivery partners."],
  ["c4", "Hiring", "VoltGrid Energy opens eight engineering roles", "The team is expanding its software and power-systems capability in Bristol."],
  ["c5", "Expansion", "Atlas Cyber establishes a Manchester delivery hub", "A regional expansion plan covers security operations and consulting services."],
  ["c7", "Funding", "Aster Robotics secures £12m to scale production", "The business plans to grow its manufacturing and robotics engineering teams."],
  ["c8", "Leadership", "Harbour Fintech announces a new Head of People", "The new role is intended to support the next phase of organisational growth."],
  ["c6", "Hiring", "Cedar Legal launches a commercial associate campaign", "New practice capacity is planned across corporate and commercial specialisms."],
  ["c9", "Expansion", "Radius Diagnostics plans two regional centres", "The proposed centres would require clinical leadership and operational capability."],
  ["c10", "Funding", "Evergreen Systems raises £6m for product expansion", "The product team plans to develop its building energy optimisation platform."],
  ["c1", "Hiring", "Northstar AI expands its enterprise solutions team", "Recruitment spans enterprise sales, customer success and implementation."],
  ["c2", "Market update", "Meridian Capital outlines a digital transformation programme", "The programme includes data platforms, governance and client experience."],
];
const names = ["Alex Morgan", "Jamie Patel", "Sam Taylor", "Jordan Ellis", "Casey Williams", "Robin Clarke", "Drew Bennett", "Avery Shaw", "Blair Lewis", "Cameron Reed", "Charlie Hayes", "Frankie Brooks", "Jules Parker", "Morgan Bell", "Riley Green", "Taylor Wood", "Quinn Adams", "Ellis Ward", "Rowan Scott", "Skyler James"];
export function makeInitialState(): TTState {
  const contacts: Contact[] = names.map((name, i) => ({ id: `p${i + 1}`, companyId: `c${i % 10 + 1}`, name, role: i < 10 ? ["VP Engineering", "Talent Director", "Clinical Director", "Head of People", "Chief Technology Officer", "Managing Partner", "Head of Robotics", "VP Product", "Operations Director", "Engineering Director"][i] : ["Engineering Manager", "Head of Data", "Head of Talent", "Software Engineer", "Security Architect", "Senior Associate", "Robotics Engineer", "Talent Partner", "Clinical Lead", "Product Manager"][i - 10], location: seedCompanies[i % 10].location, email: `${name.toLowerCase().replace(/ /g, ".")}@example.com`, skills: ["AI, Python, engineering", "Finance, leadership, data", "Healthcare, diagnostics, clinical", "Energy, software, renewables", "Cybersecurity, cloud, assurance"][i % 5], sample: true }));
  const signals: Signal[] = signalRows.map((r, i) => ({ id: `s${i + 1}`, companyId: r[0], type: r[1], title: r[2], summary: r[3], date: `2026-11-${String(19 - Math.floor(i / 3)).padStart(2, "0")}T09:00:00.000Z`, source: "Illustrative scenario", url: "", sample: true }));
  const roles = ["Senior Machine Learning Engineer", "Director of Data", "Clinical Product Lead", "Power Systems Engineer", "Security Architect", "Corporate Associate", "Robotics Software Engineer", "Senior Product Manager", "Clinical Operations Manager", "Full Stack Engineer"];
  return { version: 1, companies: seedCompanies.map(c => ({ ...c })), signals, contacts, vacancies: roles.map((title, i) => ({ id: `v${i + 1}`, companyId: `c${i + 1}`, title, location: seedCompanies[i].location, type: i === 3 || i === 8 ? "Contract" : "Permanent", salary: ["£85k–£110k", "£110k–£145k", "£70k–£90k", "£550–£700/day", "£90k–£120k"][i % 5], skills: contacts[i].skills, url: "", sample: true })), tickets: [
    { id: "t1", companyId: "c1", title: "Engineering team expansion", stage: "Prospect", value: 24000, notes: "Research the engineering leadership team before preparing an introduction.", due: "", contactIds: ["p1"], signalId: "s1", created: "2026-11-19T09:00:00.000Z" },
    { id: "t2", companyId: "c3", title: "New innovation centre", stage: "Contacted", value: 18000, notes: "Discovery meeting requested. Map specialist roles and timing.", due: "", contactIds: ["p3"], signalId: "s2", created: "2026-11-18T09:00:00.000Z" },
    { id: "t3", companyId: "c5", title: "Manchester security practice", stage: "Active", value: 32000, notes: "Scope a shortlist for the new security operations team.", due: "", contactIds: ["p5"], signalId: "s5", created: "2026-11-17T09:00:00.000Z" },
    { id: "t4", companyId: "c8", title: "Product leadership placement", stage: "Success", value: 15000, notes: "Illustrative completed placement.", due: "", contactIds: ["p8"], signalId: "s7", created: "2026-11-16T09:00:00.000Z" },
  ], projects: [{ id: "project1", name: "AI engineering leaders", description: "A focused shortlist for enterprise AI and engineering searches.", contactIds: ["p1", "p5", "p11"], created: "2026-11-19T09:00:00.000Z" }], searches: [], watchlist: ["c1", "c3", "c5"], savedSignals: ["s1", "s2"], lastRefreshed: "" };
}
export function uid(prefix: string) { return `${prefix}-${crypto.randomUUID()}`; }
export function safeUrl(value: string) { try { const u = new URL(value); return u.protocol === "https:" || u.protocol === "http:" ? u.href : ""; } catch { return ""; } }
export function matchesFilters(text: string, company: Company | undefined, filters: Filters, type?: string, location?: string) {
  const tokens = filters.query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const haystack = `${text} ${company?.name || ""} ${company?.sector || ""} ${location || company?.location || ""}`.toLowerCase();
  return tokens.every(token => haystack.includes(token)) && (filters.sector === "All sectors" || company?.sector === filters.sector) && (filters.location === "All locations" || (location || company?.location) === filters.location) && (!type || filters.type === "All signals" || filters.type === "All types" || filters.type === type);
}
export function companyScore(id: string, data: TTState) {
  const ss = data.signals.filter(s => s.companyId === id);
  return Math.min(99, 20 + ss.reduce((sum, s) => sum + ({ Funding: 22, Expansion: 18, Leadership: 12, Hiring: 15 }[s.type] || 5), 0) + Math.min(20, data.vacancies.filter(v => v.companyId === id).length * 8));
}
export function csv(rows: unknown[][]) {
  return rows.map(row => row.map(value => { let text = String(value ?? ""); if (/^[\s]*[=+@-]/.test(text)) text = "'" + text; return '"' + text.replace(/"/g, '""') + '"'; }).join(",")).join("\r\n");
}
const isObject = (v: unknown): v is Record<string, unknown> => !!v && typeof v === "object" && !Array.isArray(v);
const strings = (v: Record<string, unknown>, keys: string[]) => keys.every(k => typeof v[k] === "string" && (v[k] as string).length <= 20000);
const ids = (v: unknown): v is string[] => Array.isArray(v) && v.length <= 10000 && v.every(x => typeof x === "string" && x.length <= 300) && new Set(v).size === v.length;
export function validateState(v: unknown): v is TTState {
  if (!isObject(v) || v.version !== 1 || typeof v.lastRefreshed !== "string") return false;
  const specs: Record<string, string[]> = { companies: ["id", "name", "sector", "location", "website", "description", "color"], signals: ["id", "companyId", "title", "type", "date", "summary", "source", "url"], contacts: ["id", "companyId", "name", "role", "location", "email", "skills"], vacancies: ["id", "companyId", "title", "location", "type", "salary", "skills", "url"], tickets: ["id", "companyId", "title", "stage", "notes", "due", "signalId", "created"], projects: ["id", "name", "description", "created"], searches: ["id", "name", "section", "query", "sector", "location", "type"] };
  for (const [key, keys] of Object.entries(specs)) {
    const list = v[key];
    if (!Array.isArray(list) || list.length > 10000 || !list.every(item => isObject(item) && strings(item, keys) && !!item.id) || new Set(list.map(x => x.id)).size !== list.length) return false;
  }
  const state = v as unknown as TTState;
  const companyIds = new Set(state.companies.map(c => c.id));
  const contactIds = new Set(state.contacts.map(c => c.id));
  const signalIds = new Set(state.signals.map(s => s.id));
  return state.companies.every(c => Number.isFinite(c.employees) && c.employees >= 0 && /^#[a-f\d]{6}$/i.test(c.color)) &&
    state.signals.every(s => (!s.companyId || companyIds.has(s.companyId)) && typeof s.sample === "boolean") &&
    state.contacts.every(c => companyIds.has(c.companyId) && typeof c.sample === "boolean") &&
    state.vacancies.every(c => companyIds.has(c.companyId) && typeof c.sample === "boolean") &&
    state.tickets.every(t => stages.includes(t.stage) && (!t.companyId || companyIds.has(t.companyId)) && Number.isFinite(t.value) && t.value >= 0 && ids(t.contactIds) && t.contactIds.every(id => contactIds.has(id)) && (!t.signalId || signalIds.has(t.signalId))) &&
    state.projects.every(p => ids(p.contactIds) && p.contactIds.every(id => contactIds.has(id))) &&
    state.searches.every(s => ["News", "Vacancies", "Market mapping"].includes(s.section)) &&
    ids(state.watchlist) && state.watchlist.every(id => companyIds.has(id)) && ids(state.savedSignals) && state.savedSignals.every(id => signalIds.has(id));
}
export function decodeXml(text: string) { return text.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").replace(/<[^>]*>/g, "").replace(/&(#\d+|#x[\da-f]+|amp|lt|gt|quot|apos);/gi, (_, entity: string) => { const named: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" }; const code = entity.startsWith("#x") ? parseInt(entity.slice(2), 16) : entity.startsWith("#") ? parseInt(entity.slice(1), 10) : 0; return named[entity] || (code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : ""); }).trim(); }
export function parseRss(xml: string, source: string): Signal[] {
  return (xml.match(/<item\b[^>]*>[\s\S]*?<\/item>/gi) || []).slice(0, 25).flatMap((item, index) => {
    const tag = (name: string) => decodeXml(item.match(new RegExp(`<${name}\\b[^>]*>([\\s\\S]*?)<\\/${name}>`, "i"))?.[1] || "");
    const title = tag("title"); const url = safeUrl(tag("link")); const date = new Date(tag("pubDate"));
    if (!title || !url || !Number.isFinite(date.getTime())) return [];
    const type = /funding|raises|investment round|seed round/i.test(title) ? "Funding" : /expan|new office|new centre/i.test(title) ? "Expansion" : /appoint|chief executive|new ceo/i.test(title) ? "Leadership" : /hir(e|es|ing)|recruit|vacanc/i.test(title) ? "Hiring" : "Market update";
    return [{ id: `rss-${source.replace(/\W/g, "")}-${index}-${encodeURIComponent(url).slice(-150)}`, companyId: "", title, type, date: date.toISOString(), summary: tag("description").slice(0, 1500), source, url, sample: false }];
  });
}
