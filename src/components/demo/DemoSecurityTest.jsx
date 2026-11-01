
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function DemoSecurityTest() {
    const [results, setResults] = useState([]);

    useEffect(() => {
        async function runTests() {
        const { data: sessionData } =
            await supabase.auth.getSession();

        if (sessionData.session) {
            setResults([
            "Sign out before testing anonymous access.",
            ]);
            return;
        }

        const { data: people, error: peopleError } =
            await supabase
            .from("people")
            .select("id")
            .limit(1);

        const { data: relationships, error: relationshipError } =
            await supabase
            .from("relationships")
            .select("id")
            .limit(1);

        setResults([
            peopleError
            ? `People read: FAILED - ${peopleError.message}`
            : `People read: PASSED (${people.length} sample row)`,

            relationshipError
            ? `Relationships read: FAILED - ${relationshipError.message}`
            : `Relationships read: PASSED (${relationships.length} sample row)`,
        ]);
        }

        runTests();
    }, []);

    return (
        <section style={{ padding: "30px" }}>
        <h2>Public Demo Security Test</h2>
        {results.map((result, index) => (
            <p key={index}>{result}</p>
        ))}
        </section>
    );
}
