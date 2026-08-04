I have a React frontend for a WIP Management System.

Do NOT redesign the UI.

Only fix permission and sidebar logic.

Current status:
- Login succeeds.
- Backend returns token and access.
- Access update popup says success.
- Employee edit works.

Problems:
1. After login users sometimes go to /unauthorized.
2. Sidebar does not update according to employee permissions.
3. Updated permissions only work after refresh or never update.
4. Some pages remain blocked even though permission exists.
5. Unauthorized page appears incorrectly.
6. Sidebar sometimes disappears.

Tasks:
1. Save Access from login response into localStorage.
2. Decode JWT only if required.
3. Build sidebar dynamically from Access.
4. Remove hardcoded menu permissions.
5. Re-read permissions after every login.
6. Re-read permissions after Update Access.
7. Refresh auth context after permission update.
8. Fix ProtectedRoute permission checking.
9. Redirect to Dashboard after successful login.
10. Keep existing UI unchanged.

At the end list every modified file and explain every change.
