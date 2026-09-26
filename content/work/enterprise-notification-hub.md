---
title: 'Enterprise discovery & notification hub'
description: 'Learned Angular from scratch, became productive in two weeks, and built a full SignalR real-time notification layer for an enterprise platform.'
tags: ['Angular', 'TypeScript', 'NG-Zorro', 'SignalR', 'Apache ECharts']
role: 'Frontend Developer'
duration: '3 months'
team_size: '5 developers'
featured: true
order: 3
---

## The challenge

An enterprise client needed a platform for internal discovery and notifications — think a centralized hub where teams could find resources, receive broadcasts, and get real-time alerts. The catch: the entire stack was Angular, and I had zero Angular experience. The team needed me productive in weeks, not months.

## My approach

I committed to learning Angular while delivering features on the same timeline as developers who'd been writing Angular for years. My approach was to focus on patterns I already knew from Vue and React — component composition, reactive state, lifecycle hooks — and map them to Angular's equivalents. Within two weeks I was shipping features; within a month I was reviewing other developers' code.

I also took ownership of the real-time communication layer, which was the most architecturally complex piece of the project and something I had prior experience with from other stacks.

## Key technical work

**Full SignalR integration layer.** I built the entire real-time notification infrastructure: WebSocket connection management, automatic reconnection with exponential backoff, broadcast messaging, and event-driven updates that propagated through the application. I also conducted a department-wide training session on SignalR integration patterns, which was adopted as a reference for future projects.

**Global drawer service.** Created a reusable drawer (slide-over panel) service that any module in the application could invoke. This sounds simple, but getting the API right — so it was ergonomic to use, properly handled stacking, and cleaned up after itself — required careful design.

**Apache ECharts integration.** Built a set of interactive data visualization components using Apache ECharts, wrapped in Angular components with proper change detection and resize handling. These were used across multiple modules for analytics dashboards.

## Results

- Productive in Angular within 2 weeks despite zero prior experience
- SignalR training session adopted as a department reference
- Drawer service reused across 4+ modules in the application
- Shipped all features on schedule alongside experienced Angular developers
