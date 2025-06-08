export async function logInApiCall(email: string, password: string) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/user/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Login failed");
  }
  return data;
}
