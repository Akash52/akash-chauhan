---
title: 'Creator-fan interaction platform'
description: 'Architected the entire frontend for an AI-powered platform connecting creators with their audience — auth, payments, real-time chat, and role-based access for three personas.'
tags: ['Vue 3', 'TypeScript', 'Pinia', 'Ant Design Vue', 'Stripe', 'OAuth']
role: 'Lead Frontend Developer'
duration: '4 months'
team_size: '3 developers'
featured: true
order: 1
---

## The challenge

A startup needed a platform where creators could monetize their content and interact directly with fans. The product had three distinct user personas — Creator, Fan, and Admin — each with different permissions, dashboards, and workflows. The backend was being built in parallel, so the frontend needed to be architected for APIs that didn't fully exist yet.

The hard parts: managing authentication across Google and Apple OAuth providers, integrating Stripe for subscriptions and one-time payments, building a real-time chat system, and handling role-based access control that went deeper than just "logged in vs not."

## My approach

I owned the entire frontend architecture from day one. Rather than rushing into features, I spent the first week building the foundation:

- **Composable-first architecture** — Every piece of shared logic (auth state, API calls, form validation, permissions) was extracted into Vue composables. This meant features could be built by composing existing logic rather than duplicating it.
- **Comprehensive route guard system** — Not just "is the user logged in?" but a layered system covering authentication status, email verification, subscription validation, and role-based page access. Each guard was a composable that could be combined.
- **API layer with XSS prevention** — All API communication went through a centralized layer that handled token refresh, request deduplication, error normalization, and input sanitization.

## Key technical work

**Stripe integration with subscription lifecycle management.** This wasn't just "add a payment button." I built the full subscription flow: plan selection, checkout via Stripe Elements, webhook-driven status updates, grace periods, cancellation, and re-subscription. The tricky part was keeping the frontend state in sync with Stripe's asynchronous webhook events.

**Multi-provider OAuth with token rotation.** Google and Apple OAuth with automatic token refresh, secure storage, and graceful fallback when tokens expire during a session. I built this as a provider-agnostic composable so adding new OAuth providers later would be a configuration change, not a code change.

**Real-time chat system.** WebSocket-based messaging with typing indicators, read receipts, and message history pagination. The challenge was handling reconnection gracefully — users on flaky mobile connections needed to rejoin without losing messages.

**Role-based UI rendering.** Not just hiding buttons — entire page layouts, navigation items, and data queries changed based on the active persona. A Creator sees analytics and content management; a Fan sees discovery and subscriptions; an Admin sees moderation tools and platform metrics.

## Results

- Shipped on schedule despite the backend being built in parallel
- Zero critical bugs in the first month after launch
- Route guard system was reused in two subsequent projects at the company
- Composable library reduced feature development time for the team by an estimated 30%
