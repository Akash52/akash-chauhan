---
title: 'Offline media in a legacy senior-care platform'
description: 'Made a communication platform work on unreliable connections with an IndexedDB media cache and a fallback for expired S3 URLs, and fixed a popup bug caused by a timer attached to reused DOM.'
tags: ['JavaScript', 'jQuery', 'IndexedDB', 'AWS S3', 'Legacy']
role: 'Frontend engineer'
duration: '3 months'
client: 'A US senior-care communication platform'
# Client not named: no written permission on file. Descriptive label instead.
client_named: false
permission: false
featured: true
order: 3
---

## Context

A communication platform used in senior-care settings, where families and staff share photos and
video messages with residents. An older codebase — jQuery still doing real work in it — with
production users who were not going to wait for a rewrite.

Client details are withheld here; I do not have written permission to name them.

## The hard problem

Two things, both about state that outlives the code that created it.

Media was served from S3 behind pre-signed URLs, which expire. The application fetched a URL,
held onto it, and used it later — so a page open long enough would try to load media through a link
that was no longer valid. On top of that, the connections in these buildings were not reliable, and
reloading media that had already been viewed was wasteful and often failed.

Separately, a popup was appearing at the wrong moment and for the wrong record.

## What I did

**Cached media in IndexedDB, offline-first.** Media already fetched gets served from local storage
rather than re-requested, so a poor connection degrades the experience instead of breaking it.

**Added a fallback for expired S3 URLs.** Rather than treating a URL as permanent, an expired link
triggers a re-fetch of a fresh pre-signed URL and retries, transparently. The fix is in how the
application treats URL lifetime, not in extending the expiry.

**Traced the popup bug to a timer on reused DOM.** The element the timer was attached to was being
recycled rather than recreated, so the old timer survived and fired against whatever record
occupied that node next. It looked like a race condition and was not one — it was a lifecycle
assumption that stopped being true once the list started reusing nodes. The fix was clearing the
timer at the point the node is reused.

## Outcome

Media loads from cache on repeat views and recovers on its own when a URL expires, rather than
showing a broken asset. The popup fires against the record it belongs to.

## Stack

JavaScript, jQuery, IndexedDB, AWS S3 pre-signed URLs.
