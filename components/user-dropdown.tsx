"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { User } from 'lucide-react'

export function UserDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <User className="w-5 h-5 text-[#FADDA0]" />
          <span className="sr-only">Account</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-white shadow-lg rounded-md overflow-hidden z-50">
        <DropdownMenuItem asChild>
          <Link href="/profile" className="block w-full text-sm text-gray-700 hover:bg-gray-100 px-4 py-2">My Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/orders" className="block w-full text-sm text-gray-700 hover:bg-gray-100 px-4 py-2">My Orders</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/orders/track" className="block w-full text-sm text-gray-700 hover:bg-gray-100 px-4 py-2">Track Order</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/orders/returns" className="block w-full text-sm text-gray-700 hover:bg-gray-100 px-4 py-2">Returns</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button className="block w-full text-sm text-gray-700 hover:bg-gray-100 px-4 py-2">Logout</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
