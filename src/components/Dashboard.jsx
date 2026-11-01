
import "./Dashboard.css";

// Dashboard navigation cards
const dashboardItems = [
    {
        icon: "👨‍👩‍👧‍👦",
        title: "Family Members",
        description:
        "Explore family members and their profiles.",
        page: "members",
    },
    {
        icon: "🔗",
        title: "Family Relationships",
        description:
        "View connections between parents, children, and spouses.",
        page: "relationships",
    },
    {
        icon: "🌳",
        title: "Interactive Family Tree",
        description:
        "Visualize family relationships across generations.",
        page: "tree",
    },
];

export default function Dashboard({
    profile,
    isDemo = false,
    onSignOut,
    onOpenMembers,
    onOpenRelationships,
    onOpenTree,
    }) {
    function handleCardClick(page) {
        switch (page) {
        case "members":
            onOpenMembers?.();
            break;

        case "relationships":
            onOpenRelationships?.();
            break;

        case "tree":
            onOpenTree?.();
            break;

        default:
            break;
        }
    }

    return (
        <main className="dashboard">
        {/* Header */}
        <header className="dashboard-header">
            <div>
            <h1>
                Family Heritage Tree
                {isDemo ? " — Demo" : ""}
            </h1>

            <p>Interactive Genealogy Application</p>
            </div>

            {!isDemo && onSignOut && (
            <button
                type="button"
                onClick={onSignOut}
            >
                Sign Out
            </button>
            )}
        </header>

        {/* Welcome Section */}
        <section className="dashboard-welcome">
            <h2>
            Welcome, {profile?.display_name || "Demo Visitor"}!
            </h2>

            <p>
            Explore an interactive family history application
            built with React, Supabase, and React Flow.
            </p>

            {isDemo && (
            <p className="dashboard-demo-notice">
                This is a read-only portfolio demonstration.
                All family members and relationships are fictional.
            </p>
            )}
        </section>

        {/* Navigation Cards */}
        <section
            className="dashboard-grid"
            aria-label="Explore family tree features"
        >
            {dashboardItems.map((item) => (
            <button
                type="button"
                className="dashboard-card"
                key={item.page}
                onClick={() => handleCardClick(item.page)}
            >
                <span
                className="dashboard-icon"
                aria-hidden="true"
                >
                {item.icon}
                </span>

                <h3>{item.title}</h3>

                <p>
                {isDemo
                    ? item.description.replace(
                        "family",
                        "fictional family"
                    )
                    : item.description}
                </p>
            </button>
            ))}
        </section>

        {/* Demo Footer */}
        {isDemo && (
            <footer className="dashboard-demo-footer">
            <p>
                Portfolio Demonstration | Read-Only Access
            </p>
            </footer>
        )}
        </main>
    );
}
