# Changelog

## Family Heritage Tree — Interactive Genealogy Application

All notable changes to the Family Heritage Tree Demo are documented in this file.

The project follows the general structure of [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and uses [Semantic Versioning](https://semver.org/) as a guideline for future releases.

**Developer:** Angelica Reyes  
**Repository:** [Family Heritage Tree Demo](https://github.com/ReyesAngelica-FS/family-heritage-tree-demo)  
**Live Demo:** [Launch Application](https://reyesangelica-fs.github.io/family-heritage-tree-demo/)

---

## Version History

### [Unreleased]

#### Planned

- Improve responsive layouts for mobile and tablet devices.
- Add automated unit and integration tests.
- Improve family tree node positioning.
- Enhance accessibility and keyboard navigation.
- Expand error handling and empty-state messages.
- Introduce additional family member search and filtering options.
- Complete cross-browser compatibility testing.

*Planned items are not yet implemented.*

---

## [1.0.0] — November 2026

### Initial Public Demonstration

The first documented public demonstration of Family Heritage Tree.

This release showcases a React-based genealogy application using fictional family records.

### Added

**Application Features**

- React and Vite application structure.
- Dashboard navigation interface.
- Family member registry.
- Family relationship viewer.
- Interactive family tree visualization using React Flow.
- Supabase PostgreSQL integration.
- Fictional Bennett family demonstration dataset.
- Public read-only demonstration components.

**Database Integration**

- Supabase JavaScript client configuration.
- Data retrieval from the `people` table.
- Data retrieval from the `relationships` table.
- Relationship processing for family tree visualization.

**Security**

- Separate public demonstration environment.
- Anonymous read access to approved demonstration records.
- Database privilege checks for anonymous read and write operations.
- Public interface without editing controls.
- Environment-based Supabase configuration.

**Deployment**

- GitHub Actions deployment workflow.
- GitHub Pages hosting.
- Automated production builds using Vite.
- Build-time Supabase configuration through GitHub Actions repository secrets.

### Fixed

**GitHub Pages Configuration**

- Resolved an initial deployment failure caused by GitHub Pages configuration.
- Enabled deployment through GitHub Actions.

**Production Environment Variables**

- Investigated a blank screen in the published application.
- Identified missing Supabase configuration through browser console debugging.
- Corrected GitHub Actions environment variable references.
- Configured the required repository secrets.
- Rebuilt and successfully loaded the public demonstration.

### Tested

- Local React application rendering.
- Family member data retrieval.
- Family relationship data retrieval.
- Interactive family tree rendering.
- Supabase anonymous SELECT privileges.
- Absence of anonymous INSERT, UPDATE, and DELETE grants on the demonstration tables.
- GitHub Actions build and deployment completion.

### Known Limitations

- The public demonstration is read-only.
- Automated test coverage has not yet been established.
- Advanced family tree layout optimization remains planned.
- Responsive and accessibility testing is incomplete.
- Direct API-level write restriction testing remains pending.

---

## Documentation Updates

The following documentation has been drafted as part of the project's portfolio presentation.

| Document | Purpose |
|---|---|
| `README.md` | Project introduction and installation |
| `SECURITY.md` | Database security and vulnerability reporting |
| `docs/ARCHITECTURE.md` | System architecture and component design |
| `docs/DATABASE.md` | Relational database structure |
| `docs/TESTING.md` | Functional testing and QA |
| `docs/DEPLOYMENT.md` | GitHub Actions and GitHub Pages deployment |
| `docs/USER_GUIDE.md` | Instructions for public visitors |
| `docs/ROADMAP.md` | Planned development milestones |
| `CHANGELOG.md` | Development and release history |

*Documentation entries should be marked as published only after the corresponding files have been committed to the repository.*

---

## Release Management

Future releases will use the following versioning guidelines.

| Version Type | Example | Purpose |
|---|---|---|
| Major | 2.0.0 | Significant application or architecture changes |
| Minor | 1.1.0 | New backward-compatible features |
| Patch | 1.0.1 | Bug fixes and minor improvements |

A version should be recorded as a formal release only when the corresponding Git tag or GitHub release has been created.

The `1.0.0` entry above is a proposed baseline for documenting the current public demo and does not imply that a GitHub release tag already exists.

## Change Categories

Future changelog entries may use these headings:

- **Added:** New features and capabilities.
- **Changed:** Updates to existing functionality.
- **Deprecated:** Features planned for removal.
- **Removed:** Features no longer available.
- **Fixed:** Corrected defects.
- **Security:** Changes to access controls or security protections.

## Maintenance

This changelog should be updated whenever significant changes are introduced.

Each entry should describe the change, explain its impact when relevant, and reference an associated GitHub issue or pull request when available.

---

**Maintained by:** Angelica Reyes  
**Last Updated:** November 2026

*© 2026 Angelica Reyes. All rights reserved.*