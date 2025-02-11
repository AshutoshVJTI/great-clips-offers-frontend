"use client"

import { useState } from "react"
import { Search, Scissors } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge";
import { coupons } from "@/lib/coupons";

export default function CouponSearch() {
  const [searchTerm, setSearchTerm] = useState("")

  const currentDate = new Date()

  const filteredCoupons = coupons
    .filter((coupon) => {
      const expiryDate = new Date(coupon.Expires)
      return expiryDate > currentDate
    })
    .filter((coupon) => coupon.Location.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Scissors className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-primary">No BS Coupons</h1>
            </div>
            <Badge variant="secondary" className="text-xs">
              Great Clips Deals
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-primary text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Find Great Clips Deals Near You</h2>
          <p className="text-primary-foreground/90 mb-8">Simple, straightforward savings without the nonsense</p>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search deals by location..."
              className="pl-10 h-12 bg-white text-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Results Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Available Deals</h3>
          <Badge variant="secondary">
            {filteredCoupons.length} active {filteredCoupons.length === 1 ? "coupon" : "coupons"}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCoupons.map((coupon, index) => (
            <Card key={index} className="bg-white transition-all hover:shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-primary">{coupon.Price}</span>
                  <span className="text-lg text-muted-foreground">Haircut</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="font-medium text-gray-700 mb-2">{coupon.Location}</p>
                <p className="text-sm text-muted-foreground">
                  Valid until {new Date(coupon.Expires).toLocaleDateString()}
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-primary hover:bg-primary/90 transition-colors" asChild>
                  <a
                    href={coupon.URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    Get Coupon
                    <Scissors className="h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredCoupons.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No active coupons found for this location.</p>
            <p className="text-sm text-muted-foreground mt-2">
              Try searching for a different area or check back later.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}

