import Image from "next/image"
import { Package, BarChart3, Settings, Users, FileText, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function Sidebar() {
  const menuItems = [
    { icon: Package, label: "Inventory", active: true },
    { icon: BarChart3, label: "Analytics" },
    { icon: Users, label: "Suppliers" },
    { icon: FileText, label: "Reports" },
    { icon: Settings, label: "Settings" },
  ]

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Admin Profile Section */}
      <div className="p-6 text-center">
        <div className="relative w-20 h-20 mx-auto mb-4">
          <Image
            src="/placeholder.svg?height=80&width=80"
            alt="Admin Profile"
            width={80}
            height={80}
            className="rounded-full border-4 border-blue-100 object-cover"
          />
          <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
        </div>
        <h3 className="font-semibold text-gray-900">John Anderson</h3>
        <p className="text-sm text-gray-500">System Administrator</p>
      </div>

      <Separator />

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              variant={item.active ? "default" : "ghost"}
              className={`w-full justify-start gap-3 h-11 ${
                item.active ? "bg-blue-600 text-white hover:bg-blue-700" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Button>
          ))}
        </div>
      </nav>

      <Separator />

      {/* Logout Section */}
      <div className="p-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 h-11 text-gray-700 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </div>
    </div>
  )
}
