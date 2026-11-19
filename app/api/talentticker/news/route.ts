import { NextResponse } from "next/server";
import { parseRss } from "../../../../lib/talentticker";
export const revalidate = 900;
export async function GET() {
  const feeds = [{ name: "BBC Business", url: "https://feeds.bbci.co.uk/news/business/rss.xml" }, { name: "BBC Technology", url: "https://feeds.bbci.co.uk/news/technology/rss.xml" }];
  const results = await Promise.allSettled(feeds.map(async feed => {
    const response = await fetch(feed.url, { headers: { Accept: "application/rss+xml, application/xml, text/xml" }, signal: AbortSignal.timeout(10000), next: { revalidate: 900 } });
    if (!response.ok) throw new Error("Feed unavailable");
    const text = await response.text();
    if (text.length > 2000000) throw new Error("Feed too large");
    const signals = parseRss(text, feed.name);
    if (!signals.length) throw new Error("No readable articles");
    return signals;
  }));
  const signals = results.flatMap(r => r.status === "fulfilled" ? r.value : []);
  if (!signals.length) return NextResponse.json({ error: "News feeds are temporarily unavailable. Your saved records are unchanged. Please try again later." }, { status: 502 });
  return NextResponse.json({ signals, fetchedAt: new Date().toISOString(), partial: results.some(r => r.status === "rejected") });
}
