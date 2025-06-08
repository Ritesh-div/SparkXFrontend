export async function forgetPasswordResetApiCall(email: string) {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/user/forgot-password`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }), // <-- send email here
    }
  );
  return res;
}
