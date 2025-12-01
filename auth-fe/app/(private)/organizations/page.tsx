"use client";

import { useContext, useEffect, useState } from "react";
import auth from "@/lib/auth";
import { AuthContext } from "@/composables/authentication";

export default function CreateOrgPage() {
  const [name, setName] = useState("");

  const authCtx = useContext(AuthContext);

  // Fetch organizations safely in client-side lifecycle
  useEffect(() => {
    const load = async () => {
      const { data, error } = await auth.organization.list();

      if (error) {
        console.error("List org error:", error);
        return;
      }
    };

    load();
  }, [authCtx?.session]);

  const handleCreate = async () => {
    const { data, error } = await auth.organization.create({
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
      keepCurrentActiveOrganization: false,
    });

    if (error) {
      console.error("Create org error:", error);
      alert("Error: " + error.message);
      return;
    }

    alert("Organization created!");

    // Refresh list
    const { data: list } = await auth.organization.list();
  };

  return (
    <div>
      <h1>Current Organization:</h1>
      <p>
        {authCtx?.org ? (
          <span>{authCtx.org.name}</span>
        ) : (
          <span style={{ color: "gray" }}>No active organization</span>
        )}
      </p>

      <h2>Create Organization</h2>

      <input
        placeholder="Organization Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={handleCreate}>Create</button>

      <h2>Your Organizations</h2>
      <ul>
        {authCtx?.orgs.map((o) => (
          <li key={o.id}>
            {o.name} {o.id === authCtx?.org?.id && <b>(active)</b>}
          </li>
        ))}
      </ul>
    </div>
  );
}
