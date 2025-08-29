"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getCartTotal } from "@/lib/cart-utils" // Keep getCartTotal
import { CheckoutProgress } from "@/components/checkout-progress"
import { X, Truck, Gift, CheckCircle, Star, ChevronLeft, Clock } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"
import { useSelector, useDispatch } from "react-redux" // Import useSelector and useDispatch
import type { RootState } from "@/lib/store" // Import RootState
import { removeFromCart } from "@/lib/features/cart/cartSlice" // Import removeFromCart action

export default function CheckoutPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const cartItems = useSelector((state: RootState) => state.cart.items) // Get cart items from Redux store

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id)) // Dispatch removeFromCart action
  }

  const subtotal = getCartTotal(cartItems)
  const discount = 1089 // Mock discount
  const total = subtotal - discount

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <div className="bg-[#009999] text-white py-3 text-center text-lg font-semibold">
        Carry your Shine Everywhere You Go CHECKOUT NOW!
      </div>
      <CheckoutProgress currentStep="bag" />

      <div className="flex flex-col lg:flex-row flex-1 p-4 md:p-8 gap-8">
        {/* Left Section - Cart Items */}
        <div className="flex-1 bg-gray-50 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold mb-6">TOTAL ITEM {cartItems.length}</h2>
          {cartItems.length === 0 ? (
            <div className="text-center py-10 text-gray-600">Your cart is empty.</div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0"
              >
                <Image
                  src={"https://www.candere.com/media/jewellery/images/C025336_2.jpeg"}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="object-contain rounded-md"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-600">Metal: {item.metal}</p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
                <div className="flex flex-col items-end">
                  <button onClick={() => handleRemoveItem(item.id)} className="text-gray-400 hover:text-gray-700 mb-2">
                    <X className="w-4 h-4" />
                  </button>
                  <span className="text-lg font-bold text-[#009999]">₹{item.price.toLocaleString("en-IN")}</span>
                  <span className="text-sm text-gray-500 line-through">
                    ₹{(item.price + 1000).toLocaleString("en-IN")}
                  </span>{" "}
                  {/* Mock original price */}
                </div>
              </div>
            ))
          )}
          <Link href="/" className="text-[#009999] hover:underline mt-6 flex items-center gap-2">
            <ChevronLeft className="w-4 h-4" /> CONTINUE SHOPPING
          </Link>
        </div>

        {/* Right Section - Order Summary */}
        <div className="w-full lg:w-96 bg-white p-6 rounded-lg shadow-md">
          <Button className="w-full bg-[#009999] text-white hover:bg-[#007a7a] py-3 rounded-md font-semibold mb-6">
            CHECKOUT SECURELY
          </Button>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Apply Offer / Voucher</span>
              <Button variant="link" className="text-[#009999] p-0 h-auto">
                CHECK OFFERS
              </Button>
            </div>
            <div className="flex items-center justify-between bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded-md">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Coupon MONSOON Applied Successfully</span>
              </div>
              <Button variant="ghost" size="icon" className="w-6 h-6 text-green-700 hover:bg-green-100">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <h3 className="text-lg font-bold mb-4">ORDER SUMMARY</h3>
          <div className="space-y-2 text-gray-700 mb-6">
            <div className="flex justify-between">
              <span>Item total</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount (MONSOON)</span>
              <span className="text-green-600">-₹{discount.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between">
              <span>Sub total</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between text-xl font-bold text-[#009999]">
              <span>Order Total</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-sm text-green-600 font-medium">
              <span>Your total savings</span>
              <span>₹{discount.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <div className="text-center text-gray-700 text-sm mb-6">
            <p className="mb-2">Have any queries ? Contact us for your assistance</p>
            <p>
              Call us at <span className="text-[#009999] font-semibold">+91 2261966262</span> or{" "}
              <Button variant="link" className="text-[#009999] p-0 h-auto">
                CHAT WITH US
              </Button>
            </p>
          </div>

          <Button
            className="w-full bg-[#009999] text-white hover:bg-[#007a7a] py-3 rounded-md font-semibold"
            onClick={() => router.push("/checkout/address")}
            disabled={cartItems.length === 0}
          >
            PROCEED TO ADDRESS
          </Button>
        </div>
      </div>

      {/* Candere Advantages */}
      <section className="bg-white py-12 px-4 md:px-8 text-center">
        <h2 className="text-2xl font-bold mb-8">Candere Advantages</h2>
        <p className="text-gray-600 mb-12">5 reasons to shop with us!</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
          {[
            { icon: Clock, text: "15 days Return" },
            { icon: Star, text: "Trust of Kalyan" },
            { icon: Truck, text: "Lifetime Buyback" },
            { icon: CheckCircle, text: "100% Exchange*" },
            { icon: Gift, text: "Certified Jewellery" },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center text-gray-800">
              <item.icon className="w-10 h-10 mb-3 text-[#009999]" />
              <span className="text-sm font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Customer Ratings & Payment Partners */}
      <section className="bg-white py-8 px-4 md:px-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <span className="font-semibold">1 LAKH+ HAPPY CUSTOMERS HAVE RATED US</span>
            <Image
              src="/placeholder.svg?height=20&width=60"
              alt="Google"
              width={60}
              height={20}
              className="h-5 object-contain"
            />
            <span className="font-bold text-green-600">4.5</span>
            <Image
              src="/placeholder.svg?height=20&width=60"
              alt="Sitejabber"
              width={60}
              height={20}
              className="h-5 object-contain"
            />
            <span className="font-bold text-green-600">4.3</span>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end items-center gap-4">
            <span className="font-semibold">We Accept</span>
            <Image
              src="/placeholder.svg?height=20&width=40"
              alt="Visa"
              width={40}
              height={20}
              className="h-5 object-contain"
            />
            <Image
              src="/placeholder.svg?height=20&width=40"
              alt="Mastercard"
              width={40}
              height={20}
              className="h-5 object-contain"
            />
            <Image
              src="/placeholder.svg?height=20&width=40"
              alt="RuPay"
              width={40}
              height={20}
              className="h-5 object-contain"
            />
            <Image
              src="/placeholder.svg?height=20&width=40"
              alt="PayPal"
              width={40}
              height={20}
              className="h-5 object-contain"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
