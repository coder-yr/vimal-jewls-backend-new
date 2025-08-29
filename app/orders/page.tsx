"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckoutProgress } from "@/components/checkout-progress" // Reusing for consistent header
import { Package, Truck, CheckCircle, XCircle } from 'lucide-react'

export default function MyOrdersPage() {
  // Dummy order data
  const orders = [
    {
      id: "ORD123456789",
      date: "2024-07-20",
      total: "₹33,626",
      status: "Delivered",
      items: [
        { name: "Chandrak Diamond Stud Earrings", quantity: 1, image: "https://www.candere.com/media/jewellery/images/KC06683YG_2.jpeg?height=100&width=100" },
      ],
    },
    {
      id: "ORD987654321",
      date: "2024-07-15",
      total: "₹20,396",
      status: "Shipped",
      items: [
        { name: "Scallop Gold Earrings", quantity: 1, image: "https://www.candere.com/media/catalog/product/C/0/C022008_1.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=360&width=360&canvas=360:360?height=100&width=100" },
      ],
    },
    {
      id: "ORD112233445",
      date: "2024-07-10",
      total: "₹21,934",
      status: "Processing",
      items: [
        { name: "Feather Scape Peacock Gold And Gemstone Earrings", quantity: 1, image: "https://www.candere.com/media/catalog/product/K/C/KC04453YG_1_5.jpeg?optimize=medium&bg-color=255,255,255&fit=bounds&height=360&width=360&canvas=360:360?height=100&width=100" },
      ],
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "Shipped":
        return <Truck className="w-5 h-5 text-blue-500" />
      case "Processing":
        return <Package className="w-5 h-5 text-yellow-500" />
      case "Cancelled":
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <div className="bg-[#009999] text-white py-3 text-center text-lg font-semibold">
        My Orders
      </div>
      

      <div className="flex-1 p-4 md:p-8 max-w-4xl mx-auto w-full">
        {/* <h2 className="text-2xl font-bold mb-6 text-center">My Orders</h2> */}
        {orders.length === 0 ? (
          <div className="text-center text-gray-600 py-10">You have no past orders.</div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id} className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-semibold">Order #{order.id}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    {getStatusIcon(order.status)}
                    <span>{order.status}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Order Date: {order.date}</p>
                  <div className="space-y-3 mb-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <img src={item.image || "/placeholder.svg"} alt={item.name} width={60} height={60} className="object-contain rounded-md" />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <span className="text-lg font-bold">Total: {order.total}</span>
                    <Link href={`/orders/track?orderId=${order.id}`}>
                      <Button variant="outline" className="border-[#009999] text-[#009999] hover:bg-[#e0f2f2]">
                        Track Order
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
