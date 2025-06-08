export async function deletePromptResponse(id: string) {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/prompt-response/delete/${id}`,
    {
      method: "DELETE",
    }
  );
  return res;
}
