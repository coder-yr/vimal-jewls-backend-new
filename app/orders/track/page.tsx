"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckoutProgress } from "@/components/checkout-progress" // Reusing for consistent header
import { Package, Truck, CheckCircle, XCircle, Clock } from 'lucide-react'

export default function OrderTrackingPage() {
  const searchParams = useSearchParams()
  const initialOrderId = searchParams.get("orderId") || ""
  const [orderId, setOrderId] = useState(initialOrderId)
  const [trackingInfo, setTrackingInfo] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  // Dummy tracking data
  const dummyTrackingData: { [key: string]: any } = {
    "ORD123456789": {
      status: "Delivered",
      estimatedDelivery: "Delivered on July 22, 2024",
      history: [
        { date: "2024-07-22", time: "10:30 AM", description: "Delivered to customer." },
        { date: "2024-07-21", time: "03:00 PM", description: "Out for delivery." },
        { date: "2024-07-21", time: "08:00 AM", description: "Arrived at local distribution center." },
        { date: "2024-07-20", time: "05:00 PM", description: "Shipped from warehouse." },
        { date: "2024-07-20", time: "09:00 AM", description: "Order placed and confirmed." },
      ],
      product: { name: "Chandrak Diamond Stud Earrings", image: "https://www.candere.com/media/catalog/product/K/C/KC04453YG_1_5.jpeg?optimize=medium&bg-color=255,255,255&fit=bounds&height=360&width=360&canvas=360:360?height=80&width=80" },
    },
    "ORD987654321": {
      status: "Shipped",
      estimatedDelivery: "July 25, 2024",
      history: [
        { date: "2024-07-18", time: "02:00 PM", description: "Shipped from warehouse." },
        { date: "2024-07-17", time: "11:00 AM", description: "Order packed and ready for shipment." },
        { date: "2024-07-15", time: "04:00 PM", description: "Order placed and confirmed." },
      ],
      product: { name: "Scallop Gold Earrings", image: "https://www.candere.com/media/catalog/product/C/0/C022008_1.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=360&width=360&canvas=360:360?height=80&width=80" },
    },
    "ORD112233445": {
      status: "Processing",
      estimatedDelivery: "July 28, 2024",
      history: [
        { date: "2024-07-10", time: "09:00 AM", description: "Order placed and confirmed." },
      ],
      product: { name: "Feather Scape Peacock Gold And Gemstone Earrings", image: "https://www.candere.com/media/jewellery/images/KC06683YG_2.jpeg?height=80&width=80" },
    },
  }

  const handleTrackOrder = () => {
    setError(null)
    const info = dummyTrackingData[orderId]
    if (info) {
      setTrackingInfo(info)
    } else {
      setError("Order not found. Please check the Order ID.")
      setTrackingInfo(null)
    }
  }

  useEffect(() => {
    if (initialOrderId) {
      handleTrackOrder()
    }
  }, [initialOrderId]) // eslint-disable-line react-hooks/exhaustive-deps

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle className="w-6 h-6 text-green-500" />
      case "Shipped":
        return <Truck className="w-6 h-6 text-blue-500" />
      case "Processing":
        return <Package className="w-6 h-6 text-yellow-500" />
      default:
        return <Clock className="w-6 h-6 text-gray-500" />
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <div className="bg-[#009999] text-white py-3 text-center text-lg font-semibold">
        Track Your Order
      </div>
      

      <div className="flex-1 p-4 md:p-8 max-w-2xl mx-auto w-full">
        {/* <h2 className="text-2xl font-bold mb-6 text-center">Track Your Order</h2> */}
        <div className="space-y-4 mb-8">
          <div>
            <Label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-1">
              Enter Order ID
            </Label>
            <Input
              id="orderId"
              type="text"
              placeholder="e.g., ORD123456789"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="w-full"
            />
          </div>
          <Button
            className="w-full bg-[#009999] text-white hover:bg-[#007a7a] py-3 rounded-md font-semibold"
            onClick={handleTrackOrder}
          >
            TRACK ORDER
          </Button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {trackingInfo && (
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                {getStatusIcon(trackingInfo.status)}
                Order Status: {trackingInfo.status}
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">Estimated Delivery: {trackingInfo.estimatedDelivery}</p>
            </CardHeader>
            <CardContent>
              {trackingInfo.product && (
                <div className="flex items-center gap-4 mb-4">
                  <img src={trackingInfo.product.image || "/placeholder.svg"} alt={trackingInfo.product.name} width={80} height={80} className="object-contain rounded-md" />
                  <div>
                    <p className="font-medium text-lg">{trackingInfo.product.name}</p>
                  </div>
                </div>
              )}
              <h3 className="text-lg font-semibold mb-3">Tracking History:</h3>
              <div className="space-y-3">
                {trackingInfo.history.map((event: any, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-[#009999] mt-1" />
                      {index < trackingInfo.history.length - 1 && (
                        <div className="w-0.5 h-8 bg-gray-300" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{event.description}</p>
                      <p className="text-xs text-gray-500">{event.date} at {event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
