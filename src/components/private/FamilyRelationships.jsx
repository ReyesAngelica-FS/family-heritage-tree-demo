import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import "./FamilyRelationships.css";

// Values must match the Supabase CHECK constraint.
const relationshipTypes = [
  { value: "father", label: "Father" },
  { value: "mother", label: "Mother" },
  { value: "parent", label: "Parent" },
  { value: "son", label: "Son" },
  { value: "daughter", label: "Daughter" },
  { value: "child", label: "Child" },
  { value: "brother", label: "Brother" },
  { value: "sister", label: "Sister" },
  { value: "sibling", label: "Sibling" },
  { value: "spouse", label: "Spouse" },
  { value: "husband", label: "Husband" },
  { value: "wife", label: "Wife" },
  { value: "grandfather", label: "Grandfather" },
  { value: "grandmother", label: "Grandmother" },
  { value: "grandparent", label: "Grandparent" },
  { value: "grandson", label: "Grandson" },
  { value: "granddaughter", label: "Granddaughter" },
  { value: "grandchild", label: "Grandchild" },
  { value: "aunt", label: "Aunt" },
  { value: "uncle", label: "Uncle" },
  { value: "niece", label: "Niece" },
  { value: "nephew", label: "Nephew" },
  { value: "cousin", label: "Cousin" },
  { value: "step-parent", label: "Step-Parent" },
  { value: "step-child", label: "Step-Child" },
  { value: "adoptive-parent", label: "Adoptive Parent" },
  { value: "adopted-child", label: "Adopted Child" },
  { value: "other", label: "Other" },
];

export default function FamilyRelationships({ onBack }) {
  const [members, setMembers] = useState([]);
  const [relationships, setRelationships] = useState([]);

  const [memberId, setMemberId] = useState("");
  const [relatedMemberId, setRelatedMemberId] = useState("");
  const [relationshipType, setRelationshipType] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;

    async function fetchData() {
      setLoading(true);

      const [membersResult, relationshipsResult] = await Promise.all([
        supabase
          .from("family_members")
          .select("member_id, first_name, middle_name, last_name")
          .order("last_name"),

        supabase
          .from("relationships")
          .select("*")
          .order("created_at", { ascending: false }),
      ]);

      if (!active) return;

      if (membersResult.error || relationshipsResult.error) {
        setMessage(
          "Unable to load data: " +
            (membersResult.error?.message || relationshipsResult.error?.message)
        );
      } else {
        setMembers(membersResult.data || []);
        setRelationships(relationshipsResult.data || []);
      }

      setLoading(false);
    }

    fetchData();

    return () => {
      active = false;
    };
  }, []);

  function getMemberName(id) {
    const member = members.find(
      (person) => String(person.member_id) === String(id)
    );

    if (!member) return "Unknown Member";

    return [member.first_name, member.middle_name, member.last_name]
      .filter(Boolean)
      .join(" ");
  }

  function getRelationshipLabel(value) {
    const relationship = relationshipTypes.find((type) => type.value === value);

    return relationship?.label || value;
  }

  async function refreshRelationships() {
    const { data, error } = await supabase
      .from("relationships")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setMessage("Relationship saved, but unable to refresh: " + error.message);
      return false;
    }

    setRelationships(data || []);
    return true;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    if (!memberId || !relatedMemberId || !relationshipType) {
      setMessage("Please complete all fields.");
      return;
    }

    if (memberId === relatedMemberId) {
      setMessage("A person cannot be related to themselves.");
      return;
    }

    const duplicate = relationships.some(
      (relationship) =>
        String(relationship.member_id) === memberId &&
        String(relationship.related_member_id) === relatedMemberId &&
        relationship.relationship_type === relationshipType
    );

    if (duplicate) {
      setMessage("This relationship already exists.");
      return;
    }

    setSaving(true);

    try {
      const { error } = await supabase.from("relationships").insert({
        member_id: Number(memberId),
        related_member_id: Number(relatedMemberId),
        relationship_type: relationshipType,
      });

      if (error) {
        setMessage("Unable to save: " + error.message);
        return;
      }

      setMemberId("");
      setRelatedMemberId("");
      setRelationshipType("");

      const refreshed = await refreshRelationships();

      if (refreshed) {
        setMessage("Family relationship saved successfully!");
      }
    } catch (error) {
      setMessage("Unexpected error: " + error.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="relationships-page">
      <header className="relationships-header">
        <div>
          <h1>Family Relationships</h1>
          <p>Connecting our family across generations.</p>
        </div>

        <button type="button" onClick={onBack}>
          Back to Dashboard
        </button>
      </header>

      <section className="relationships-panel">
        <h2>Add a Family Relationship</h2>

        <form onSubmit={handleSubmit} className="relationships-form">
          <label>
            Family Member
            <select
              value={memberId}
              onChange={(event) => setMemberId(event.target.value)}
              required
            >
              <option value="">Select a family member</option>

              {members.map((member) => (
                <option key={member.member_id} value={member.member_id}>
                  {getMemberName(member.member_id)}
                </option>
              ))}
            </select>
          </label>

          <label>
            Relationship
            <select
              value={relationshipType}
              onChange={(event) => setRelationshipType(event.target.value)}
              required
            >
              <option value="">Select relationship</option>

              {relationshipTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            Related Family Member
            <select
              value={relatedMemberId}
              onChange={(event) => setRelatedMemberId(event.target.value)}
              required
            >
              <option value="">Select related person</option>

              {members
                .filter((member) => String(member.member_id) !== memberId)
                .map((member) => (
                  <option key={member.member_id} value={member.member_id}>
                    {getMemberName(member.member_id)}
                  </option>
                ))}
            </select>
          </label>

          <button
            className="relationships-save"
            type="submit"
            disabled={saving || loading || members.length < 2}
          >
            {saving ? "Saving..." : "Save Relationship"}
          </button>
        </form>

        {!loading && members.length < 2 && (
          <p>Add at least two family members before creating a relationship.</p>
        )}

        {message && (
          <p role="status" aria-live="polite">
            {message}
          </p>
        )}
      </section>

      <section className="relationships-panel">
        <h2>Recorded Relationships ({relationships.length})</h2>

        {loading ? (
          <p>Loading relationships...</p>
        ) : relationships.length === 0 ? (
          <p>No family relationships recorded yet.</p>
        ) : (
          <div className="relationships-list">
            {relationships.map((relationship) => (
              <article
                className="relationship-card"
                key={relationship.relationship_id}
              >
                <h3>{getMemberName(relationship.member_id)}</h3>

                <p>
                  <strong>
                    {getRelationshipLabel(relationship.relationship_type)}
                  </strong>
                </p>

                <h3>{getMemberName(relationship.related_member_id)}</h3>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
