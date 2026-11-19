import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "TalentTicker — Recruitment intelligence", description: "Market signals, companies, contacts, projects and pipeline." };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body>{children}</body></html>; }
