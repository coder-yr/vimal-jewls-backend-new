"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, Phone, MessageCircle, Sparkles } from "lucide-react"

interface PriceBreakdown {
  metal: { original: number; discounted?: number }
  diamond: { original: number; discounted?: number }
  makingCharges: { original: number; discounted?: number }
  gst: { original: number; discounted?: number }
  grandTotal: number
}

interface ProductDetails {
  styleNo: string
  ringSize: string
  metalWeight: string
  grossWeight: string
  metalDetails?: string[]
  diamondDetails?: string[]
}

interface ProductData {
  title: string
  description: string
  image: string
  details: ProductDetails
  priceBreakdown: PriceBreakdown
}

interface ProductInformationProps {
  product: ProductData
}

export function ProductInformation({ product }: ProductInformationProps) {
  const [metalDetailsOpen, setMetalDetailsOpen] = useState(false)
  const [diamondDetailsOpen, setDiamondDetailsOpen] = useState(false)
  const [priceBreakdownOpen, setPriceBreakdownOpen] = useState(true)

  const formatPrice = (price: number) => `₹${price.toLocaleString()}`

  return (
    <div className="max-w-6xl mx-auto p-6 bg-background">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Product Information</h1>
        <div className="w-16 h-1 bg-accent mx-auto rounded-full"></div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Product Image and Details */}
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-32 h-32 bg-muted rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-foreground mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" />
                {product.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm">{product.description}</p>
            </div>
          </div>

          {/* Product Summary */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Product Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Style No.</span>
                  <span className="font-medium">{product.details.styleNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ring Size</span>
                  <span className="font-medium">{product.details.ringSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Metal Weight</span>
                  <span className="font-medium">{product.details.metalWeight}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Gross Weight</span>
                  <span className="font-medium">{product.details.grossWeight}</span>
                </div>
              </div>

              <div className="mt-6 p-3 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">
                  *Difference in gold weight may occur & will apply on final price.
                </p>
              </div>

              <div className="mt-6">
                <p className="text-sm font-medium text-foreground mb-3">
                  Need help to find the best jewellery for you ?
                </p>
                <p className="text-xs text-muted-foreground mb-4">We are available for your assistance</p>

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                    <Phone className="w-4 h-4" />
                    Speak with Experts
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                    <MessageCircle className="w-4 h-4" />
                    Chat with Experts
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Price Breakdown */}
        <div className="space-y-4">
          <Collapsible open={priceBreakdownOpen} onOpenChange={setPriceBreakdownOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-4 h-auto bg-muted hover:bg-muted/80">
                <span className="font-semibold text-foreground">PRICE BREAKDOWN</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${priceBreakdownOpen ? "rotate-180" : ""}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Card>
                <CardContent className="p-6 space-y-4">
                  {/* Metal */}
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Metal</span>
                    <span className="font-semibold text-foreground">
                      {formatPrice(product.priceBreakdown.metal.original)}
                    </span>
                  </div>

                  {/* Diamond */}
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Diamond</span>
                    <div className="text-right">
                      {product.priceBreakdown.diamond.discounted && (
                        <span className="text-xs text-muted-foreground line-through mr-2">
                          {formatPrice(product.priceBreakdown.diamond.original)}
                        </span>
                      )}
                      <span className="font-semibold text-foreground">
                        {formatPrice(
                          product.priceBreakdown.diamond.discounted || product.priceBreakdown.diamond.original,
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Making Charges */}
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Making Charges</span>
                    <div className="text-right">
                      {product.priceBreakdown.makingCharges.discounted && (
                        <span className="text-xs text-muted-foreground line-through mr-2">
                          {formatPrice(product.priceBreakdown.makingCharges.original)}
                        </span>
                      )}
                      <span className="font-semibold text-foreground">
                        {formatPrice(
                          product.priceBreakdown.makingCharges.discounted ||
                            product.priceBreakdown.makingCharges.original,
                        )}
                      </span>
                    </div>
                  </div>

                  {/* GST */}
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">GST(3%)</span>
                    <div className="text-right">
                      {product.priceBreakdown.gst.discounted && (
                        <span className="text-xs text-muted-foreground line-through mr-2">
                          {formatPrice(product.priceBreakdown.gst.original)}
                        </span>
                      )}
                      <span className="font-semibold text-foreground">
                        {formatPrice(product.priceBreakdown.gst.discounted || product.priceBreakdown.gst.original)}
                      </span>
                    </div>
                  </div>

                  <hr className="border-border" />

                  {/* Grand Total */}
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-foreground">Grand Total</span>
                    <div className="text-right">
                      <div className="font-bold text-lg text-primary">
                        {formatPrice(product.priceBreakdown.grandTotal)}
                      </div>
                      <div className="text-xs text-muted-foreground">(MRP Incl. of all taxes)</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CollapsibleContent>
          </Collapsible>

          {/* Metal Details */}
          <Collapsible open={metalDetailsOpen} onOpenChange={setMetalDetailsOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-4 h-auto bg-muted hover:bg-muted/80">
                <span className="font-medium text-muted-foreground">METAL DETAILS</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${metalDetailsOpen ? "rotate-180" : ""}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Card>
                <CardContent className="p-6">
                  {product.details.metalDetails ? (
                    <ul className="space-y-2">
                      {product.details.metalDetails.map((detail, index) => (
                        <li key={index} className="text-sm text-muted-foreground">
                          • {detail}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      14k & 18k yellow and rose gold. It's a timeless symbol of flow, balance, and beauty.
                    </p>
                  )}
                </CardContent>
              </Card>
            </CollapsibleContent>
          </Collapsible>

          {/* Diamond Details */}
          <Collapsible open={diamondDetailsOpen} onOpenChange={setDiamondDetailsOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-4 h-auto bg-muted hover:bg-muted/80">
                <span className="font-medium text-muted-foreground">DIAMOND DETAILS</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${diamondDetailsOpen ? "rotate-180" : ""}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Card>
                <CardContent className="p-6">
                  {product.details.diamondDetails ? (
                    <ul className="space-y-2">
                      {product.details.diamondDetails.map((detail, index) => (
                        <li key={index} className="text-sm text-muted-foreground">
                          • {detail}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Premium quality diamonds with excellent cut, clarity, and brilliance.
                    </p>
                  )}
                </CardContent>
              </Card>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-center">
        <p className="text-xs text-primary">
          *A differential amount will be applicable with difference in weight if any.
        </p>
      </div>
    </div>
  )
}
