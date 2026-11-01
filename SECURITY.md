# Security Policy

## Family Heritage Tree Demo

**Project:** Family Heritage Tree Demo  
**Developer:** Angelica Reyes  
**Repository:** [family-heritage-tree-demo](https://github.com/ReyesAngelica-FS/family-heritage-tree-demo)  
**Technology Stack:** React, Vite, Supabase, React Flow, JavaScript

---

## 1. Security Overview

The Family Heritage Tree Demo is a public, read-only demonstration of a genealogy application.

The demonstration uses a fictional family, the Bennett family, to showcase family member records, relationships, and interactive family tree visualization.

The public demonstration is designed to allow visitors to explore sample genealogy information without modifying database records.

Security is managed primarily through Supabase PostgreSQL permissions and Row Level Security (RLS).

## 2. Public Demonstration Data

The public demonstration contains fictional family information.

Sample data includes:

- Fictional family member names
- Sample dates of birth
- Fictional family relationships
- Family tree connections across generations

The demonstration is not intended to expose real family records or private genealogy information.

**Data protection principle:** Only information specifically approved for public demonstration should be stored in tables accessible to anonymous visitors.

## 3. Database Security

The application uses Supabase as its backend database service.

### Row Level Security (RLS)

Row Level Security policies are used to control access to the demonstration's database records.

The relevant demonstration tables are:

- `public.people`
- `public.relationships`

The public demonstration is configured to support read-only access to approved sample data.

RLS policies should restrict anonymous access to the intended demonstration records.

### Anonymous Database Permissions

The following permissions were checked for the anonymous database role:

| Operation | Intended Permission |
|---|---|
| SELECT — people | Allowed |
| SELECT — relationships | Allowed |
| INSERT — people | Denied |
| UPDATE — people | Denied |
| DELETE — people | Denied |
| INSERT — relationships | Denied |
| UPDATE — relationships | Denied |
| DELETE — relationships | Denied |

These restrictions are intended to prevent unauthenticated visitors from creating, modifying, or deleting demonstration records.

**Important:** Database grants and RLS policies must both be reviewed when verifying effective access. Client-side read-only interfaces are not a substitute for database-level protections.

## 4. Environment Variables and API Keys

The application uses Vite environment variables for its Supabase configuration:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Local environment configuration is maintained outside version-controlled source files where appropriate.

For GitHub Pages deployment, the configuration is provided during the GitHub Actions build process.

### Key Management

- Supabase publishable keys are designed for use in client applications and are not authorization secrets.
- Supabase secret keys and legacy `service_role` keys must never be exposed in frontend code or publicly accessible build files.
- Database permissions and RLS policies must enforce access restrictions independently of the frontend.
- Credentials with elevated privileges must not be committed to the repository.
- Exposed privileged credentials should be revoked or rotated immediately.

Because Vite embeds `VITE_` variables into the browser-delivered application, they must never contain privileged secrets.

## 5. Application Security

The demonstration uses React components to display genealogy information retrieved from Supabase.

The public interface is designed to provide:

- Family member browsing
- Family relationship viewing
- Interactive family tree visualization
- Read-only access to fictional sample records

Visitors are not provided with editing controls in the public demonstration.

However, the absence of editing controls does not itself guarantee security. Database permissions and RLS policies remain the primary controls against unauthorized modifications.

## 6. Security Verification

Security checks conducted during development included:

### Public Read Access

The public demonstration successfully retrieved sample records from the `people` and `relationships` tables.

### Anonymous Permissions

Database privilege checks returned SELECT access for the anonymous role on both demonstration tables.

### Anonymous Write Restrictions

Database privilege checks indicated that anonymous write permissions were not granted for the tested operations.

### Additional Verification

Before each major deployment, security verification should include:

- Reviewing active RLS policies
- Confirming anonymous users can access only approved demonstration data
- Confirming anonymous INSERT, UPDATE, and DELETE requests are rejected
- Reviewing environment variables and committed files for privileged credentials
- Confirming the public deployment operates as intended

**Verification limitation:** SQL privilege checks do not replace direct API-level testing. Effective access should also be tested using the same anonymous client credentials used by the public application.

## 7. Deployment Security

The public demonstration is deployed using GitHub Pages and GitHub Actions.

The deployment workflow:

1. Retrieves the repository source code.
2. Installs project dependencies.
3. Builds the Vite application.
4. Supplies the required public Supabase configuration.
5. Publishes the generated static files to GitHub Pages.

GitHub Pages serves the frontend application. Database authorization remains the responsibility of Supabase.

## 8. Reporting Security Vulnerabilities

If you discover a potential security vulnerability, please report it privately rather than publishing sensitive details in a public GitHub issue.

You may contact the project maintainer through the GitHub profile:

[ReyesAngelica-FS](https://github.com/ReyesAngelica-FS)

Please include:

- A description of the suspected vulnerability
- Steps to reproduce the issue
- The affected component or feature
- The potential security impact

Do not include real personal data, credentials, or sensitive database information in a public report.

## 9. Security Maintenance

Security maintenance for this project includes reviewing database access policies, updating dependencies, inspecting deployment configuration, and addressing reported vulnerabilities.

Security controls should be reverified whenever the application adds new database tables, authentication features, user roles, or editing capabilities.

---

**Maintained by:** Angelica Reyes  
**Project:** Family Heritage Tree Demo