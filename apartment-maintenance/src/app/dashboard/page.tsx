import LogoutButton from "@/components/custom/logoutButton";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  // const token = (await cookies()).get("token")?.value;

  // if (!token) {
  //   redirect("/login");
  // }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to Dashboard</h1>
       <LogoutButton />
    </div>
  );
}
