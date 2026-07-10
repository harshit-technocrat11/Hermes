# Members Module Execution Plan

## Routes executed so far

### 1. Get workspace members

- Route: `GET /api/v1/workspaces/:workspaceSlug/members`
- Purpose: fetch all members of a workspace for the current authenticated user.
- Status: implemented
- Covered by:
  - `members.route.ts`
  - `members.controller.ts`
  - `members.service.ts`

### 2. Get current user's membership

- Route: `GET /api/v1/workspaces/:workspaceSlug/members/me`
- Purpose: fetch the authenticated user's role and membership details in a workspace.
- Status: implemented
- Covered by:
  - `members.route.ts`
  - `members.controller.ts`
  - `members.service.ts`

### 3. Leave workspace

- Route: `DELETE /api/v1/workspaces/:workspaceSlug/members/leave`
- Purpose: allow a non-owner member to leave a workspace.
- Status: implemented
- Notes:
  - Owners cannot leave their own workspace.
  - The membership is removed from the workspace.

### 4. Remove member from workspace

- Route: `DELETE /api/v1/workspaces/:workspaceSlug/members/:memberId`
- Purpose: allow an owner to remove another member from the workspace.
- Status: implemented
- Notes:
  - Only workspace owners can remove members.
  - Owners cannot remove themselves.

## Routes / features planned for later

### 1. Invite member to workspace

- Planned route: `POST /api/v1/workspaces/:workspaceSlug/members/invite`
- Purpose: send or create an invite for a user to join a workspace.
- Status: pending

### 2. Accept workspace invite

- Planned route: `POST /api/v1/workspaces/:workspaceSlug/members/accept-invite`
- Purpose: allow a user to accept an invite and join the workspace.
- Status: pending

### 3. Update member role

- Planned route: `PATCH /api/v1/workspaces/:workspaceSlug/members/:memberId/role`
- Purpose: allow an owner/admin to change a member's role.
- Status: pending

### 4. Transfer ownership

- Planned route: `PATCH /api/v1/workspaces/:workspaceSlug/members/transfer-ownership`
- Purpose: let an owner transfer workspace ownership to another member.
- Status: pending

### 5. Member search / filtering

- Planned feature: filter members by role, name, or email.
- Status: pending

## Summary

The core member management flow is now in place for viewing members, checking your own membership, leaving a workspace, and removing a member as an owner. The next phase will focus on invitations, role management, and ownership transfer.
