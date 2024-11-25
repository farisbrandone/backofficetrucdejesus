import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createDecimalArray(
  interval: number,
  quantity: number
): number[] {
  const result: number[] = [];

  for (let i = 0; i < quantity; i++) {
    const k = i * interval;
    const a = k.toString().split(".");
    if (a.length > 1 && a[1].length > 2) {
      const z = Number(k.toFixed(1));
      result.push(z);
      continue;
    }
    result.push(k);
  }
  return result;
}

export function generateWorldCurrencyArray() {
  const currencies = [
    "USD",
    "EUR",
    "JPY",
    "GBP",
    "AUD",
    "CAD",
    "CHF",
    "CNY",
    "SEK",
    "NZD",
    "ZAR",
    "INR",
    "BRL",
    "RUB",
    "MXN",
    "HKD",
    "SGD",
    "KRW",
    "NOK",
    "TRY",
    "IDR",
    "TWD",
    "MYR",
    "PHP",
    "PLN",
    "THB",
    "HUF",
    "CZK",
    "RON",
    "ILS",
    "SAR",
    "AED",
    "DKK",
    "MAD",
    "EGP",
    "COP",
    "CLP",
    "PKR",
    "BDT",
    "VND",
  ];
  return currencies;
}

export function generateCountryPhoneCodes() {
  const countryPhoneCodes = [
    { country: "United States", code: "+1" },
    { country: "Canada", code: "+1" },
    { country: "United Kingdom", code: "+44" },
    { country: "Germany", code: "+49" },
    { country: "France", code: "+33" },
    { country: "Australia", code: "+61" },
    { country: "India", code: "+91" },
    { country: "China", code: "+86" },
    { country: "Japan", code: "+81" },
    { country: "South Africa", code: "+27" },
    { country: "Brazil", code: "+55" },
    { country: "Mexico", code: "+52" },
    { country: "Russia", code: "+7" },
    { country: "South Korea", code: "+82" },
    { country: "Nigeria", code: "+234" },
  ];
  return countryPhoneCodes;
}
