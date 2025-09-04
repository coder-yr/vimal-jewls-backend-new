"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function ProfilePage() {
  const router = useRouter()

  const user = {
    firstName: "Time",
    lastName: "passes",
    email: "timepasses217@gmail.com",
    phone: "9876543210",
    alternatePhone: "",
    gender: "",
    dob: "",
    anniversary: "",
  }

  const sidebarLinks = [
    { label: "My Orders", href: "/orders" },
    { label: "My Wish List", href: "/wishlist" },
    { label: "Address Book", href: "/address-book" },
    { label: "Ekyc", href: "/ekyc" },
    { label: "Account Information", href: "/account-info" },
    { label: "Saved Cards", href: "/saved-cards" },
    { label: "My Wallet", href: "/wallet" },
    { label: "My Schedule Call", href: "/schedule-call" },
    { label: "DigiGold Locker", href: "/digigold-locker" },
    { label: "Earn Rewards", href: "/earn-rewards" },
  ]

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-white shadow-md p-4">
        <div className="text-center mb-6">
          <img
            src="/placeholder-user.jpg"
            alt="User Avatar"
            className="w-16 h-16 rounded-full mx-auto"
          />
          <p className="mt-2 text-sm font-medium">WELCOME,</p>
          <p className="text-lg font-semibold">Time passes</p>
        </div>
        <nav className="space-y-4">
          {sidebarLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => router.push(link.href)}
              className="block text-gray-700 hover:text-[#009999] text-left w-full"
            >
              {link.label}
            </button>
          ))}
        </nav>
        <Separator className="my-4" />
        <Button className="w-full bg-[#009999] text-white hover:bg-[#007a7a] py-2 rounded-md font-semibold">
          LOGOUT
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </Label>
            <Input id="firstName" type="text" defaultValue={user.firstName} className="w-full" />
          </div>
          <div>
            <Label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </Label>
            <Input id="lastName" type="text" defaultValue={user.lastName} className="w-full" />
          </div>
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </Label>
            <Input id="email" type="email" defaultValue={user.email} className="w-full" disabled />
          </div>
          <div>
            <Label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Mobile No.
            </Label>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input id="phone" type="tel" defaultValue={user.phone} className="flex-1" />
              <Button className="bg-[#009999] text-white hover:bg-[#007a7a] py-2 rounded-md font-semibold">
                VERIFY
              </Button>
            </div>
          </div>
          <div>
            <Label htmlFor="alternatePhone" className="block text-sm font-medium text-gray-700 mb-1">
              Alternate Mobile No. (Optional)
            </Label>
            <Input id="alternatePhone" type="tel" defaultValue={user.alternatePhone} className="w-full" />
          </div>
          <div>
            <Label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </Label>
            <Input id="gender" type="text" defaultValue={user.gender} className="w-full" />
          </div>
          <div>
            <Label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth
            </Label>
            <Input id="dob" type="date" defaultValue={user.dob} className="w-full" />
          </div>
          <div>
            <Label htmlFor="anniversary" className="block text-sm font-medium text-gray-700 mb-1">
              Anniversary Date
            </Label>
            <Input id="anniversary" type="date" defaultValue={user.anniversary} className="w-full" />
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm font-medium text-gray-700 mb-2">Subscribe for WhatsApp notifications</p>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input type="radio" name="notifications" value="yes" /> Yes
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="notifications" value="no" /> No
            </label>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Occasions</h2>
          <div className="bg-gray-100 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between">
            <img
              src="/placeholder.jpg"
              alt="Occasion"
              className="w-16 h-16 rounded-md object-cover"
            />
            <Button className="bg-[#009999] text-white hover:bg-[#007a7a] py-2 rounded-md font-semibold">
              + ADD OCCASION
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
