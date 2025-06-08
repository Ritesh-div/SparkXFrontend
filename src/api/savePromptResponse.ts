export async function savePromptResponse(
  prompt: string,
  response: string,
  userId: string
) {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/prompt-response`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, response, userId }),
    }
  );
  return res.json();
}
