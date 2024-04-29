export default function NewUserPage() {
  if (typeof window !== "undefined") {
    window.location.assign(process.env.NEXT_PUBLIC_WEBAPP_URL || "https://app.timely");
  }
  return null;
}
