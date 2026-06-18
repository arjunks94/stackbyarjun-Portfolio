---
title: "SOC Alert Triage: A Beginner's Playbook"
description: "How I approach L1 SOC alerts — from initial SIEM notification to escalation, with practical examples from my lab."
coverImage: "/images/blog/soc-triage.svg"
date: "2025-11-01"
tags:
  - soc
  - cybersecurity
  - siem
category: "Cybersecurity"
draft: false
featured: true
---

## Why Triage Matters

In a SOC, speed and accuracy matter. Every alert needs a consistent first response.

## My L1 Checklist

1. **Validate** — Is this a true positive or noisy rule?
2. **Context** — User, host, time, and related events
3. **Classify** — Map to MITRE ATT&CK where possible
4. **Contain or escalate** — Follow the playbook, document everything

## Common Alert Types

- Multiple failed logins → possible brute force
- Suspicious outbound traffic → check destination reputation
- New scheduled task → verify with asset owner

## Tools I Use

Splunk searches, VirusTotal for IOCs, and internal CMDB for asset context.
