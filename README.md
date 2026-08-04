I have restored my React frontend to a clean version.

IMPORTANT:
Do NOT redesign the UI.
Do NOT create a new Unauthorized page.
Do NOT change routing unless required.
Do NOT change the login design.
Do NOT modify components unrelated to permissions.

Current situation:
- Login works.
- Employee list works.
- Edit Employee works.
- Access Update popup shows success.

Actual problems:

1. Sidebar does not refresh according to the latest employee access.
2. After admin changes access, the employee logs in again but still sees old permissions.
3. Sidebar must be generated only from the Access returned by Login API.
4. Remove every hardcoded sidebar permission.
5. After successful login, store the latest Access from LoginResponse.
6. Update AuthContext/localStorage/session with the latest Access.
7. ProtectedRoute must use the latest Access only.
8. Do NOT create or modify Unauthorized UI.
9. Do NOT add any new pages.
10. Keep existing UI and routing unchanged.

Only modify the files necessary to fix the permission system.

Finally provide:
- Modified files
- Reason for each change
- How to test the fix
