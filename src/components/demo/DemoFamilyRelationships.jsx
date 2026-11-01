
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

import "./DemoFamilyRelationships.css";

export default function DemoFamilyRelationships({ onBack }) {
    const [relationships, setRelationships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        let active = true;

        async function loadRelationships() {
        setLoading(true);
        setError("");

        const [peopleResult, relationshipsResult] =
            await Promise.all([
            supabase
                .from("people")
                .select("id, first_name, last_name"),

            supabase
                .from("relationships")
                .select(
                "id, person_id, related_person_id, relationship_type"
                ),
            ]);

        if (!active) return;

        if (peopleResult.error || relationshipsResult.error) {
            setError(
            peopleResult.error?.message ||
            relationshipsResult.error?.message
            );
            setLoading(false);
            return;
        }

        const peopleById = new Map(
            (peopleResult.data || []).map((person) => [
            person.id,
            `${person.first_name} ${person.last_name}`,
            ])
        );

        const resolved = (relationshipsResult.data || []).map(
            (relationship) => ({
            ...relationship,
            personName:
                peopleById.get(relationship.person_id) ||
                "Unknown person",
            relatedName:
                peopleById.get(relationship.related_person_id) ||
                "Unknown person",
            })
        );

        resolved.sort((a, b) =>
            a.personName.localeCompare(b.personName)
        );

        setRelationships(resolved);
        setLoading(false);
        }

        loadRelationships();

        return () => {
        active = false;
        };
    }, []);

    const relationshipTypes = [
        ...new Set(
        relationships.map((item) => item.relationship_type)
        ),
    ].sort();

    const filteredRelationships =
        filter === "all"
        ? relationships
        : relationships.filter(
            (item) => item.relationship_type === filter
            );

    function formatRelationship(type) {
        if (!type) return "Related to";

        return type
        .replaceAll("_", " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase());
    }

    return (
        <main className="relationships-page">

        {/* Page Header */}
        <header className="relationships-header">
            <div>
            <p className="relationships-eyebrow">
                FAMILY HERITAGE TREE DEMO
            </p>

            <h1>Bennett Family Relationships</h1>

            <p>
                Explore the connections that bring
                generations together.
            </p>
            </div>

            <button
            type="button"
            onClick={onBack}
            className="relationships-back-button"
            >
            ← Back to Dashboard
            </button>
        </header>

        {/* Demo Notice */}
        <section className="relationships-demo-notice">
            <strong>Public Demonstration — Read Only</strong>

            <p>
            This demonstration uses fictional Bennett
            family records. You can explore relationships
            but cannot change or delete any information.
            </p>
        </section>

        {/* Relationships Registry */}
        <section className="relationships-panel">

            <div className="relationships-section-header">
            <div>
                <h2>Family Connections</h2>

                <p>
                Browse recorded relationships
                across the Bennett family.
                </p>
            </div>

            <span className="relationships-count">
                {relationships.length} Connections
            </span>
            </div>

            {/* Filter */}
            <div className="relationships-filter">
            <label htmlFor="relationship-filter">
                Filter by Relationship
            </label>

            <select
                id="relationship-filter"
                value={filter}
                onChange={(event) =>
                setFilter(event.target.value)
                }
            >
                <option value="all">
                All Relationships
                </option>

                {relationshipTypes.map((type) => (
                <option key={type} value={type}>
                    {formatRelationship(type)}
                </option>
                ))}
            </select>
            </div>

            {loading && (
            <p role="status">
                Loading Bennett family relationships...
            </p>
            )}

            {error && (
            <p role="alert" className="relationships-error">
                Unable to load relationships: {error}
            </p>
            )}

            {!loading &&
            !error &&
            filteredRelationships.length === 0 && (
                <p>No matching relationships were found.</p>
            )}

            {!loading &&
            !error &&
            filteredRelationships.length > 0 && (
                <div className="relationships-list">
                {filteredRelationships.map((relationship) => (
                    <article
                    className="relationship-card"
                    key={relationship.id}
                    >
                    <div className="relationship-person">
                        <span className="relationship-avatar">
                        👤
                        </span>

                        <h3>{relationship.personName}</h3>
                    </div>

                    <div className="relationship-connection">
                        <span className="relationship-line" />

                        <span className="relationship-type">
                        {formatRelationship(
                            relationship.relationship_type
                        )}
                        </span>

                        <span className="relationship-line" />
                    </div>

                    <div className="relationship-person">
                        <span className="relationship-avatar">
                        👤
                        </span>

                        <h3>{relationship.relatedName}</h3>
                    </div>

                    <div className="relationship-readonly">
                        View Only
                    </div>
                    </article>
                ))}
                </div>
            )}
        </section>

        <footer className="relationships-footer">
            Family Heritage Tree | Fictional Bennett Family Demo
        </footer>
        </main>
    );
}
