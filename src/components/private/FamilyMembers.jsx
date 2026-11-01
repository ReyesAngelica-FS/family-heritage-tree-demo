import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import "./FamilyMembers.css";

export default function FamilyMembers({ onBack }) {
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
        .order("last_name", { ascending: true })
        .order("first_name", { ascending: true });

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

  function formatDate(dateString) {
    if (!dateString) return "Not recorded";

    const [year, month, day] = dateString.split("-").map(Number);

    return new Date(year, month - 1, day).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <main className="members-page">
      <header className="members-header">
        <div>
          <h1>Family Members</h1>
          <p>Explore the fictional Bennett family registry.</p>
        </div>

        <button type="button" onClick={onBack}>
          Back to Dashboard
        </button>
      </header>

      <section className="members-panel">
        <h2>Family Registry ({members.length})</h2>

        <p className="members-demo-notice">
          Demonstration data only. All names and family relationships are
          fictional. Records are displayed in read-only mode.
        </p>

        {loading ? (
          <p>Loading family members...</p>
        ) : error ? (
          <p role="alert">Unable to load family members: {error}</p>
        ) : members.length === 0 ? (
          <p>
            No demo family members are available yet. We'll add fictional
            Bennett family records to Supabase next.
          </p>
        ) : (
          <div className="members-list">
            {members.map((member) => (
              <article key={member.id}>
                <div className="member-avatar" aria-hidden="true">
                  👤
                </div>

                <h3>
                  {member.first_name} {member.last_name}
                </h3>

                <p>
                  <strong>Date of Birth:</strong>{" "}
                  {formatDate(member.birth_date)}
                </p>

                <p className="member-demo-label">Fictional Family Member</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
