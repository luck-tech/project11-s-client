const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export async function getClaims(id: string, type: string) {
  const res = await fetch(`${API_URL}/trial/claims_and_judgments/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ trial_id: id, resource_type: type }),
  });

  if (!res.ok) {
    throw new Error(`failed get claims ${res.status}`);
  }

  return await res.json();
}
