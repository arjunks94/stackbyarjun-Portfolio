"use client";

import { Award, ExternalLink } from "lucide-react";
import Image from "next/image";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/fade-in";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { formatDate } from "@/lib/utils";
import type { Certification } from "@/types";

export function CertificationsSection({
  certifications,
}: {
  certifications: Certification[];
}) {
  return (
    <section id="certifications" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeader
            label="Certifications"
            title="Credentials & Achievements"
            description="Industry-recognized certifications validating technical expertise."
          />
        </FadeIn>

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert) => (
            <StaggerItem key={cert.slug}>
              <Card className="h-full" glow>
                <div className="flex items-start gap-4">
                  {cert.image ? (
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={cert.image}
                        alt={cert.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                  ) : (
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                      <Award className="h-8 w-8 text-accent" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{cert.name}</h3>
                    <p className="text-sm text-accent">{cert.issuer}</p>
                    <p className="mt-1 text-xs text-muted">{formatDate(cert.date)}</p>
                    {cert.credentialId && (
                      <p className="mt-1 font-mono text-xs text-muted">ID: {cert.credentialId}</p>
                    )}
                    {cert.verificationUrl && (
                      <a
                        href={cert.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1 text-sm text-accent hover:underline"
                      >
                        Verify
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
