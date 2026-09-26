---
title: 'Decoding design patterns with real-world scenarios'
description: 'Design patterns explained through actual problems I have solved in production — not textbook examples, but real decisions from real codebases.'
date: '2025-04-20'
tags: ['Architecture', 'Design Patterns', 'JavaScript']
readingTime: '12 min read'
---

Most design pattern tutorials use the same tired examples: a pizza builder, a car factory, a shape hierarchy. These are fine for understanding the mechanics, but they don't answer the question that actually matters: **when should I reach for this pattern in my codebase?**

This article covers patterns I've actually used in production, with the specific problems they solved and the trade-offs I encountered.

## Observer pattern: real-time notifications

When I built a real-time notification system with SignalR, the Observer pattern was the natural fit. Multiple parts of the application needed to react to incoming notifications — the badge counter, the notification drawer, toast alerts, and the activity feed — but they shouldn't know about each other.

The key decision was where to put the observable. I created a notification service that managed the SignalR connection and exposed a subscription API. Components subscribed to the events they cared about and received updates without polling or prop drilling.

The trade-off: debugging becomes harder because the data flow is implicit. When a notification wasn't showing up in the drawer, I had to trace through the subscription chain rather than following a straightforward data flow.

## Strategy pattern: multi-provider authentication

When implementing OAuth with both Google and Apple providers, I used the Strategy pattern to keep the auth logic provider-agnostic. Each provider implemented the same interface — `authenticate()`, `refreshToken()`, `getProfile()` — but with completely different implementations underneath.

This paid off immediately when we discussed adding a third provider. Instead of threading new `if/else` branches through the auth flow, it was a single new strategy class and a configuration change.

## Facade pattern: API layers

Every production project I've worked on has benefited from an API facade. Instead of components calling `fetch()` or `axios` directly, they go through a service layer that handles authentication headers, token refresh, request deduplication, error normalization, and retry logic.

The facade isn't just about clean code — it's about having a single place to add cross-cutting concerns. When we needed to add XSS input sanitization, it was a one-line change in the facade rather than an audit of every API call in the application.

---

These patterns aren't about writing "enterprise" code or following rules for their own sake. They're tools for managing complexity — and they earn their keep when the codebase grows beyond what one person can hold in their head.

*Part 1 of a 2-part series. Originally published on [Medium](https://medium.com/@19it197.akashbhai.chauhan).*
