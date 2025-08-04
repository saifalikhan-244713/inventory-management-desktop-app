import Sidebar from "@/components/Sidebar";
import InventoryDashboard from "@/components/Inventory-dashboard";

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        <InventoryDashboard />
      </main>
    </div>
  );
}
