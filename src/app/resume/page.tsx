import { getPersonalInfo } from "@/lib/content";
import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Resume",
  description: "View and download professional resume.",
  path: "/resume",
});

export default function ResumePage() {
  const personal = getPersonalInfo();

  return (
    <main className="min-h-screen pt-[var(--header-height)]">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-display text-2xl font-bold">Resume</h1>
          <a
            href={personal.resume}
            download
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:brightness-110"
          >
            Download PDF
          </a>
        </div>
        <div className="glass overflow-hidden rounded-xl">
          <iframe
            src={personal.resume}
            title="Resume"
            className="h-[calc(100vh-200px)] w-full"
          />
        </div>
      </div>
    </main>
  );
}
