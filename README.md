# TalentTicker

A working recruitment intelligence app based on the supplied historical Talent Ticker screenshots. It runs independently and is also integrated into Vantage at `/talentticker`.

## Working features

- Overview with company activity scores, a watchlist and pipeline metrics.
- Search and filter news by keywords, sector, location, type and record source.
- Load current BBC Business and Technology RSS articles through a server endpoint. Original source links are preserved; no company association is inferred automatically.
- Browse vacancies and add manually supplied roles.
- Search company profiles and contacts; create and edit companies and contacts.
- Select contacts individually or in bulk and save them to projects or pipeline opportunities.
- Create projects, edit briefs and manage shortlists.
- Four-stage pipeline with drag and drop, accessible stage selectors, fee estimates, linked contacts, notes and follow-up dates.
- Save and reopen search criteria, bookmark signals and follow companies.
- Export pipeline and contacts as CSV; export and restore a validated JSON backup.
- Clear the workspace or restore the sample dataset.
- Responsive desktop, tablet and mobile navigation.

## Data and scope

Company, contact, vacancy and initial pipeline records are fictional samples and labelled in the interface. Public news is fetched on request and cached for 15 minutes. Categories are keyword based, and activity scores follow a disclosed formula; this is not an AI prediction or verified hiring intent.

Workspace changes persist in localStorage in the current browser. There is no account login, shared database or background monitoring. Exports allow transfer between devices and deployments. No emails are sent. Contact enrichment, job feed licensing and CRM delivery require provider accounts and a secured backend.

This is an independent recreation; it is not connected to the former Talent Ticker service. The supplied screenshots are reference material and are not redistributed.

## Run

```sh
corepack pnpm install
corepack pnpm dev
corepack pnpm test
corepack pnpm build
```

Next.js 15, React 19 and TypeScript. No secrets are required for the public RSS feeds. Deploy the repository to Vercel using the Next.js framework preset. The root route redirects to `/talentticker`. Vantage navigation points back to the existing Vantage deployment.

## Vantage integration

The module is copied into `KPDoyle/vantage` at:

- `app/talentticker/`
- `app/api/talentticker/news/route.ts`
- `lib/talentticker.ts`
- `tests/talentticker.test.ts`

The main Vantage menu and ecosystem navigation link to `/talentticker`. Updates to this standalone repository do not automatically update the Vantage copy; synchronise those paths when changing the module. Both are connected to Vercel for deployment.

## Checks

Unit tests cover dataset integrity, backup validation, combined search filters, score calculation, CSV escaping and formula protection, and RSS parsing. The Vantage regression suite is also run during integration.
