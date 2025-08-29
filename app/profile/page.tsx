"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckoutProgress } from "@/components/checkout-progress" // Reusing for consistent header

export default function ProfilePage() {
  // Dummy user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "9876543210",
    address: "123, Main Street, Anytown, State, 123456",
  }

  const handleSaveProfile = () => {
    alert("Profile saved! (Dummy action)")
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <div className="bg-[#009999] text-white py-3 text-center text-lg font-semibold">
        Your Profile
      </div>
      {/* Reusing CheckoutProgress for consistent header style, though it's not a checkout step */}
      {/* <CheckoutProgress currentStep="bag" />  */}

      <div className="flex-1 p-4 md:p-8 max-w-2xl mx-auto w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">My Profile</h2>
        <div className="space-y-6">
          <div>
            <Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </Label>
            <Input id="name" type="text" defaultValue={user.name} className="w-full" />
          </div>
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </Label>
            <Input id="email" type="email" defaultValue={user.email} className="w-full" disabled />
          </div>
          <div>
            <Label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </Label>
            <Input id="phone" type="tel" defaultValue={user.phone} className="w-full" />
          </div>
          <div>
            <Label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Default Shipping Address
            </Label>
            <Input id="address" type="text" defaultValue={user.address} className="w-full" />
          </div>
        </div>
        <Button
          className="w-full bg-[#009999] text-white hover:bg-[#007a7a] py-3 rounded-md font-semibold mt-8"
          onClick={handleSaveProfile}
        >
          SAVE PROFILE
        </Button>
      </div>
    </div>
  )
}
