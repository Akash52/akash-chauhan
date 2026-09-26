---
title: 'TanStack Query: the data fetching solution you have been looking for'
description: 'A deep-dive into TanStack Query — staleTime tuning, garbage collection, request deduplication, optimistic updates, and why it changes how you think about frontend data.'
date: '2025-06-10'
tags: ['React', 'TanStack Query', 'Architecture']
readingTime: '10 min read'
---

If you're still managing server state with `useEffect` and a bunch of loading/error states, TanStack Query will change how you build React apps. I've used it in production and built a caching-first data fetching layer around it — here's what I learned.

## The problem it solves

Most frontend applications treat server data the same way they treat client state: shove it into Redux or a `useState` hook, manually track loading and error states, and hope nothing gets stale. This works until it doesn't — and it usually stops working when you have multiple components reading the same data, background refetching requirements, or optimistic UI updates.

TanStack Query separates **server state** (data that lives on the server and might be stale) from **client state** (data that lives entirely in the browser). Once you internalize this distinction, your code gets dramatically simpler.

## Key concepts that matter in production

### staleTime tuning

The default `staleTime` is 0, which means every component mount triggers a refetch. In production, this is rarely what you want. I typically set it based on how often the data actually changes:

```typescript
// User profile — changes rarely
useQuery({
  queryKey: ['user', userId],
  queryFn: fetchUser,
  staleTime: 5 * 60 * 1000, // 5 minutes
})

// Notification count — changes frequently
useQuery({
  queryKey: ['notifications', 'count'],
  queryFn: fetchNotificationCount,
  staleTime: 30 * 1000, // 30 seconds
})
```

### Request deduplication

If three components mount simultaneously and all call `useQuery` with the same key, TanStack Query makes **one** network request and shares the result. This is invisible to you — it just works. But it fundamentally changes how you structure components, because you no longer need to hoist data fetching to avoid duplicate requests.

### Optimistic updates

This is where it gets powerful. You can update the UI immediately on user action, before the server confirms the change, and automatically roll back if the mutation fails.

The key insight: optimistic updates aren't just about speed — they make your UI feel reliable even on slow connections.

## Lessons from production

1. **Set `gcTime` intentionally.** The default garbage collection time is 5 minutes, which is fine for most cases. But for data-heavy dashboards, you might want longer retention to avoid refetching when users switch tabs.

2. **Infinite scroll is a first-class feature.** `useInfiniteQuery` handles paginated data with automatic page management. I used this for a feed-style interface and it eliminated all the manual page tracking code.

3. **The DevTools are essential.** Install `@tanstack/react-query-devtools` immediately. Being able to see the query cache, active queries, and stale/fresh status saves hours of debugging.

---

*Originally published on [Medium](https://medium.com/@19it197.akashbhai.chauhan). Cross-posted here.*
