---
title: 'Real-time analytics dashboard in Angular'
description: 'Built the SignalR real-time layer and the charting components for an enterprise discovery and notification platform, having not written Angular before joining.'
tags: ['Angular', 'TypeScript', 'NG-Zorro', 'SignalR', 'Apache ECharts']
role: 'Frontend engineer'
duration: '3 months'
client: 'An enterprise internal platform'
# Client not named: no written permission on file. Descriptive label instead.
client_named: false
permission: false
featured: false
order: 4
---

## Context

An internal platform for a large organisation: a place to find resources, receive broadcasts and
get real-time alerts. The stack was Angular throughout.

I had not written Angular before joining this project.

## The hard problem

The team needed me contributing in weeks, not months, and the piece I took on — the real-time
notification layer — was the most involved part of the build.

Connection handling is where real-time features usually fail. Not the happy path, but what happens
when a connection drops mid-session, when the server restarts, or when a client reconnects and has
missed messages.

## What I did

**Learned Angular by mapping it onto what I knew.** Component composition, reactive state and
lifecycle hooks exist in Vue and React too, under different names. I was shipping features in about
two weeks by treating the framework as a different spelling of familiar ideas rather than starting
from nothing. Where Angular actually differs — dependency injection, RxJS as the default idiom — I
had to learn it properly.

**Built the SignalR layer:** connection management, reconnection with exponential backoff, and
broadcast messaging that propagates through the application.

**Ran a department training session on SignalR** once it was working, so the next team to touch it
would not have to rediscover the same behaviour.

**Built a shared drawer service** any module could call, which handles stacking and cleans up after
itself.

**Wrapped Apache ECharts in Angular components** with change detection and resize handling that
behave correctly, which is most of the work in charting.

## Outcome

The real-time layer shipped and the training session became the team's reference for it. The drawer
service was picked up across several modules.

## Stack

Angular, TypeScript, RxJS, NG-Zorro, SignalR, Apache ECharts.
