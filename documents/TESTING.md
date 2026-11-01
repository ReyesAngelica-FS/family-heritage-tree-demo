# Testing & Quality Assurance

## Family Heritage Tree — Interactive Genealogy Application

**Developer:** Angelica Reyes  
**Application:** Family Heritage Tree Demo  
**Technology Stack:** React, Vite, JavaScript, React Flow, Supabase PostgreSQL  
**Deployment:** GitHub Actions and GitHub Pages  
**Test Environment:** Local Development and Public Production Demo  
**Last Updated:** November 2026

---

## 1. Testing Overview

The Family Heritage Tree Demo is a public, read-only genealogy application that allows visitors to explore fictional family records, relationships, and an interactive family tree.

Testing focuses on verifying application functionality, database connectivity, access restrictions, visual presentation, and deployment reliability.

The testing strategy combines manual functional testing, database permission inspection, integration testing, and deployment verification.

Automated regression testing is a future enhancement.

## 2. Testing Objectives

The primary objectives are to:

- Confirm that the application loads successfully.
- Verify that family members are retrieved from Supabase.
- Confirm that family relationships are displayed correctly.
- Validate interactive family tree rendering.
- Ensure the public interface remains read-only.
- Verify anonymous database permissions.
- Confirm production deployment works with the required configuration.
- Identify defects and document corrective actions.

## 3. Test Environments

| Environment | Technology | Purpose |
|---|---|---|
| Local Development | Vite development server | Functional testing and debugging |
| Database | Supabase PostgreSQL | Data retrieval and access verification |
| Production | GitHub Pages | Public demonstration testing |
| CI/CD | GitHub Actions | Build and deployment verification |
| Browser | Chrome DevTools | Console inspection and troubleshooting |

## 4. Test Status Definitions

| Status | Meaning |
|---|---|
| PASS | Expected result was observed |
| FAIL | Actual result did not match the expected result |
| PENDING | Test has not yet been completed or verified |
| BLOCKED | Test cannot proceed because of a dependency |
| NOT APPLICABLE | Test does not apply to the public demonstration |

A passing test reflects the specific check performed, not a guarantee that the entire application is free from defects.

## 5. Functional Test Cases

### Dashboard and Navigation

| Test ID | Test Case | Expected Result | Status |
|---|---|---|---|
| FT-001 | Load the application locally | Application renders successfully | PASS |
| FT-002 | Open the dashboard | Dashboard and navigation options appear | PASS |
| FT-003 | Open Family Members | Member registry displays | PASS |
| FT-004 | Open Family Relationships | Relationship viewer displays | PASS |
| FT-005 | Open Interactive Family Tree | Tree visualization displays | PASS |
| FT-006 | Navigate back to the dashboard from each page | Dashboard appears without errors | PENDING |
| FT-007 | Refresh each application view | Application remains usable | PENDING |

The initial functional tests were performed during local development.

### Family Member Registry

| Test ID | Test Case | Expected Result | Status |
|---|---|---|---|
| FT-008 | Retrieve family members | Supabase returns sample records | PASS |
| FT-009 | Display fictional Bennett family members | Names appear correctly | PASS |
| FT-010 | Verify the expected 13 sample records | All expected members are displayed | PENDING |
| FT-011 | Handle an empty database response | Appropriate empty state appears | PENDING |
| FT-012 | Handle a database request error | User-friendly error message appears | PENDING |

### Family Relationships

| Test ID | Test Case | Expected Result | Status |
|---|---|---|---|
| FT-013 | Retrieve relationship records | Supabase returns relationship data | PASS |
| FT-014 | Display relationship connections | Connections are visible | PASS |
| FT-015 | Verify parent-child relationship direction | Parent and child are represented correctly | PENDING |
| FT-016 | Verify married/spouse relationships | Spouses are correctly connected | PENDING |
| FT-017 | Test relationship filtering | Results match the selected relationship type | PENDING |

### Interactive Family Tree

| Test ID | Test Case | Expected Result | Status |
|---|---|---|---|
| FT-018 | Load React Flow visualization | Family tree renders | PASS |
| FT-019 | Display family member nodes | Members appear as graph nodes | PASS |
| FT-020 | Display relationship edges | Connected members are linked | PASS |
| FT-021 | Test zoom controls | Tree zooms in and out | PENDING |
| FT-022 | Test panning | Tree can be navigated | PENDING |
| FT-023 | Verify generation placement | Parent and child generations appear in logical order | PENDING |
| FT-024 | Confirm visitors cannot edit graph connections | Editing is disabled | PENDING |

## 6. Supabase Integration Testing

A dedicated security test component was used during development to verify database connectivity.

The local test displayed the following results:

```text
People read: PASSED (1 sample row)
Relationships read: PASSED (1 sample row)
```

These results confirm that the test client successfully retrieved at least one record from each table.

They do not establish that all database records or relationships were validated.

| Test ID | Test Case | Expected Result | Status |
|---|---|---|---|
| DB-001 | Connect to Supabase | Client connects successfully | PASS |
| DB-002 | Query `public.people` | At least one record is returned | PASS |
| DB-003 | Query `public.relationships` | At least one record is returned | PASS |
| DB-004 | Verify returned field types | Fields match application expectations | PENDING |
| DB-005 | Verify all relationship references | Every reference points to a valid person | PENDING |
| DB-006 | Test unavailable Supabase service | Application handles errors gracefully | PENDING |

## 7. Database Security Testing

Database permission checks were performed in the Supabase SQL Editor.

The anonymous role was checked for read and write privileges on the demonstration tables.

### Verified Permission Checks

| Test ID | Operation | Expected Result | Status |
|---|---|---|---|
| SEC-001 | Anonymous SELECT on `people` | Allowed | PASS |
| SEC-002 | Anonymous SELECT on `relationships` | Allowed | PASS |
| SEC-003 | Anonymous INSERT grant on `people` | Not granted | PASS |
| SEC-004 | Anonymous UPDATE grant on `people` | Not granted | PASS |
| SEC-005 | Anonymous DELETE grant on `people` | Not granted | PASS |
| SEC-006 | Anonymous INSERT grant on `relationships` | Not granted | PASS |
| SEC-007 | Anonymous UPDATE grant on `relationships` | Not granted | PASS |
| SEC-008 | Anonymous DELETE grant on `relationships` | Not granted | PASS |

**Scope:** These checks inspected database privileges. They did not constitute direct attempts to modify records through the public API.

### Additional Security Tests

| Test ID | Test Case | Expected Result | Status |
|---|---|---|---|
| SEC-009 | Anonymous API INSERT request | Request is rejected | PENDING |
| SEC-010 | Anonymous API UPDATE request | Request is rejected | PENDING |
| SEC-011 | Anonymous API DELETE request | Request is rejected | PENDING |
| SEC-012 | Inspect active RLS policies | Only intended access is permitted | PENDING |
| SEC-013 | Inspect repository for privileged keys | No privileged credentials committed | PENDING |
| SEC-014 | Verify private genealogy records are inaccessible | No private data exposed | PENDING |

Direct API-level write tests should use a controlled test environment or disposable records to avoid unintentionally changing demonstration data.

## 8. Deployment Testing

The application is deployed through GitHub Actions to GitHub Pages.

### Deployment Issue 1 — GitHub Pages Configuration

**Observed issue:** The initial deployment failed because GitHub Pages had not been correctly enabled.

**Corrective action:** Updated the repository's GitHub Pages settings.

**Result:** The GitHub Actions deployment workflow subsequently completed successfully.

### Deployment Issue 2 — Missing Supabase Configuration

**Observed issue:** The deployed application initially displayed a blank page.

**Browser console error:**

```text
Uncaught Error: Missing Supabase demo configuration
```

**Root cause:** The production build was missing required Supabase environment variables.

**Corrective action:** Configured GitHub Actions repository secrets and corrected the deployment workflow to supply them during the Vite build.

**Result:** The public application was subsequently reported as working.

### Deployment Test Cases

| Test ID | Test Case | Expected Result | Status |
|---|---|---|---|
| DEP-001 | GitHub Actions workflow completes | Deployment succeeds | PASS |
| DEP-002 | Build receives Supabase configuration | Application connects successfully | PASS |
| DEP-003 | Public demo URL loads | Application renders | PASS |
| DEP-004 | Production Family Members page | Records display | PENDING |
| DEP-005 | Production Relationships page | Connections display | PENDING |
| DEP-006 | Production Family Tree page | Interactive graph displays | PENDING |
| DEP-007 | Refresh deployed application | No blank screen or routing failure | PENDING |

**Production URL:** https://reyesangelica-fs.github.io/family-heritage-tree-demo/

## 9. Responsive Design Testing

The following viewport sizes are recommended for manual testing.

| Test ID | Device Category | Suggested Width | Status |
|---|---|---|---|
| UI-001 | Mobile | 375px | PENDING |
| UI-002 | Large mobile | 430px | PENDING |
| UI-003 | Tablet | 768px | PENDING |
| UI-004 | Laptop | 1366px | PENDING |
| UI-005 | Desktop | 1920px | PENDING |

Testing should verify that text remains readable, navigation controls remain accessible, and the family tree can be explored without unintended clipping.

## 10. Accessibility Testing

Accessibility testing should evaluate the application against applicable WCAG 2.2 guidelines.

| Test ID | Test Case | Expected Result | Status |
|---|---|---|---|
| A11Y-001 | Keyboard navigation | Interactive controls can be reached | PENDING |
| A11Y-002 | Visible focus indicators | Keyboard focus is identifiable | PENDING |
| A11Y-003 | Color contrast | Text meets applicable contrast requirements | PENDING |
| A11Y-004 | Semantic headings | Heading hierarchy is logical | PENDING |
| A11Y-005 | Screen reader labels | Controls have meaningful accessible names | PENDING |
| A11Y-006 | Family tree accessibility | Essential relationships can be understood without relying solely on the graph | PENDING |

Suggested tools include Chrome Lighthouse, axe DevTools, and keyboard-only testing.

## 11. Browser Compatibility Testing

| Test ID | Browser | Status |
|---|---|---|
| BR-001 | Google Chrome | PASS — development testing |
| BR-002 | Mozilla Firefox | PENDING |
| BR-003 | Microsoft Edge | PENDING |
| BR-004 | Apple Safari | PENDING |
| BR-005 | Mobile Chrome | PENDING |
| BR-006 | Mobile Safari | PENDING |

## 12. Defect Tracking

Defects can be documented using the following format:

| Field | Description |
|---|---|
| Defect ID | Unique identifier |
| Summary | Brief description of the issue |
| Environment | Local or production |
| Steps to Reproduce | Actions required to reproduce |
| Expected Result | Intended behavior |
| Actual Result | Observed behavior |
| Severity | Low, Medium, High, or Critical |
| Status | Open, In Progress, Resolved, or Closed |

### Recorded Defects

| Defect ID | Description | Severity | Status |
|---|---|---|---|
| BUG-001 | GitHub Pages deployment configuration failure | High | Resolved |
| BUG-002 | Blank production page caused by missing Supabase environment variables | High | Resolved |

## 13. Automated Testing Roadmap

Automated tests have not yet been documented as implemented.

Recommended future tools include:

- **Vitest:** Unit testing for React application logic and data transformation functions.
- **React Testing Library:** Component rendering and user interaction tests.
- **Playwright:** End-to-end browser tests.
- **GitHub Actions:** Automated execution of tests before deployment.

### Proposed Automated Test Coverage

- Dashboard rendering and navigation.
- Family member data formatting.
- Relationship direction handling.
- Graph node and edge generation.
- Duplicate relationship processing.
- Empty and error states.
- Read-only interface restrictions.

Automated test coverage percentages