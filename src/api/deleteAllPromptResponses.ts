export async function deleteAllPromptResponses() {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/prompt-response/delete-all`,
    {
      method: "DELETE",
    }
  );
  return res;
}
