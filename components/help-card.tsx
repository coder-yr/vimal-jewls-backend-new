import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, MessageCircle } from "lucide-react"

export function HelpCard() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-center text-base">Need help to find the best jewellery for you ?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <p className="text-center text-sm text-muted-foreground">We are available for your assistance</p>

        <div className="flex items-center justify-center gap-10">
          <div className="flex flex-col items-center gap-2">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border bg-background">
              <Phone className="h-5 w-5 text-teal-600" aria-hidden="true" />
              <span className="sr-only">Speak with Experts</span>
            </span>
            <span className="text-sm">Speak with Experts</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border bg-background">
              <MessageCircle className="h-5 w-5 text-teal-600" aria-hidden="true" />
              <span className="sr-only">Chat with Experts</span>
            </span>
            <span className="text-sm">Chat with Experts</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}