"use client";

import { useEffect, useState } from "react";

export function GitHubContributions() {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "stackbyarjun";
  const [svg, setSvg] = useState<string | null>(null);

  useEffect(() => {
    fetch(`https://ghchart.rshah.org/${username}`)
      .then((res) => res.text())
      .then(setSvg)
      .catch(() => setSvg(null));
  }, [username]);

  if (!svg) return null;

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="glass overflow-hidden rounded-xl p-6">
          <h3 className="mb-4 text-center font-display text-lg font-semibold">
            GitHub Contributions
          </h3>
          <div
            className="flex justify-center overflow-x-auto [&_svg]:max-w-full"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        </div>
      </div>
    </section>
  );
}
