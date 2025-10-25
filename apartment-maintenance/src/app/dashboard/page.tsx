import LogoutButton from "@/components/custom/logoutButton";

export default async function Dashboard() {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to Dashboard</h1>
       <LogoutButton />
    </div>
  );
}
