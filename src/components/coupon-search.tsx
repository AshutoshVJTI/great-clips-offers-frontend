"use client"

import { useState } from "react"
import { Search, Scissors, Moon, Sun, MapPin } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { coupons } from "@/lib/coupons"

interface Coupon {
  URL: string;
  Location: string | null;
  Price: string | null;
  Expires: string;
}

type CouponsArray = Array<{
  US: Coupon[];
  CA: Coupon[];
}>

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
}

export default function CouponSearch() {
  const { theme, setTheme } = useTheme()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCountry, setSelectedCountry] = useState<"US" | "CA">("US")

  const currentDate = new Date()

  // Update deduplication function to handle the new structure
  const deduplicateCoupons = (coupons: CouponsArray) => {
    const seen = new Set<string>()
    return coupons[0][selectedCountry].filter((coupon: Coupon) => {
      const key = `${coupon.URL}-${coupon.Location}`
      if (seen.has(key)) {
        return false
      }
      seen.add(key)
      return true
    })
  }

  // Location cleanup function remains the same
  const cleanLocation = (location: string | null) => {
    return location?.replace(/only at participating /i, '') || 'Location not specified'
  }

  const filteredCoupons = deduplicateCoupons(coupons)
    .filter((coupon: Coupon) => {
      const expiryDate = new Date(coupon.Expires)
      return expiryDate > currentDate
    })
    .filter((coupon: Coupon) => 
      coupon.Location?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false
    )

  // First, let's update the header section with the new toggle styling
  const headerSection = (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center gap-2"
          >
            <Scissors className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-primary">No BS Coupons</h1>
          </motion.div>
          
          <div className="flex items-center gap-4">
            <div className="bg-secondary/50 p-1 rounded-lg">
              <Button
                variant={selectedCountry === "US" ? "default" : "ghost"}
                onClick={() => setSelectedCountry("US")}
                size="lg"
                className={`px-6 ${
                  selectedCountry === "US" 
                    ? "bg-primary text-primary-foreground shadow-md" 
                    : "hover:bg-background/50 text-muted-foreground"
                }`}
              >
                🇺🇸 United States
              </Button>
              <Button
                variant={selectedCountry === "CA" ? "default" : "ghost"}
                onClick={() => setSelectedCountry("CA")}
                size="lg"
                className={`px-6 ${
                  selectedCountry === "CA" 
                    ? "bg-primary text-primary-foreground shadow-md" 
                    : "hover:bg-background/50 text-muted-foreground"
                }`}
              >
                🇨🇦 Canada
              </Button>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )

  return (
    <div className="min-h-screen bg-background">
      {headerSection}

      <div className="bg-primary/5 dark:bg-primary/10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-black/10" />
          <div className="relative max-w-3xl mx-auto text-center py-20 px-4 sm:py-28">
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              Find Great Clips Deals Near You
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Simple, straightforward savings without the nonsense
            </p>
            <div className="relative max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search deals by location..."
                  className="pl-10 h-14 bg-background/80 backdrop-blur-sm border-2 focus:border-primary transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-semibold text-foreground">Available Deals</h3>
          <Badge variant="secondary" className="rounded-full">
            {filteredCoupons.length} active {filteredCoupons.length === 1 ? "coupon" : "coupons"}
          </Badge>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCoupons.map((coupon: Coupon, index: number) => (
            <motion.div key={index} variants={item}>
              <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-primary">{coupon.Price}</span>
                    <span className="text-lg text-muted-foreground">Haircut</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-1 shrink-0" />
                    <p className="font-medium text-foreground">{cleanLocation(coupon.Location)}</p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Valid until {new Date(coupon.Expires).toLocaleDateString()}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full group-hover:scale-105 transition-transform duration-300" 
                    asChild
                  >
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
            </motion.div>
          ))}
        </motion.div>

        {filteredCoupons.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-lg text-muted-foreground">No active coupons found for this location.</p>
            <p className="text-sm text-muted-foreground mt-2">
              Try searching for a different area or check back later.
            </p>
          </motion.div>
        )}
      </main>
    </div>
  )
}

