"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  MapPin,
  Calculator,
  Sparkles,
  TrendingUp,
  Clock,
  CheckCircle2,
  Loader2,
} from "lucide-react";

import { type Locale, translations } from "@/lib/i18n";
import { BookingModal } from "./booking-modal";

// Динамический импорт карты
const RouteMap = dynamic(() => import("../components/route-map"), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] w-full rounded-lg bg-gray-100 animate-pulse border-2 border-gray-200" />
  ),
});

export interface DbTariff {
  id: string;
  key: string;
  pricePerKm: number;
  imageUrl: string;
}

interface CalculatorFormProps {
  locale: Locale;
  dbTariffs: DbTariff[];

  // === НОВЫЕ ПРОПСЫ ДЛЯ ДИНАМИЧЕСКИХ СТРАНИЦ ===
  initialFrom?: string;
  initialTo?: string;
  initialDistance?: string;
  initialFromCoords?: { lat: number; lon: number } | null;
  initialToCoords?: { lat: number; lon: number } | null;
  preCalculatedResults?: Record<string, number> | null;
  autoCalculateOnMount?: boolean;
}

interface AddressSuggestion {
  display_name: string;
  lat: number;
  lon: number;
}

const FALLBACK_TARIFFS: DbTariff[] = [
  {
    id: "1",
    key: "standard",
    pricePerKm: 1.3,
    imageUrl: "/tariffs/standard.webp",
  },
  {
    id: "2",
    key: "comfort",
    pricePerKm: 1.5,
    imageUrl: "/tariffs/comfort.webp",
  },
  {
    id: "3",
    key: "business",
    pricePerKm: 3.0,
    imageUrl: "/tariffs/business.webp",
  },
  {
    id: "4",
    key: "minivan",
    pricePerKm: 2.2,
    imageUrl: "/tariffs/minivan.webp",
  },
  { id: "5", key: "vip", pricePerKm: 3.0, imageUrl: "/tariffs/vip.webp" },
  {
    id: "6",
    key: "minibus",
    pricePerKm: 3.0,
    imageUrl: "/tariffs/minibus.webp",
  },
];

export function CalculatorForm({
  locale,
  dbTariffs,
  initialFrom = "",
  initialTo = "",
  initialDistance = "",
  initialFromCoords = null,
  initialToCoords = null,
  preCalculatedResults = null,
  autoCalculateOnMount = false,
}: CalculatorFormProps) {
  const tariffs =
    dbTariffs && dbTariffs.length > 0 ? dbTariffs : FALLBACK_TARIFFS;

  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [distance, setDistance] = useState(initialDistance);

  const [fromSuggestions, setFromSuggestions] = useState<AddressSuggestion[]>(
    [],
  );
  const [toSuggestions, setToSuggestions] = useState<AddressSuggestion[]>([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);

  const [isSearchingFrom, setIsSearchingFrom] = useState(false);
  const [isSearchingTo, setIsSearchingTo] = useState(false);

  const [fromCoords, setFromCoords] = useState<{
    lat: number;
    lon: number;
  } | null>(initialFromCoords);
  const [toCoords, setToCoords] = useState<{ lat: number; lon: number } | null>(
    initialToCoords,
  );

  const [routeLine, setRouteLine] = useState<[number, number][] | null>(null);
  const [isCityTour, setIsCityTour] = useState(false);

  const [results, setResults] = useState<Record<string, number> | null>(
    preCalculatedResults,
  );
  const [isCalculating, setIsCalculating] = useState(false);

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedBookingTariff, setSelectedBookingTariff] = useState("");

  const fromInputRef = useRef<HTMLDivElement>(null);
  const toInputRef = useRef<HTMLDivElement>(null);
  const searchTimerRef = useRef<NodeJS.Timeout | null>(null);

  const t = translations[locale];

  // ====================== Автозаполнение и автоподсчёт ======================
  useEffect(() => {
    if (initialFrom) setFrom(initialFrom);
    if (initialTo) setTo(initialTo);
    if (initialDistance) setDistance(initialDistance);
    if (initialFromCoords) setFromCoords(initialFromCoords);
    if (initialToCoords) setToCoords(initialToCoords);

    // Автоматический расчёт при загрузке динамической страницы
    if (
      autoCalculateOnMount &&
      initialDistance &&
      Number(initialDistance) > 0
    ) {
      const dist = Number(initialDistance);
      const calculated: Record<string, number> = {};
      tariffs.forEach((tariff) => {
        calculated[tariff.key] = Number((dist * tariff.pricePerKm).toFixed(2));
      });
      setResults(calculated);
    }
  }, [
    initialFrom,
    initialTo,
    initialDistance,
    initialFromCoords,
    initialToCoords,
    autoCalculateOnMount,
    tariffs,
  ]);

  // ====================== Остальная логика (без изменений) ======================
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        fromInputRef.current &&
        !fromInputRef.current.contains(event.target as Node)
      ) {
        setShowFromSuggestions(false);
      }
      if (
        toInputRef.current &&
        !toInputRef.current.contains(event.target as Node)
      ) {
        setShowToSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatNominatimAddress = (address: any, name: string) => {
    const parts = [];
    if (address.road) {
      let street = address.road;
      if (address.house_number) street += `, ${address.house_number}`;
      parts.push(street);
    } else if (name) {
      parts.push(name);
    }
    const city = address.city || address.town || address.village;
    if (city && city !== name) parts.push(city);
    return parts.length > 0 ? parts.join(", ") : "Неизвестный адрес";
  };

  const fetchAddressSuggestions = async (
    query: string,
    isFromField: boolean,
  ) => {
    if (query.length < 3) {
      if (isFromField) {
        setFromSuggestions([]);
        setShowFromSuggestions(false);
      } else {
        setToSuggestions([]);
        setShowToSuggestions(false);
      }
      return;
    }

    if (isFromField) setIsSearchingFrom(true);
    else setIsSearchingTo(true);

    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);

    searchTimerRef.current = setTimeout(async () => {
      try {
        const smartQuery = query.replace(/([а-яА-Яa-zA-Z])\s+(\d+)/g, "$1, $2");
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?` +
            new URLSearchParams({
              format: "json",
              q: smartQuery,
              limit: "5",
              addressdetails: "1",
              "accept-language": locale === "ru" ? "ru" : "en",
              countrycodes: "by,ru,pl,lt,lv",
            }),
          { headers: { "User-Agent": "SKTransfer.by" } },
        );

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        const suggestions: AddressSuggestion[] = data.map((item: any) => ({
          display_name: formatNominatimAddress(item.address, item.name),
          lat: Number(item.lat),
          lon: Number(item.lon),
        }));

        const uniqueSuggestions = suggestions.filter(
          (v, i, a) =>
            a.findIndex((t) => t.display_name === v.display_name) === i,
        );

        if (isFromField) {
          setFromSuggestions(uniqueSuggestions);
          setShowFromSuggestions(uniqueSuggestions.length > 0);
        } else {
          setToSuggestions(uniqueSuggestions);
          setShowToSuggestions(uniqueSuggestions.length > 0);
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      } finally {
        if (isFromField) setIsSearchingFrom(false);
        else setIsSearchingTo(false);
      }
    }, 500);
  };

  const fetchRouteAndDistance = async (
    startLat: number,
    startLon: number,
    endLat: number,
    endLon: number,
  ) => {
    try {
      const res = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${startLon},${startLat};${endLon},${endLat}?overview=full&geometries=geojson`,
      );
      const data = await res.json();
      if (data.code === "Ok" && data.routes.length > 0) {
        const route = data.routes[0];
        const distanceKm = (route.distance / 1000).toFixed(1);
        setDistance(distanceKm);

        const coordinates = route.geometry.coordinates.map(
          (coord: number[]) => [coord[1], coord[0]] as [number, number],
        );
        setRouteLine(coordinates);
      }
    } catch (error) {
      console.error("Route calculation error:", error);
    }
  };

  useEffect(() => {
    if (fromCoords && toCoords && !isCityTour) {
      fetchRouteAndDistance(
        fromCoords.lat,
        fromCoords.lon,
        toCoords.lat,
        toCoords.lon,
      );
    } else {
      setRouteLine(null);
    }
  }, [fromCoords, toCoords, isCityTour]);

  const handleAddressSelect = (
    suggestion: AddressSuggestion,
    isFromField: boolean,
  ) => {
    if (isFromField) {
      setFrom(suggestion.display_name);
      setFromCoords({ lat: suggestion.lat, lon: suggestion.lon });
      setShowFromSuggestions(false);
    } else {
      setTo(suggestion.display_name);
      setToCoords({ lat: suggestion.lat, lon: suggestion.lon });
      setShowToSuggestions(false);
    }
    setResults(null);
  };

  const handleCityTourToggle = (checked: boolean) => {
    setIsCityTour(checked);
    if (checked) {
      setTo("");
      setToCoords(null);
      setDistance("");
      setRouteLine(null);
      setResults(null);
    }
  };

  const calculateAllPrices = () => {
    const dist = Number.parseFloat(distance);
    if (isNaN(dist) || dist <= 0) return;

    setIsCalculating(true);
    setTimeout(() => {
      const calculated: Record<string, number> = {};
      tariffs.forEach((tariff) => {
        calculated[tariff.key] = Number((dist * tariff.pricePerKm).toFixed(2));
      });
      setResults(calculated);
      setIsCalculating(false);
    }, 300);
  };

  const handleBooking = (tariffKey: string) => {
    const tariffName =
      t.tariffs?.[tariffKey as keyof typeof t.tariffs] || tariffKey;
    setSelectedBookingTariff(tariffName);
    setBookingModalOpen(true);
  };

  useEffect(() => {
    return () => {
      if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    };
  }, []);

  return (
    <>
      <div className="space-y-4 sm:space-y-6 w-full">
        <Card className="p-4 sm:p-6 lg:p-8 border-2 border-[var(--gold)]/20 bg-white shadow-lg w-full">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="p-2 sm:p-3 rounded-full bg-gradient-to-br from-[var(--gold)] to-amber-600 flex-shrink-0">
              <Calculator className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold gold-gradient-text break-words">
                {t.calculator.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 break-words">
                {t.calculator.subtitle}
              </p>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-5">
            <div className="mb-6">
              <RouteMap
                fromCoords={fromCoords}
                toCoords={toCoords}
                routeLine={routeLine}
              />
            </div>

            {/* Откуда */}
            <div className="space-y-2" ref={fromInputRef}>
              <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <MapPin className="w-4 h-4 text-[var(--gold)] flex-shrink-0" />
                {t.calculator.from}
              </Label>
              <div className="relative">
                <Input
                  placeholder="Минск, Независимости"
                  value={from}
                  onChange={(e) => {
                    setFrom(e.target.value);
                    fetchAddressSuggestions(e.target.value, true);
                  }}
                  className="pl-10 border-2 border-gray-200 focus:border-[var(--gold)] w-full"
                />
                {isSearchingFrom ? (
                  <Loader2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--gold)] animate-spin" />
                ) : (
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--gold)]/50" />
                )}
                {showFromSuggestions && fromSuggestions.length > 0 && (
                  <div className="absolute z-50 w-full mt-1 bg-white border-2 border-[var(--gold)]/20 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {fromSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        onClick={() => handleAddressSelect(suggestion, true)}
                        className="p-3 hover:bg-amber-50 cursor-pointer border-b last:border-b-0"
                      >
                        {suggestion.display_name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Куда */}
            {!isCityTour && (
              <div className="space-y-2" ref={toInputRef}>
                <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <MapPin className="w-4 h-4 text-[var(--gold)] flex-shrink-0" />
                  {t.calculator.to}
                </Label>
                <div className="relative">
                  <Input
                    placeholder="Гродно / Нарочь / Внуково"
                    value={to}
                    onChange={(e) => {
                      setTo(e.target.value);
                      fetchAddressSuggestions(e.target.value, false);
                    }}
                    className="pl-10 border-2 border-gray-200 focus:border-[var(--gold)] w-full"
                  />
                  {isSearchingTo ? (
                    <Loader2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--gold)] animate-spin" />
                  ) : (
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--gold)]/50" />
                  )}
                  {showToSuggestions && toSuggestions.length > 0 && (
                    <div className="absolute z-50 w-full mt-1 bg-white border-2 border-[var(--gold)]/20 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {toSuggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          onClick={() => handleAddressSelect(suggestion, false)}
                          className="p-3 hover:bg-amber-50 cursor-pointer border-b last:border-b-0"
                        >
                          {suggestion.display_name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Расстояние */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <TrendingUp className="w-4 h-4 text-[var(--gold)] flex-shrink-0" />
                {t.calculator.distance}
              </Label>
              <div className="relative">
                <Input
                  type="text"
                  readOnly
                  value={distance}
                  placeholder="Рассчитывается автоматически..."
                  className="pl-10 pr-12 border-2 border-gray-200 bg-gray-50 text-base font-semibold"
                />
                <TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--gold)]/50" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600">
                  км
                </span>
              </div>
            </div>

            {/* Кнопка расчёта */}
            <Button
              onClick={calculateAllPrices}
              disabled={!distance || Number.parseFloat(distance) <= 0}
              className="w-full gold-gradient hover:opacity-90 py-4 sm:py-6 text-base sm:text-lg font-semibold"
            >
              {isCalculating ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {t.calculator.calculating}
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  {t.calculator.calculate}
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Результаты тарифов */}
        {results && (
          <div className="grid gap-3 sm:gap-4 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            {tariffs.map((tariff) => {
              const price = results[tariff.key];
              if (price === undefined) return null;

              const displayName =
                t.tariffs?.[tariff.key as keyof typeof t.tariffs] || tariff.key;

              return (
                <Card key={tariff.id} className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-24 h-16 sm:w-36 sm:h-24 flex-shrink-0 rounded-md overflow-hidden border border-gray-200 shadow-sm">
                        <Image
                          src={tariff.imageUrl}
                          alt={displayName}
                          fill
                          className="object-cover object-center"
                          sizes="(max-width: 640px) 96px, 144px"
                        />
                      </div>
                      <div>
                        <h5 className="font-semibold text-lg">{displayName}</h5>
                        <p className="text-sm text-gray-600">
                          {tariff.pricePerKm} BYN/км × {distance} км
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-3xl font-bold gold-gradient-text">
                        {price.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-600">BYN</div>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleBooking(tariff.key)}
                    className="w-full mt-4 gold-gradient"
                  >
                    Забронировать этот тариф
                  </Button>
                </Card>
              );
            })}
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
  );
}
