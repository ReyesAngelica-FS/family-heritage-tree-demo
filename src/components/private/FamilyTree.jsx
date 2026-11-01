import { useEffect, useMemo, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Handle,
  Position,
  MarkerType,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { supabase } from "../../lib/supabase";
import "./FamilyTree.css";

const parentTypes = new Set([
  "parent",
  "mother",
  "father",
  "step-parent",
  "adoptive-parent",
]);

const childTypes = new Set([
  "child",
  "son",
  "daughter",
  "step-child",
  "adopted-child",
]);

const grandparentTypes = new Set(["grandparent", "grandmother", "grandfather"]);

const grandchildTypes = new Set(["grandchild", "grandson", "granddaughter"]);

const spouseTypes = new Set(["spouse", "husband", "wife"]);

const siblingTypes = new Set(["sibling", "brother", "sister"]);

const NODE_WIDTH = 210;
const HORIZONTAL_GAP = 90;
const VERTICAL_GAP = 240;

function PersonNode({ data }) {
  return (
    <div className="tree-person">
      <Handle type="target" position={Position.Top} />

      <div className="tree-person-icon">👤</div>
      <strong>{data.name}</strong>

      {data.branch && <span>{data.branch}</span>}
      {data.birth && <small>Born: {data.birth}</small>}

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

const nodeTypes = { person: PersonNode };

function fullName(member) {
  return [member.first_name, member.middle_name, member.last_name]
    .filter(Boolean)
    .join(" ");
}

export default function FamilyTree({ onBack }) {
  const [members, setMembers] = useState([]);
  const [relationships, setRelationships] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadTree() {
      setLoading(true);
      setError("");

      const [memberResult, relationResult, branchResult] = await Promise.all([
        supabase.from("family_members").select("*"),
        supabase.from("relationships").select("*"),
        supabase.from("family_branches").select("*"),
      ]);

      if (!active) return;

      const failure =
        memberResult.error || relationResult.error || branchResult.error;

      if (failure) {
        setError(failure.message);
      } else {
        setMembers(memberResult.data || []);
        setRelationships(relationResult.data || []);
        setBranches(branchResult.data || []);
      }

      setLoading(false);
    }

    loadTree();

    return () => {
      active = false;
    };
  }, []);

  const { nodes, edges } = useMemo(() => {
    const ids = new Set(members.map((m) => String(m.member_id)));

    const branchMap = new Map(
      branches.map((b) => [String(b.branch_id), b.surname])
    );

    const parentLinks = [];
    const spouseLinks = [];
    const siblingLinks = [];

    relationships.forEach((r) => {
      const from = String(r.member_id);
      const to = String(r.related_member_id);
      const type = String(r.relationship_type || "")
        .toLowerCase()
        .trim();

      if (!ids.has(from) || !ids.has(to) || from === to) {
        return;
      }

      if (parentTypes.has(type)) {
        parentLinks.push({
          parent: from,
          child: to,
          gap: 1,
        });
      } else if (childTypes.has(type)) {
        parentLinks.push({
          parent: to,
          child: from,
          gap: 1,
        });
      } else if (grandparentTypes.has(type)) {
        parentLinks.push({
          parent: from,
          child: to,
          gap: 2,
        });
      } else if (grandchildTypes.has(type)) {
        parentLinks.push({
          parent: to,
          child: from,
          gap: 2,
        });
      } else if (spouseTypes.has(type)) {
        spouseLinks.push([from, to]);
      } else if (siblingTypes.has(type)) {
        siblingLinks.push([from, to]);
      }
    });

    // Create generation groups.
    // Spouses and siblings are grouped together.
    const groupParent = new Map([...ids].map((id) => [id, id]));

    function find(id) {
      let root = id;

      while (groupParent.get(root) !== root) {
        root = groupParent.get(root);
      }

      let current = id;

      while (current !== root) {
        const next = groupParent.get(current);
        groupParent.set(current, root);
        current = next;
      }

      return root;
    }

    function union(a, b) {
      const rootA = find(a);
      const rootB = find(b);

      if (rootA !== rootB) {
        groupParent.set(rootB, rootA);
      }
    }

    spouseLinks.forEach(([a, b]) => union(a, b));
    siblingLinks.forEach(([a, b]) => union(a, b));

    // Assign generations using parent-child links.
    const generations = new Map([...ids].map((id) => [id, 0]));

    const groupLinks = parentLinks
      .map(({ parent, child, gap }) => ({
        parent: find(parent),
        child: find(child),
        gap,
      }))
      .filter((link) => link.parent !== link.child);

    // Compute generation levels for groups.
    const groupLevels = new Map([...ids].map((id) => [find(id), 0]));

    // Limit passes to avoid infinite loops from bad data.
    for (let i = 0; i < groupLevels.size; i++) {
      let changed = false;

      for (const link of groupLinks) {
        const next = (groupLevels.get(link.parent) || 0) + link.gap;

        if (next > (groupLevels.get(link.child) || 0)) {
          groupLevels.set(link.child, next);
          changed = true;
        }
      }

      if (!changed) break;
    }

    members.forEach((member) => {
      const id = String(member.member_id);
      generations.set(id, groupLevels.get(find(id)) || 0);
    });

    // Organize people into generation rows.
    const rows = new Map();

    members.forEach((member) => {
      const id = String(member.member_id);
      const level = generations.get(id) || 0;

      if (!rows.has(level)) rows.set(level, []);
      rows.get(level).push(member);
    });

    const parentMap = new Map();

    parentLinks.forEach(({ parent, child }) => {
      if (!parentMap.has(child)) {
        parentMap.set(child, new Set());
      }
      parentMap.get(child).add(parent);
    });

    // Sort each generation so related people stay close.
    const positions = new Map();

    const sortedLevels = [...rows.keys()].sort((a, b) => a - b);

    sortedLevels.forEach((level) => {
      const row = rows.get(level);

      function familyScore(member) {
        const id = String(member.member_id);
        const parents = [...(parentMap.get(id) || [])];

        const parentPositions = parents
          .filter((p) => positions.has(p))
          .map((p) => positions.get(p).x);

        if (parentPositions.length > 0) {
          return (
            parentPositions.reduce((sum, x) => sum + x, 0) /
            parentPositions.length
          );
        }

        return Number.MAX_SAFE_INTEGER;
      }

      row.sort((a, b) => {
        const scoreA = familyScore(a);
        const scoreB = familyScore(b);

        if (scoreA !== scoreB) {
          return scoreA - scoreB;
        }

        return fullName(a).localeCompare(fullName(b));
      });

      // Keep people from the same spouse/sibling
      // group together.
      const orderedGroups = [];
      const seenGroups = new Set();

      row.forEach((member) => {
        const root = find(String(member.member_id));

        if (!seenGroups.has(root)) {
          seenGroups.add(root);
          orderedGroups.push(root);
        }
      });

      const orderedRow = orderedGroups.flatMap((root) =>
        row.filter((member) => find(String(member.member_id)) === root)
      );

      const rowWidth = (orderedRow.length - 1) * (NODE_WIDTH + HORIZONTAL_GAP);

      orderedRow.forEach((member, index) => {
        const id = String(member.member_id);

        positions.set(id, {
          x: index * (NODE_WIDTH + HORIZONTAL_GAP) - rowWidth / 2,
          y: level * VERTICAL_GAP,
        });
      });
    });

    const treeNodes = members.map((member) => {
      const id = String(member.member_id);

      return {
        id,
        type: "person",
        position: positions.get(id) || { x: 0, y: 0 },
        data: {
          name: fullName(member),
          branch: branchMap.get(String(member.branch_id)),
          birth: member.date_of_birth,
        },
      };
    });

    const treeEdges = relationships
      .filter(
        (r) =>
          ids.has(String(r.member_id)) && ids.has(String(r.related_member_id))
      )
      .map((r) => {
        const type = String(r.relationship_type || "")
          .toLowerCase()
          .trim();

        const isSpouse = spouseTypes.has(type);
        const isChild = childTypes.has(type) || grandchildTypes.has(type);
        const isSibling = siblingTypes.has(type);

        const source = isChild
          ? String(r.related_member_id)
          : String(r.member_id);

        const target = isChild
          ? String(r.member_id)
          : String(r.related_member_id);

        const color = isSpouse ? "#f3a4c8" : isSibling ? "#7dd3fc" : "#a78bfa";

        return {
          id: String(r.relationship_id),
          source,
          target,
          label: isSpouse ? "Married" : type,
          type: isSpouse || isSibling ? "straight" : "smoothstep",
          animated: false,
          style: {
            stroke: color,
            strokeWidth: 2,
          },
          markerEnd:
            isSpouse || isSibling
              ? undefined
              : {
                  type: MarkerType.ArrowClosed,
                  color,
                },
          labelStyle: {
            fill: "#e9e4ff",
            fontSize: 12,
          },
          labelBgStyle: {
            fill: "#292836",
          },
        };
      });

    return {
      nodes: treeNodes,
      edges: treeEdges,
    };
  }, [members, relationships, branches]);

  return (
    <main className="family-tree-page">
      <header className="family-tree-header">
        <div>
          <h1>Our Family Tree</h1>
          <p>Discover the connections between generations.</p>
        </div>

        <button type="button" onClick={onBack}>
          Back to Dashboard
        </button>
      </header>

      {loading ? (
        <p>Loading your family tree...</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : members.length === 0 ? (
        <p>Add family members to begin your tree.</p>
      ) : (
        <section className="family-tree-canvas">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.3 }}
            nodesConnectable={false}
            nodesDraggable={false}
            deleteKeyCode={null}
          >
            <Background color="#474459" gap={22} />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </section>
      )}
    </main>
  );
}
