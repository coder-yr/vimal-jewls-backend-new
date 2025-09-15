"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface SizeOption {
  sizeNumber: number
  diameter: number
  availabilityStatus: "In Stock" | "Made to Order"
}

interface ProductSizeSelectorProps {
  productName?: string
  currentPrice: number
  originalPrice?: number
  currency?: string
  deliveryDate: string
  sizeOptions: SizeOption[]
  defaultAvailabilityType?: "Made to Order" | "In Stock"
  onSizeSelect?: (size: SizeOption) => void
  onConfirm?: (selectedSize: SizeOption | null) => void
}

export default function ProductSizeSelector({
  productName,
  currentPrice,
  originalPrice,
  currency = "₹",
  deliveryDate,
  sizeOptions,
  defaultAvailabilityType = "Made to Order",
  onSizeSelect,
  onConfirm,
}: ProductSizeSelectorProps) {
  const [selectedSize, setSelectedSize] = useState<SizeOption | null>(null)
  const [availabilityFilter, setAvailabilityFilter] = useState<"Made to Order" | "In Stock">(defaultAvailabilityType)

  const handleSizeSelect = (size: SizeOption) => {
    setSelectedSize(size)
    onSizeSelect?.(size)
  }

  const handleConfirm = () => {
    onConfirm?.(selectedSize)
  }

  const formatPrice = (price: number) => {
    return `${currency}${price.toLocaleString()}`
  }

  return (
    <div className="max-w-2xl mx-auto bg-white">
      {/* Price and Delivery Header */}
      <div className="flex items-center justify-between mb-6 p-4 border-b">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-teal-600">{formatPrice(currentPrice)}</span>
          {originalPrice && <span className="text-lg text-gray-500 line-through">{formatPrice(originalPrice)}</span>}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Delivery by {deliveryDate}</span>
          <X className="w-4 h-4 cursor-pointer hover:text-gray-800" />
        </div>
      </div>

      {/* Availability Toggle */}
      <div className="flex gap-2 mb-6 px-4">
        <Button
          variant={availabilityFilter === "Made to Order" ? "default" : "outline"}
          size="sm"
          onClick={() => setAvailabilityFilter("Made to Order")}
          className={cn(
            "rounded-full px-4 py-2",
            availabilityFilter === "Made to Order"
              ? "bg-teal-500 hover:bg-teal-600 text-white"
              : "border-gray-300 text-gray-700 hover:bg-gray-50",
          )}
        >
          Made to Order
        </Button>
        <Button
          variant={availabilityFilter === "In Stock" ? "default" : "outline"}
          size="sm"
          onClick={() => setAvailabilityFilter("In Stock")}
          className={cn(
            "rounded-full px-4 py-2",
            availabilityFilter === "In Stock"
              ? "bg-teal-500 hover:bg-teal-600 text-white"
              : "border-gray-300 text-gray-700 hover:bg-gray-50",
          )}
        >
          Made to Order
        </Button>
      </div>

      {/* Size Selection */}
      <div className="px-4 mb-20">
        <h2 className="text-lg font-semibold mb-4">Pick your Size</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {sizeOptions.map((size) => (
            <div
              key={size.sizeNumber}
              onClick={() => handleSizeSelect(size)}
              className={cn(
                "p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md",
                selectedSize?.sizeNumber === size.sizeNumber
                  ? "bg-teal-500 border-teal-500 text-white"
                  : "bg-gray-50 border-gray-200 hover:border-gray-300",
              )}
            >
              <div className="text-center">
                <div className="font-medium mb-1">Size: {size.sizeNumber}</div>
                <div className="text-sm mb-3">{size.diameter} mm</div>
                <div className="text-xs">
                  {size.availabilityStatus === "In Stock" ? (
                    <span
                      className={cn(
                        "font-medium",
                        selectedSize?.sizeNumber === size.sizeNumber ? "text-white" : "text-green-600",
                      )}
                    >
                      In Stock
                    </span>
                  ) : (
                    <Button
                      size="sm"
                      variant={selectedSize?.sizeNumber === size.sizeNumber ? "secondary" : "outline"}
                      className={cn(
                        "text-xs px-3 py-1 h-auto rounded-full",
                        selectedSize?.sizeNumber === size.sizeNumber
                          ? "bg-white text-teal-600 hover:bg-gray-100"
                          : "border-gray-400 text-gray-600 hover:bg-gray-100",
                      )}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleSizeSelect(size)
                      }}
                    >
                      Made to Order
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confirm Button - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-lg">
        <div className="max-w-2xl mx-auto">
          <Button
            onClick={handleConfirm}
            disabled={!selectedSize}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-4 text-lg rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            CONFIRM SELECTION
          </Button>
        </div>
      </div>
    </div>
  )
}
