"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckoutProgress } from "@/components/checkout-progress" // Reusing for consistent header

export default function ReturnsPage() {
  const [orderId, setOrderId] = useState("")
  const [reason, setReason] = useState("")
  const [comments, setComments] = useState("")
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmitReturn = (e: React.FormEvent) => {
    e.preventDefault()
    if (!orderId || !reason) {
      alert("Please fill in Order ID and Reason for Return.")
      return
    }

    // Simulate API call
    console.log("Submitting return request:", { orderId, reason, comments })
    setSubmissionStatus("idle") // Reset status
    setTimeout(() => {
      // Simulate success or failure
      const success = Math.random() > 0.2 // 80% success rate
      if (success) {
        setSubmissionStatus("success")
        setOrderId("")
        setReason("")
        setComments("")
      } else {
        setSubmissionStatus("error")
      }
    }, 1000)
  }

  return (
    <div className="flex flex-col  bg-white text-gray-900">
      <div className="bg-[#009999] text-white py-3 text-center text-lg font-semibold">
        Initiate a Return
      </div>
       {/* Reusing for consistent header style */}

      <div className="flex-1 p-4 md:p-8 max-w-2xl mx-auto w-full">
        {/* <h2 className="text-2xl font-bold mb-6 text-center">Initiate a Return</h2> */}
        <form onSubmit={handleSubmitReturn} className="space-y-6">
          <div>
            <Label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-1">
              Order ID
            </Label>
            <Input
              id="orderId"
              type="text"
              placeholder="Enter your Order ID"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="w-full"
              required
            />
          </div>
          <div>
            <Label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
              Reason for Return
            </Label>
            <Select value={reason} onValueChange={setReason} required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="damaged">Damaged Product</SelectItem>
                <SelectItem value="wrong-item">Wrong Item Received</SelectItem>
                <SelectItem value="not-as-described">Not as Described</SelectItem>
                <SelectItem value="changed-mind">Changed My Mind</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">
              Additional Comments (Optional)
            </Label>
            <Textarea
              id="comments"
              placeholder="Provide more details about your return"
              rows={4}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="w-full"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-[#009999] text-white hover:bg-[#007a7a] py-3 rounded-md font-semibold"
          >
            SUBMIT RETURN REQUEST
          </Button>
        </form>

        {submissionStatus === "success" && (
          <div className="mt-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">Your return request has been submitted successfully!</span>
          </div>
        )}
        {submissionStatus === "error" && (
          <div className="mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">Failed to submit return request. Please try again.</span>
          </div>
        )}
      </div>
    </div>
  )
}
