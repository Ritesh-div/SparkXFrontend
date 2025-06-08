export async function signUpApiCall(
  username: string,
  email: string,
  password: string
) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/user/signup`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Signup failed");
  }
  return data;
}
