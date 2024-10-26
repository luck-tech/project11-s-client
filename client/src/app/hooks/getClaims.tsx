const getClaims = async (id: string, type: string) => {
  const res = await fetch(
    "https://project7.uni-bo.net/api/trial/claims_and_judgments/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ trial_id: id, resource_type: type }),
    }
  );

  if (!res.ok) {
    throw new Error(`failed get claims ${res.status}`);
  }

  return await res.json();
};

export default getClaims;
