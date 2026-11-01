
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
import "./DemoFamilyTree.css";

const parentTypes = new Set([
    "parent",
    "mother",
    "father",
]);

const childTypes = new Set([
    "child",
    "son",
    "daughter",
]);

const spouseTypes = new Set([
    "spouse",
    "husband",
    "wife",
    "married",
]);

function DemoPersonNode({ data }) {
    return (
        <div className="demo-tree-person">
        <Handle
            type="target"
            position={Position.Top}
            isConnectable={false}
        />

        <div className="demo-tree-person-icon">👤</div>

        <strong>{data.name}</strong>

        {data.birthDate && (
            <small>
            Born: {data.birthDate}
            </small>
        )}

        <Handle
            type="source"
            position={Position.Bottom}
            isConnectable={false}
        />
        </div>
    );
    }

    const nodeTypes = {
    person: DemoPersonNode,
    };

    function buildFamilyGraph(people, relationships) {
    const peopleById = new Map(
        people.map((person) => [person.id, person])
    );

    const parentLinks = [];
    const spouseLinks = [];
    const seenLinks = new Set();

    for (const relationship of relationships) {
        const type = (
        relationship.relationship_type || ""
        ).toLowerCase();

        let parentId = null;
        let childId = null;

        if (parentTypes.has(type)) {
        parentId = relationship.person_id;
        childId = relationship.related_person_id;
        } else if (childTypes.has(type)) {
        parentId = relationship.related_person_id;
        childId = relationship.person_id;
        }

        if (
        parentId &&
        childId &&
        parentId !== childId &&
        peopleById.has(parentId) &&
        peopleById.has(childId)
        ) {
        const key = `parent-${parentId}-${childId}`;

        if (!seenLinks.has(key)) {
            seenLinks.add(key);

            parentLinks.push({
            parentId,
            childId,
            });
        }
        }

        if (
        spouseTypes.has(type) &&
        relationship.person_id !== relationship.related_person_id &&
        peopleById.has(relationship.person_id) &&
        peopleById.has(relationship.related_person_id)
        ) {
        const pair = [
            relationship.person_id,
            relationship.related_person_id,
        ].sort();

        const key = `spouse-${pair.join("-")}`;

        if (!seenLinks.has(key)) {
            seenLinks.add(key);

            spouseLinks.push({
            personId: pair[0],
            relatedId: pair[1],
            });
        }
        }
    }

    // Establish generation levels using parent-child connections.
    const generations = new Map(
        people.map((person) => [person.id, 0])
    );

    // A bounded number of passes prevents infinite processing
    // if incorrect relationship data contains a cycle.
    for (let pass = 0; pass < people.length; pass++) {
        let changed = false;

        for (const { parentId, childId } of parentLinks) {
        const nextLevel = generations.get(parentId) + 1;

        if (nextLevel > generations.get(childId)) {
            generations.set(childId, nextLevel);
            changed = true;
        }
        }

        if (!changed) break;
    }

    // Keep spouses in the same generation when possible.
    for (const { personId, relatedId } of spouseLinks) {
        const level = Math.max(
        generations.get(personId),
        generations.get(relatedId)
        );

        generations.set(personId, level);
        generations.set(relatedId, level);
    }

    // Propagate generation changes after aligning spouses.
    for (let pass = 0; pass < people.length; pass++) {
        let changed = false;

        for (const { parentId, childId } of parentLinks) {
        const nextLevel = generations.get(parentId) + 1;

        if (nextLevel > generations.get(childId)) {
            generations.set(childId, nextLevel);
            changed = true;
        }
        }

        if (!changed) break;
    }

    const groups = new Map();

    for (const person of people) {
        const level = generations.get(person.id) || 0;

        if (!groups.has(level)) {
        groups.set(level, []);
        }

        groups.get(level).push(person);
    }

    const nodes = [];

    for (const [level, group] of [...groups.entries()].sort(
        (a, b) => a[0] - b[0]
    )) {
        group.sort((a, b) => {
        const nameA = `${a.first_name} ${a.last_name}`;
        const nameB = `${b.first_name} ${b.last_name}`;

        return nameA.localeCompare(nameB);
        });

        group.forEach((person, index) => {
        nodes.push({
            id: person.id,
            type: "person",
            position: {
            x: index * 270,
            y: level * 220,
            },
            data: {
            name: `${person.first_name} ${person.last_name}`,
            birthDate: person.birth_date,
            },
            draggable: false,
            selectable: true,
        });
        });
    }

    const parentEdges = parentLinks.map(
        ({ parentId, childId }) => ({
        id: `parent-${parentId}-${childId}`,
        source: parentId,
        target: childId,
        type: "smoothstep",
        animated: false,
        markerEnd: {
            type: MarkerType.ArrowClosed,
        },
        style: {
            stroke: "#a78242",
            strokeWidth: 2,
        },
        label: "Parent",
        })
    );

    const spouseEdges = spouseLinks.map(
        ({ personId, relatedId }) => ({
        id: `spouse-${personId}-${relatedId}`,
        source: personId,
        target: relatedId,
        type: "smoothstep",
        style: {
            stroke: "#c6a36a",
            strokeWidth: 2,
            strokeDasharray: "6 4",
        },
        label: "Married",
        })
    );

    return {
        nodes,
        edges: [...parentEdges, ...spouseEdges],
    };
    }

    export default function DemoFamilyTree({ onBack }) {
    const [people, setPeople] = useState([]);
    const [relationships, setRelationships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;

        async function loadTree() {
        setLoading(true);
        setError("");

        const [peopleResult, relationshipsResult] =
            await Promise.all([
            supabase
                .from("people")
                .select(
                "id, first_name, last_name, birth_date"
                ),

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
        } else {
            setPeople(peopleResult.data || []);
            setRelationships(relationshipsResult.data || []);
        }

        setLoading(false);
        }

        loadTree();

        return () => {
        active = false;
        };
    }, []);

    const { nodes, edges } = useMemo(
        () => buildFamilyGraph(people, relationships),
        [people, relationships]
    );

    return (
        <main className="demo-tree-page">
        <header className="demo-tree-header">
            <div>
            <p className="demo-tree-eyebrow">
                FAMILY HERITAGE TREE DEMO
            </p>

            <h1>Bennett Family Tree</h1>

            <p>
                Explore a fictional family across generations.
            </p>
            </div>

            <button
            type="button"
            className="demo-tree-back-button"
            onClick={onBack}
            >
            ← Back to Dashboard
            </button>
        </header>

        <section className="demo-tree-notice">
            <strong>Public Demo — Read Only</strong>

            <p>
            All family members and relationships are fictional.
            You may zoom and explore the tree, but editing is disabled.
            </p>
        </section>

        <section className="demo-tree-panel">
            <div className="demo-tree-panel-heading">
            <h2>Family Connections</h2>

            <span>
                {people.length} Members · {edges.length} Connections
            </span>
            </div>

            {loading ? (
            <p role="status">Loading family tree...</p>
            ) : error ? (
            <p role="alert" className="demo-tree-error">
                {error}
            </p>
            ) : nodes.length === 0 ? (
            <p>No family members were found.</p>
            ) : (
            <div className="demo-tree-canvas">
                <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                fitView
                fitViewOptions={{ padding: 0.25 }}
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={true}
                nodesDeleteable={false}
                edgesFocusable={false}
                panOnDrag
                zoomOnScroll
                zoomOnPinch
                minZoom={0.2}
                maxZoom={2}
                >
                <Background
                    color="#484035"
                    gap={20}
                />

                <Controls
                    showInteractive={false}
                />

                <MiniMap
                    pannable
                    zoomable
                    nodeColor="#a78242"
                />
                </ReactFlow>
            </div>
            )}
        </section>

        <footer className="demo-tree-footer">
            Family Heritage Tree — Fictional Bennett Family
        </footer>
        </main>
    );
}
