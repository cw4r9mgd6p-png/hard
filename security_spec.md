# Firestore Security Specification

## 1. Data Invariants
- The `dashboard_visits` collection contains logs of dashboard visits.
- Each document contains a `timestamp` (server timestamp) and `path` (string).
- Users should not be allowed to read or modify these logs.
- Only the system can write logs (via `server.ts` which uses Admin SDK and thus bypasses security rules, or we need an allow rule if accessed via standard client).
- The current implementation calls `/api/log-visit` which uses the Admin SDK (which bypasses rules). So actually, the frontend doesn't need to write to the collection directly!
- If the frontend does not access the collection, the Firestore rules *for this collection* can be `allow read, write: if false`.

## 2. The "Dirty Dozen" Payloads
Payloads to test `dashboard_visits` (all should return `PERMISSION_DENIED` if read/write is disallowed):
1. Create: { path: "/dashboard", timestamp: "2026-06-02T08:00:00Z" } - User attempting to write directly.
2. Read: list() - User attempting to list all visits.
3. Read: get() - User attempting to read specific visit.
4. Update: { path: "/other" }
5. Delete: {}

## 3. Test Runner
We don't need a `firestore.rules.test.ts` right now to move forward as the direct client-side access is not required, but I should set up the rules properly to deny everything.
