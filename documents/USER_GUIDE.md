# User Guide

## Family Heritage Tree — Interactive Genealogy Application

**Version:** 1.0 — Public Demo  
**Developed by:** Angelica Reyes  
**Last Updated:** November 2026

**[Launch the Live Demo](https://reyesangelica-fs.github.io/family-heritage-tree-demo/)**

---

## 1. Welcome

Welcome to **Family Heritage Tree**, an interactive web application designed to make exploring family history easier and more engaging.

The application brings family members, their relationships, and a visual family tree together in one digital experience.

This public demonstration features the fictional **Bennett family**, allowing visitors to explore the application's functionality without accessing private genealogy records.

### What Can You Do?

As a visitor, you can:

- Explore fictional family member records.
- View connections between family members.
- Discover how individuals are related.
- Explore an interactive family tree.
- Navigate between different views of the same family information.

**Important:** This is a read-only demonstration. Visitors cannot add, edit, or delete family records.

---

## 2. Getting Started

### Step 1 — Open the Application

Visit:

https://reyesangelica-fs.github.io/family-heritage-tree-demo/

The application opens in your web browser.

No installation or account registration is required.

### Step 2 — Explore the Dashboard

The dashboard is the application's main navigation area.

It provides access to three features:

| Feature | Description |
|---|---|
| Family Members | Explore individual family member records |
| Family Relationships | View connections between family members |
| Interactive Family Tree | Visualize the family across generations |

Select a feature to begin exploring.

### Step 3 — Navigate Between Features

Use the navigation controls provided by the application to move between the dashboard and the available family views.

---

## 3. Family Members

The **Family Members** section displays the fictional Bennett family registry.

### How to Use This Section

1. From the dashboard, select **Family Members**.
2. Wait for the family member records to load.
3. Browse the available family members.
4. Review the information displayed for each person.
5. Return to the dashboard when finished.

### Information You May See

Depending on the available sample records, the registry may display:

- First name
- Last name
- Date of birth
- Other family information included in the demonstration

### Example

A family member record may appear as:

**Oliver Bennett**  
Date of Birth: April 12, 1965

*This is an illustrative example and may not correspond to an actual record in the demonstration.*

### Read-Only Access

Visitors can view the information but cannot modify the registry.

---

## 4. Family Relationships

The **Family Relationships** section explains how family members are connected.

### How to Use This Section

1. Return to the dashboard.
2. Select **Family Relationships**.
3. Review the available relationship records.
4. Explore connections between different individuals.
5. Use any available relationship filters to narrow the displayed results.

### Understanding Relationship Types

| Relationship | Meaning |
|---|---|
| Parent | A person identified as a parent of another |
| Mother | A maternal relationship |
| Father | A paternal relationship |
| Child | A person identified as the child of another |
| Son | A male child relationship |
| Daughter | A female child relationship |
| Spouse / Married | A marriage or spouse connection |

### Example

**Oliver Bennett — Parent of — Another Bennett family member**

This example illustrates how a relationship might be presented.

The actual records displayed are retrieved from the demonstration database.

### Why This Feature Matters

The relationship viewer helps visitors understand family connections without needing to interpret a complete family tree diagram.

---

## 5. Interactive Family Tree

The **Interactive Family Tree** is the application's primary visual feature.

It displays family members as connected nodes in an interactive diagram.

### How to Open the Family Tree

1. Open the dashboard.
2. Select **Interactive Family Tree**.
3. Allow the diagram to load.
4. Explore the family connections displayed on screen.

### Understanding the Diagram

**Family Member Nodes**

Each node represents an individual family member.

A node may contain the person's name and other available information.

**Relationship Connections**

Lines between nodes represent family relationships.

Parent-child connections help show generational relationships.

Spouse connections identify married or partnered individuals.

**Generations**

Family members are arranged to help visitors understand connections across generations.

The layout is a visual representation of the recorded relationships and may not reflect every genealogical convention.

### Navigating the Tree

<escape>**Zoom In:**</escape> Use the zoom-in control to examine part of the tree more closely.

<escape>**Zoom Out:**</escape> Use the zoom-out control to see more of the family structure.

<escape>**Pan:**</escape> Move around the diagram using the available navigation controls.

<escape>**Fit View:**</escape> If available, use the fit-view control to bring the tree back into view.

Depending on your device, you may also be able to use your mouse wheel or touchpad gestures.

### Editing Restrictions

The public demonstration is designed for exploration only.

Visitors cannot create new family connections, delete individuals, or rearrange the saved genealogy data.

---

## 6. Understanding the Bennett Family Demonstration

The public application uses fictional Bennett family records.

The sample dataset was created to demonstrate how genealogy information can be represented in a relational database and displayed through an interactive interface.

The demonstration includes approximately 13 fictional family member records.

The purpose of the dataset is to illustrate:

- Multiple generations of family members.
- Parent-child connections.
- Marriage relationships.
- How family information can be organized.
- How relational records become a visual family tree.

No real family information is required to use the public demonstration.

---

## 7. Privacy and Security

The public demonstration is designed with privacy in mind.

### Fictional Data

The Bennett family records are fictional and intended for demonstration purposes.

### No Account Required

Visitors do not need to create a user account or provide personal information to explore the application.

### Read-Only Demonstration

The public application does not provide editing features.

Supabase database permissions and Row Level Security are used to restrict access to the demonstration data.

### Private Family Information

The public demonstration is separate from the developer's private family genealogy information.

For additional technical information, see the [Security Policy](../SECURITY.md).

---

## 8. Troubleshooting

### The Application Displays a Blank Screen

Try refreshing the page.

If the problem continues:

1. Confirm that your internet connection is working.
2. Open the application in an updated browser.
3. Try a private or incognito browser window.
4. Report the problem through the project's GitHub repository.

### Family Members Are Not Loading

The application retrieves records from Supabase and requires an internet connection.

If records do not appear, refresh the page and try again later.

### The Family Tree Appears Too Small

Use the zoom-in control to enlarge the diagram.

### Part of the Family Tree Is Outside the Screen

Use the diagram's navigation controls to move around the tree or fit the diagram to the available space.

### I Cannot Edit a Family Member

This is expected behavior.

The public demonstration is intentionally read-only.

---

## 9. Browser and Device Compatibility

The application is intended for use in modern web browsers.

Recommended browsers include:

- Google Chrome
- Microsoft Edge
- Mozilla Firefox
- Apple Safari

Desktop and laptop browsers are recommended for exploring the interactive family tree.

Mobile and tablet experiences may vary depending on screen size and browser support.

Cross-browser and responsive compatibility testing is ongoing.

---

## 10. Frequently Asked Questions

### Is the Bennett family real?

No. The Bennett family is fictional and used only to demonstrate the application's capabilities.

### Do I need an account?

No. The public demonstration does not require registration or sign-in.

### Can I add my own family members?

Not in the public demonstration. Adding and managing family members is outside the scope of this read-only version.

### Can I edit relationships?

No. Public visitors can view relationship records but cannot modify them.

### Where is the family information stored?

The fictional demonstration records are stored in a Supabase PostgreSQL database.

### Can I use the application on my phone?

You may open the demonstration in a mobile browser, but the interactive family tree is best explored on a larger screen. Mobile compatibility is still being evaluated.

### Does this application store information about visitors?

The demonstration does not require visitors to submit personal genealogy information. However, its hosting and backend providers may process technical request information as part of operating their services.

---

## 11. Future Enhancements

Potential future improvements include:

- Family member search.
- More advanced relationship filtering.
- Improved family tree positioning.
- Additional genealogical information.
- Enhanced mobile navigation.
- Accessibility improvements.
- Optional family member photographs.
- Family history timelines.

These are proposed features and may not be available in the current public demonstration.

---

## 12. Support and Feedback

If you encounter a problem or have suggestions for improvement, visit the project's GitHub repository.

**GitHub Repository:**  
https://github.com/ReyesAngelica-FS/family-heritage-tree-demo

You may open a GitHub issue to report an application defect or suggest an enhancement.

For suspected security vulnerabilities, please follow the reporting instructions in [SECURITY.md](../SECURITY.md) rather than publishing sensitive details in a public issue.

---

## 13. About the Developer

**Angelica Reyes** is a retired U.S. Army veteran and web developer with experience in frontend development, database integration, application design, and technical problem-solving.

Family Heritage Tree was developed to demonstrate the practical application of modern web technologies to a real-world information organization challenge.

**Developer Portfolio:**  
https://reyesangelica-fs.github.io/

**GitHub Profile:**  
https://github.com/ReyesAngelica-FS

---

**Thank you for exploring Family Heritage Tree!**

*© 2026 Angelica Reyes. All rights reserved.*