"use client"

import { useRouter } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { MapPin, Calculator, Sparkles, TrendingUp, Clock, CheckCircle2 } from "lucide-react"
import { type Locale, translations } from "@/lib/i18n"
import { BookingModal } from "./booking-modal"

const TARIFFS = {
  standard: { price: 1.3, icon: "🚗", color: "from-gray-500 to-gray-600" },
  comfort: { price: 1.5, icon: "✨", color: "from-blue-500 to-blue-600" },
  business: { price: 3.0, icon: "💼", color: "from-amber-500 to-amber-600" },
  minivan: { price: 2.2, icon: "🚐", color: "from-green-500 to-green-600" },
  vip: { price: 3.0, icon: "👑", color: "from-purple-500 to-purple-600" },
  minibus: { price: 3.0, icon: "🚌", color: "from-red-500 to-red-600" },
}

interface CalculatorFormProps {
  locale: Locale
}

interface AddressSuggestion {
  display_name: string
  lat: string
  lon: string
}

export function CalculatorForm({ locale }: CalculatorFormProps) {
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [distance, setDistance] = useState("")
  const [fromSuggestions, setFromSuggestions] = useState<AddressSuggestion[]>([])
  const [toSuggestions, setToSuggestions] = useState<AddressSuggestion[]>([])
  const [showFromSuggestions, setShowFromSuggestions] = useState(false)
  const [showToSuggestions, setShowToSuggestions] = useState(false)
  const [fromCoords, setFromCoords] = useState<{ lat: number; lon: number } | null>(null)
  const [toCoords, setToCoords] = useState<{ lat: number; lon: number } | null>(null)
  const [isCityTour, setIsCityTour] = useState(false)
  const [selectedCity, setSelectedCity] = useState("")
  const fromInputRef = useRef<HTMLDivElement>(null)
  const toInputRef = useRef<HTMLDivElement>(null)
  const [selectedTariff, setSelectedTariff] = useState<keyof typeof TARIFFS | null>(null)
  const [results, setResults] = useState<Record<string, number> | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [bookingModalOpen, setBookingModalOpen] = useState(false)
  const [selectedBookingTariff, setSelectedBookingTariff] = useState<string>("")
  const router = useRouter()
  const searchTimerRef = useRef<NodeJS.Timeout | null>(null)

  const t = translations[locale]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fromInputRef.current && !fromInputRef.current.contains(event.target as Node)) {
        setShowFromSuggestions(false)
      }
      if (toInputRef.current && !toInputRef.current.contains(event.target as Node)) {
        setShowToSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const fetchAddressSuggestions = async (query: string, isFromField: boolean) => {
    if (query.length < 3) {
      if (isFromField) {
        setFromSuggestions([])
        setShowFromSuggestions(false)
      } else {
        setToSuggestions([])
        setShowToSuggestions(false)
      }
      return
    }

    // Clear previous timer
    if (searchTimerRef.current) {
      clearTimeout(searchTimerRef.current)
    }

    // Debounce the search
    searchTimerRef.current = setTimeout(async () => {
      try {
        // Using proper headers and params for Nominatim API
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?` +
            new URLSearchParams({
              format: "json",
              q: `${query}, Belarus`,
              limit: "8",
              addressdetails: "1",
              "accept-language": locale === "ru" ? "ru" : "en",
            }),
          {
            headers: {
              "User-Agent": "SKTransfer.by",
            },
          },
        )

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        if (isFromField) {
          setFromSuggestions(data)
          setShowFromSuggestions(data.length > 0)
        } else {
          setToSuggestions(data)
          setShowToSuggestions(data.length > 0)
        }
      } catch (error) {
        console.error("[v0] Error fetching addresses:", error)
        // Reset suggestions on error
        if (isFromField) {
          setFromSuggestions([])
          setShowFromSuggestions(false)
        } else {
          setToSuggestions([])
          setShowToSuggestions(false)
        }
      }
    }, 300) // 300ms debounce delay
  }

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371 // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  useEffect(() => {
    if (fromCoords && toCoords && !isCityTour) {
      const dist = calculateDistance(fromCoords.lat, fromCoords.lon, toCoords.lat, toCoords.lon)
      setDistance(Math.round(dist).toString())
    }
  }, [fromCoords, toCoords, isCityTour])

  const handleAddressSelect = (suggestion: AddressSuggestion, isFromField: boolean) => {
    if (isFromField) {
      setFrom(suggestion.display_name)
      setFromCoords({ lat: Number.parseFloat(suggestion.lat), lon: Number.parseFloat(suggestion.lon) })
      setShowFromSuggestions(false)
    } else {
      setTo(suggestion.display_name)
      setToCoords({ lat: Number.parseFloat(suggestion.lat), lon: Number.parseFloat(suggestion.lon) })
      setShowToSuggestions(false)
    }
  }

  const handleCityTourToggle = (checked: boolean) => {
    setIsCityTour(checked)
    if (checked) {
      setTo("")
      setToCoords(null)
      setDistance("")
    }
  }

  const calculateAllPrices = () => {
    const dist = Number.parseFloat(distance)
    if (isNaN(dist) || dist <= 0) return

    setIsCalculating(true)

    setTimeout(() => {
      const calculatedResults: Record<string, number> = {}
      Object.entries(TARIFFS).forEach(([key, tariff]) => {
        calculatedResults[key] = dist * tariff.price
      })
      setResults(calculatedResults)
      setIsCalculating(false)
    }, 300)
  }

  const handleBooking = (tariffKey: string) => {
    const tariffNames: Record<string, string> = {
      standard: t.tariffs.standard,
      comfort: t.tariffs.comfort,
      business: t.tariffs.business,
      minivan: t.tariffs.minivan,
      vip: t.tariffs.vip,
      minibus: t.tariffs.minibus,
    }
    setSelectedBookingTariff(tariffNames[tariffKey] || tariffKey)
    setBookingModalOpen(true)
  }

  useEffect(() => {
    return () => {
      if (searchTimerRef.current) {
        clearTimeout(searchTimerRef.current)
      }
    }
  }, [])

  return (
    <>
      <div className="space-y-4 sm:space-y-6 w-full">
        <Card className="p-4 sm:p-6 lg:p-8 border-2 border-[var(--gold)]/20 bg-white shadow-lg w-full">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="p-2 sm:p-3 rounded-full bg-gradient-to-br from-[var(--gold)] to-amber-600 flex-shrink-0">
              <Calculator className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold gold-gradient-text break-words whitespace-normal">
                {t.calculator.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 break-words whitespace-normal">{t.calculator.subtitle}</p>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-5">
            <div className="flex items-center space-x-2 p-3 rounded-lg bg-amber-50 border border-amber-200">
              <Checkbox
                id="cityTour"
                checked={isCityTour}
                onCheckedChange={handleCityTourToggle}
                className="border-[var(--gold)] data-[state=checked]:bg-[var(--gold)]"
              />
              <label
                htmlFor="cityTour"
                className="text-sm font-medium text-gray-700 cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t.calculator.cityTour}
              </label>
            </div>

            <div className="space-y-2" ref={fromInputRef}>
              <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <MapPin className="w-4 h-4 text-[var(--gold)] flex-shrink-0" />
                <span className="truncate">{isCityTour ? t.calculator.city : t.calculator.from}</span>
              </Label>
              <div className="relative">
                <Input
                  placeholder={isCityTour ? t.calculator.cityPlaceholder : t.calculator.fromPlaceholder}
                  value={from}
                  onChange={(e) => {
                    setFrom(e.target.value)
                    fetchAddressSuggestions(e.target.value, true)
                  }}
                  className="pl-10 border-2 border-gray-200 focus:border-[var(--gold)] transition-colors w-full bg-white text-gray-900"
                />
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--gold)]/50" />

                {showFromSuggestions && fromSuggestions.length > 0 && (
                  <div className="absolute z-50 w-full mt-1 bg-white border-2 border-[var(--gold)]/20 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {fromSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        onClick={() => handleAddressSelect(suggestion, true)}
                        className="p-3 hover:bg-amber-50 cursor-pointer border-b last:border-b-0 transition-colors"
                      >
                        <p className="text-sm text-gray-900">{suggestion.display_name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {!isCityTour && (
              <div className="space-y-2" ref={toInputRef}>
                <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <MapPin className="w-4 h-4 text-[var(--gold)] flex-shrink-0" />
                  <span className="truncate">{t.calculator.to}</span>
                </Label>
                <div className="relative">
                  <Input
                    placeholder={t.calculator.toPlaceholder}
                    value={to}
                    onChange={(e) => {
                      setTo(e.target.value)
                      fetchAddressSuggestions(e.target.value, false)
                    }}
                    className="pl-10 border-2 border-gray-200 focus:border-[var(--gold)] transition-colors w-full bg-white text-gray-900"
                  />
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--gold)]/50" />

                  {showToSuggestions && toSuggestions.length > 0 && (
                    <div className="absolute z-50 w-full mt-1 bg-white border-2 border-[var(--gold)]/20 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {toSuggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          onClick={() => handleAddressSelect(suggestion, false)}
                          className="p-3 hover:bg-amber-50 cursor-pointer border-b last:border-b-0 transition-colors"
                        >
                          <p className="text-sm text-gray-900">{suggestion.display_name}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <TrendingUp className="w-4 h-4 text-[var(--gold)] flex-shrink-0" />
                <span className="truncate">{t.calculator.distance}</span>
              </Label>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="350"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  className="pl-10 pr-12 border-2 border-gray-200 focus:border-[var(--gold)] transition-colors text-base sm:text-lg font-semibold w-full bg-white text-gray-900"
                />
                <TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--gold)]/50" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600">км</span>
              </div>
            </div>

            <Button
              onClick={calculateAllPrices}
              disabled={!distance || Number.parseFloat(distance) <= 0}
              className="w-full gold-gradient hover:opacity-90 transition-opacity py-4 sm:py-6 text-base sm:text-lg font-semibold disabled:opacity-50 text-white"
            >
              {isCalculating ? (
                <>
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  {t.calculator.calculating}
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  {t.calculator.calculate}
                </>
              )}
            </Button>
          </div>
        </Card>

        {results && (
          <div className="grid gap-3 sm:gap-4 w-full">
            <div className="text-center mb-2">
              <h4 className="text-base sm:text-lg md:text-xl font-semibold gold-gradient-text flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="truncate">{t.calculator.tariffComparison}</span>
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 px-4">{t.calculator.chooseBestOption}</p>
            </div>

            {Object.entries(TARIFFS).map(([key, tariff]) => {
              const price = results[key]
              const isSelected = selectedTariff === key
              const tariffKey = key as keyof typeof TARIFFS

              return (
                <Card
                  key={key}
                  className={`p-4 sm:p-6 cursor-pointer transition-all duration-200 w-full bg-white ${
                    isSelected
                      ? "border-2 border-[var(--gold)] shadow-lg"
                      : "border border-gray-200 hover:border-[var(--gold)]/50"
                  }`}
                  onClick={() => setSelectedTariff(tariffKey)}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1 w-full">
                      <div
                        className={`text-2xl sm:text-3xl md:text-4xl p-2 sm:p-3 rounded-2xl bg-gradient-to-br ${tariff.color} bg-opacity-10 flex-shrink-0`}
                      >
                        {tariff.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h5 className="font-semibold text-sm sm:text-base md:text-lg break-words text-gray-900">
                          {t.tariffs[tariffKey]}
                        </h5>
                        <p className="text-xs sm:text-sm text-gray-600 break-words">
                          {tariff.price} BYN/км × {distance} км
                        </p>
                      </div>
                    </div>

                    <div className="text-left sm:text-right w-full sm:w-auto flex-shrink-0">
                      <div className="text-xl sm:text-2xl md:text-3xl font-bold gold-gradient-text">
                        {price.toFixed(2)}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">BYN</div>
                    </div>
                  </div>

                  {isSelected && (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleBooking(key)
                      }}
                      className="w-full mt-3 sm:mt-4 gold-gradient hover:opacity-90 transition-opacity text-sm sm:text-base py-2 sm:py-3 text-white"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      {t.calculator.bookThisTariff}
                    </Button>
                  )}
                </Card>
              )
            })}
          </div>
        )}

        {results && (
          <div className="mt-4 p-4 rounded-lg bg-amber-50 border-2 border-amber-200">
            <p className="text-xs sm:text-sm text-gray-900 text-center">ⓘ {t.calculator.priceDisclaimer}</p>
          </div>
        )}
      </div>

      <BookingModal
        open={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        locale={locale}
        selectedTariff={selectedBookingTariff}
        distance={distance}
        from={from}
        to={to}
      />
    </>
  )
}
