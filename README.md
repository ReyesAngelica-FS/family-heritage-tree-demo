# 🌳 Family Heritage Tree — Interactive Genealogy Application

**A React-based genealogy application for exploring family members, relationships, and family trees across generations.**

Developed by **Angelica Reyes**  
Web Developer | U.S. Army Veteran

[**🌐 View Live Demo**](https://reyesangelica-fs.github.io/family-heritage-tree-demo/) | [**💻 View GitHub Repository**](https://github.com/ReyesAngelica-FS/family-heritage-tree-demo)

---

## 📖 Project Overview

Family Heritage Tree is a web application designed to organize and visualize family history through an interactive digital experience.

The application brings family member profiles, relationship records, and a visual family tree together in one place.

This public portfolio demonstration uses the fictional **Bennett family** to showcase the application's features while protecting real family information.

Visitors can explore the application without creating an account. All public demonstration features are read-only.

## ✨ Key Features

### 👨‍👩‍👧‍👦 Family Member Registry

- Browse family members across multiple generations.
- View individual family member information.
- Display names and dates of birth.
- Retrieve family records from a Supabase database.

### 🔗 Family Relationships

- Explore connections between family members.
- View parent-child and marriage relationships.
- Understand family connections through structured relationship records.

### 🌳 Interactive Family Tree

- Visualize family relationships using React Flow.
- Explore connections between generations.
- Navigate an interactive family tree diagram.
- Represent family members and relationships visually.

### 🔒 Public Read-Only Demonstration

- Uses fictional family records for demonstration purposes.
- Allows visitors to explore without signing in.
- Restricts public database access to approved read operations.
- Protects demonstration records from unauthorized modifications through database permissions and Row Level Security policies.

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React | Component-based frontend development |
| JavaScript | Application logic and interactions |
| Vite | Development server and production builds |
| CSS3 | Responsive layouts and visual styling |
| React Flow (`@xyflow/react`) | Interactive family tree visualization |
| Supabase | PostgreSQL database and data access |
| GitHub | Version control and source code hosting |
| GitHub Actions | Automated deployment |
| GitHub Pages | Public website hosting |

## 🏗️ Application Architecture

The application separates its public demonstration components from the underlying data service.

**Frontend:** React components display family members, relationships, and the family tree.

**Data layer:** Supabase provides access to the fictional family records stored in PostgreSQL.

**Security:** Database permissions and Row Level Security policies restrict anonymous users to permitted read operations.

**Deployment:** GitHub Actions builds the Vite application and publishes the production files to GitHub Pages.

## 📂 Project Structure

```text
family-heritage-tree-demo/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── public/
├── src/
│   ├── components/
│   │   ├── demo/
│   │   │   ├── DemoFamilyMembers.jsx
│   │   │   ├── DemoFamilyRelationships.jsx
│   │   │   └── DemoFamilyTree.jsx
│   │   └── Dashboard.jsx
│   ├── lib/
│   │   └── supabase.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

*This structure highlights the main application files. Additional components and stylesheets may also be present.*

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm
- A Supabase project configured with the appropriate database tables and access policies

### 1. Clone the Repository

```bash
git clone https://github.com/ReyesAngelica-FS/family-heritage-tree-demo.git
cd family-heritage-tree-demo
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```dotenv
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Use a Supabase publishable key intended for client-side applications.

**Never expose Supabase secret keys or service-role credentials in frontend code.**

### 4. Start the Development Server

```bash
npm run dev
```

Open the local address displayed in your terminal.

### 5. Build for Production

```bash
npm run build
```

The production build is generated in the `dist` directory.

## 🔐 Database Security

The public demonstration uses Supabase with database access controls.

The security approach includes:

- Row Level Security policies for public demonstration data.
- Anonymous read access to the intended fictional family records.
- Restrictions on anonymous insert, update, and delete operations.
- Separation of public demonstration content from private family information.

**Important:** Public database security is enforced by Supabase permissions and policies, not by hiding buttons in the React interface.

## 🌐 Deployment

The application is deployed using GitHub Actions and GitHub Pages.

The deployment workflow:

1. Checks out the repository.
2. Configures Node.js.
3. Installs project dependencies.
4. Builds the application using Supabase configuration supplied through GitHub Actions secrets.
5. Uploads the production build.
6. Deploys the application to GitHub Pages.

**Live Application:**  
https://reyesangelica-fs.github.io/family-heritage-tree-demo/

## 🎯 Project Goals

This project was developed to demonstrate practical web development skills, including:

- Building reusable React components.
- Managing application navigation and state.
- Integrating a frontend with a cloud database.
- Displaying relational data in an accessible format.
- Creating interactive visualizations.
- Implementing database access restrictions.
- Troubleshooting deployment and environment configuration.
- Automating production deployments with GitHub Actions.

## 🔮 Future Enhancements

Potential future improvements include:

- Search and filtering for family members.
- Additional family tree visualization controls.
- Enhanced mobile navigation.
- Family history timelines.
- Improved accessibility and keyboard navigation.
- Optional family member photographs and biographical information.

These are planned enhancements, not features of the current public demonstration.

## 👩‍💻 About the Developer

**Angelica Reyes** is a retired U.S. Army veteran transitioning her leadership, operations, and technical problem-solving experience into web development and technology.

Her development interests include frontend applications, full-stack development, database integration, and creating practical digital solutions.

**GitHub:** https://github.com/ReyesAngelica-FS

---

**© 2026 Angelica Reyes. All rights reserved.**

*Family Heritage Tree Demo uses fictional family data for educational and portfolio demonstration purposes.*