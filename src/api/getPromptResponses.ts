export async function getPromptResponses(userId: string) {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/prompt-response?userId=${userId}`
  );
  return res.json();
}
