
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

import "./DemoFamilyMembers.css";

export default function DemoFamilyMembers({ onBack }) {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;

        async function loadMembers() {
        setLoading(true);
        setError("");

        const { data, error: fetchError } = await supabase
            .from("people")
            .select("id, first_name, last_name, birth_date")
            .order("birth_date", { ascending: true });

        if (!active) return;

        if (fetchError) {
            setError(fetchError.message);
        } else {
            setMembers(data || []);
        }

        setLoading(false);
        }

        loadMembers();

        return () => {
        active = false;
        };
    }, []);

    function formatDate(date) {
        if (!date) return "Not recorded";

        const [year, month, day] = date.split("-");

        if (!year || !month || !day) return date;

        return new Date(
        Number(year),
        Number(month) - 1,
        Number(day)
        ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        });
    }

    return (
        <main className="members-page">

        {/* Page Header */}
        <header className="members-header">
            <div>
            <p className="members-eyebrow">
                FAMILY HERITAGE TREE DEMO
            </p>

            <h1>Bennett Family Members</h1>

            <p>
                Discover the people and generations
                that make up the Bennett family.
            </p>
            </div>

            <button
            type="button"
            onClick={onBack}
            className="members-back-button"
            >
            ← Back to Dashboard
            </button>
        </header>

        {/* Demo Information */}
        <section className="members-demo-notice">
            <strong>Public Demonstration — Read Only</strong>

            <p>
            This is a fictional family created to demonstrate
            the Family Heritage Tree application. All names,
            birth dates, and relationships are sample data.
            Visitors can explore the family registry but
            cannot modify any records.
            </p>
        </section>

        {/* Family Registry */}
        <section className="members-panel">
            <div className="members-section-header">
            <div>
                <h2>Family Registry</h2>
                <p>
                Browse family members across generations.
                </p>
            </div>

            <span className="members-count">
                {members.length} Members
            </span>
            </div>

            {loading && (
            <p role="status">
                Loading Bennett family members...
            </p>
            )}

            {error && (
            <p role="alert" className="members-error">
                Unable to load family members: {error}
            </p>
            )}

            {!loading && !error && members.length === 0 && (
            <p>No family members were found.</p>
            )}

            {!loading && !error && members.length > 0 && (
            <div className="members-list">
                {members.map((member) => (
                <article
                    className="member-card"
                    key={member.id}
                >
                    <div className="member-avatar">
                    👤
                    </div>

                    <h3>
                    {member.first_name} {member.last_name}
                    </h3>

                    <p className="member-birthdate">
                    <strong>Date of Birth</strong>
                    <span>
                        {formatDate(member.birth_date)}
                    </span>
                    </p>

                    <div className="member-demo-label">
                    View Only
                    </div>
                </article>
                ))}
            </div>
            )}
        </section>

        <footer className="members-footer">
            Family Heritage Tree | Fictional Bennett Family Demo
        </footer>
        </main>
    );
}
