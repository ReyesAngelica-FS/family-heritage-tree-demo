# Database Design & Documentation

## Family Heritage Tree — Interactive Genealogy Application

**Developer:** Angelica Reyes  
**Database Platform:** Supabase PostgreSQL  
**Application:** React + Vite + React Flow  
**Database Environment:** Public Demonstration  
**Sample Dataset:** Fictional Bennett Family  
**Last Updated:** November 2026

---

## 1. Database Overview

The Family Heritage Tree Demo uses a PostgreSQL relational database hosted by Supabase to store and retrieve fictional genealogical information.

The database supports three primary application features:

1. Family Member Registry
2. Family Relationships
3. Interactive Family Tree Visualization

The database separates individual family members from the relationships connecting them. This allows one person to be associated with multiple relatives without duplicating their personal record.

The public demonstration is designed for read-only access.

## 2. Database Design Objectives

The database architecture was designed to:

- Organize family member information into structured records.
- Represent relationships between individuals.
- Support multiple generations of family connections.
- Reduce unnecessary duplication of family member data.
- Provide consistent identifiers for connecting records.
- Support efficient retrieval through Supabase.
- Restrict unauthorized changes to public demonstration data.

## 3. Database Tables

The public demonstration uses two primary tables:

| Table | Description |
|---|---|
| `public.people` | Stores fictional family member information |
| `public.relationships` | Stores connections between family members |

These tables provide the data used by the family registry, relationship viewer, and interactive family tree.

## 4. People Table

**Table Name:** `public.people`

The `people` table stores individual family member records.

### Fields Used by the Application

| Column | Data Type | Description |
|---|---|---|
| `id` | To be verified | Unique identifier for each person |
| `first_name` | To be verified | First name |
| `last_name` | To be verified | Last name |
| `birth_date` | To be verified | Date of birth |

The application reads these fields to display family member information and generate React Flow nodes.

### Example Record

The following is an illustrative record, not a verified database export.

```json
{
  "id": "person-001",
  "first_name": "Oliver",
  "last_name": "Bennett",
  "birth_date": "1965-04-12"
}
```

### Primary Key

The `id` column serves as the application's unique identifier for each family member.

The database's actual primary key constraint should be confirmed using PostgreSQL schema inspection.

## 5. Relationships Table

**Table Name:** `public.relationships`

The `relationships` table records connections between individuals.

### Fields Used by the Application

| Column | Data Type | Description |
|---|---|---|
| `id` | To be verified | Unique relationship record identifier |
| `person_id` | To be verified | Identifier