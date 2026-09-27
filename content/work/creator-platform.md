---
title: 'Creator and fan subscription platform'
description: 'Built the frontend for a subscription platform with three user roles — OAuth sign-in, Stripe subscriptions, real-time chat and role-based routing — against a backend being written in parallel.'
tags: ['Vue 3', 'TypeScript', 'Pinia', 'Ant Design Vue', 'Stripe', 'OAuth']
role: 'Frontend engineer'
duration: '4 months'
client: 'A creator subscription startup'
# Client not named: no written permission on file. Descriptive label instead.
client_named: false
permission: false
featured: true
order: 2
---

## Context

A startup building a platform where creators sell subscriptions and talk to their audience
directly. Three roles — creator, fan, and admin — each with a different set of permissions,
navigation and data.

Client and product details are withheld here; I do not have written permission to name them.

## The hard problem

The backend was being written at the same time as the frontend. Endpoints changed shape mid-build
and some did not exist when the screens that needed them were due.

On top of that, access control was not a logged-in-or-not question. A page could depend on sign-in
status, email verification, subscription state and role at the same time, and those conditions
changed independently of each other.

## What I did

**Put the API behind one layer.** Token refresh, error normalisation and request handling lived in
a single place, so a change in an endpoint's shape was a change in one file rather than across
every screen calling it.

**Made route guards composable.** Rather than one guard checking everything, each condition —
authenticated, verified, subscribed, correct role — was separate and combined per route. New
routes declared what they required instead of repeating the logic.

**Built the Stripe subscription flow end to end:** plan selection, Stripe Elements checkout,
webhook-driven status changes, grace periods, cancellation and re-subscription. The awkward part is
that Stripe confirms asynchronously, so the interface has to stay honest about state it does not
know yet.

**Added Google and Apple OAuth** behind one provider-agnostic interface, so a third provider would
be configuration rather than new code.

**Built real-time chat** over WebSockets, with reconnection that recovers missed messages — the
users were on mobile connections that drop.

## Outcome

The platform shipped with all three roles working, and the frontend stayed buildable while the API
underneath it was still moving.

## Stack

Vue 3, TypeScript, Pinia, Ant Design Vue, Stripe, Google and Apple OAuth, WebSockets.
