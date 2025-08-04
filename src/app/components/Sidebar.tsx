import Image from "next/image"
import { Package, BarChart3, Settings, Users, FileText, LogOut } from "lucide-react"

export function Sidebar() {
  const menuItems = [
    { icon: Package, label: "Inventory", active: true },
    { icon: BarChart3, label: "Analytics" },
    { icon: Users, label: "Suppliers" },
    { icon: FileText, label: "Reports" },
    { icon: Settings, label: "Settings" },
  ]

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm">
      {/* Admin Profile Section */}
      <div className="p-6 text-center border-b border-gray-100">
        <div className="relative w-20 h-20 mx-auto mb-4">
          <Image
            src="/adminImg.webp"
            alt="Admin Profile"
            width={80}
            height={80}
            className="rounded-full border-4 border-blue-100 object-cover shadow-md"
          />
          <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-2 border-white rounded-full shadow-sm"></div>
        </div>
        <h3 className="font-semibold text-gray-900 text-lg">John Anderson</h3>
        <p className="text-sm text-gray-500 mt-1">System Administrator</p>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                item.active
                  ? "bg-blue-600 text-white shadow-md hover:bg-blue-700"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Logout Section */}
      <div className="p-4 border-t border-gray-100">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  )
}
