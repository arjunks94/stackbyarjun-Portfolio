---
title: SOC Alert Triage Dashboard
description: A lab project documenting SOC L1 workflows — alert classification,
  severity mapping, and escalation playbooks using SIEM-style log samples.
coverImage: /images/uploads/chatgpt-image-jun-17-2026-09_47_41-pm.png
techStack:
  - Sentinel One XDR
  - Virus Total
  - Python
  - React Js
  - Docker
  - Ngnix
githubUrl: https://github.com/arjunks94/soc-alert-triage
liveUrl: ""
featured: true
date: 2026-06-17T21:45:00.000+05:00
---
# SOC Alert Triage

Enterprise Security Operations Center dashboard for alert triage, threat monitoring, and wallboard display. Integrates with SentinelOne Cloud APIs to sync alerts, threats, agents, and endpoints into a centralized analyst portal.

Features

* SentinelOne Cloud API v2.1 integration (alerts, threats, agents, incidents)
* Background sync via Celery (configurable intervals)
* Real-time dashboard with KPIs, MITRE ATT&CK heatmap, and timeline charts
* Alert triage workflow with analyst assignment and bulk actions
* Incident management with timeline, evidence, and case notes
* IOC enrichment (VirusTotal, AbuseIPDB, GreyNoise) with response caching
* Full-screen SOC wallboard mode (15-second auto-refresh)
* WebSocket push updates for alerts, incidents, and dashboard
* Role-based access control (SOC_ADMIN, SOC_MANAGER, SOC_ANALYST, VIEWER)
* Audit logging for all analyst actions
* Prometheus metrics and Grafana dashboards
