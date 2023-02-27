import "./styles.scss"
import countries from "./data.json" assert { type: "json" }
import apiResponse from "./res.json" assert { type: "json" }

type country = (typeof countries)[0]
type apiResponse = (typeof apiResponse)[0]

const INITIAL_NUMBER_OF_CARDS = 24
const cardTemplate = document.querySelector<HTMLTemplateElement>(
  `[data-country-card-template]`
)
const countriesSection = document.querySelector(
  `[data-countries-section]`
) as HTMLElement
const loadMoreBtn =
  document.querySelector<HTMLButtonElement>(`[data-load-more]`)
const detailsTemplate = document.querySelector<HTMLTemplateElement>(
  `[data-details-template]`
)
const form = document.querySelector<HTMLFormElement>("form")
const searchInput = document.querySelector<HTMLInputElement>("form input")
const filterRegionElem = document.querySelector(`[data-filter-region]`)
const options = document.querySelector(`[data-options]`)

let countriesShowOnPage: country[] = []
loadCards()
loadMoreBtn?.addEventListener("click", loadCards)

function loadCards() {
  for (let i = 0; i < INITIAL_NUMBER_OF_CARDS; i++) {
    let randomCountry: country

    do randomCountry = countries[Math.round(Math.random() * countries.length)]
    while (countriesShowOnPage.includes(randomCountry))

    countriesShowOnPage.push(randomCountry)

    const countryCard = createCountryCard(randomCountry)

    countriesSection?.append(countryCard!)
  }
}

form?.addEventListener("submit", async (e) => {
  e.preventDefault()

  if (!searchInput) return
  const countryName = searchInput?.value
  if (countryName === "") return

  countriesSection.classList.remove("no-results")

  const countries = await getSearchedCountry(searchInput?.value)

  if (!countries) {
    countriesSection.classList.add("no-results")
    countriesSection.innerText = `No results match "${countryName}"`
    return
  }

  countriesSection.innerHTML = ""
  countries.forEach((country) => countriesSection.append(country))
})

searchInput?.addEventListener("input", () => {
  if (searchInput.value !== "") return

  countriesSection.classList.remove("no-results")
  countriesSection!.innerHTML = ""
  loadCards()
})

async function getSearchedCountry(
  countryName: string
): Promise<HTMLElement[] | null> {
  let countries: apiResponse[]

  const res = await fetch(`https://restcountries.com/v3.1/name/${countryName}`)

  if (res.status === 404) return Promise.resolve(null)

  countries = await res.json()

  countries = countries.map((country) => formatAPIresults(country))

  const countryCards = countries.map((country) => createCountryCard(country))

  return countryCards
}

function createCountryCard(country: any) {
  const countryCard = cardTemplate?.content.cloneNode(true) as HTMLElement

  fillData("flag", "src", country.flags.svg || "", countryCard)
  fillData("name", "innerText", country.name || "", countryCard)
  fillData(
    "population",
    "innerText",
    `${Intl.NumberFormat("en-us", {
      notation: "standard",
    }).format(country.population || 0)}`,
    countryCard
  )
  fillData("region", "innerText", country.region || "", countryCard)
  fillData("capital", "innerText", country.capital || "No Capital", countryCard)

  countryCard
    .querySelector<HTMLDivElement>(`[data-country-card]`)
    ?.addEventListener("click", () => showDetails(country))

  return countryCard
}

function fillData(
  selector: string,
  property: string,
  data: string,
  parentElem: HTMLElement
) {
  const targetElem = parentElem.querySelector(
    `[data-${selector}]`
  ) as HTMLElement

  if (property === "innerText") targetElem.innerText = data
  if (property === "src") targetElem.setAttribute("src", data)
}

function showDetails(country: Partial<country>) {
  const countryDetailsElem = detailsTemplate?.content.cloneNode(true)
    .childNodes[1] as HTMLElement

  if (!country.flags) return

  fillData("flag", "src", country.flags.svg, countryDetailsElem)
  fillData(
    "native-name",
    "innerText",
    country.nativeName || "",
    countryDetailsElem
  )
  fillData(
    "population",
    "innerText",
    `${Intl.NumberFormat("en-us", {
      notation: "standard",
    }).format(country.population || 0)}`,
    countryDetailsElem
  )
  fillData("region", "innerText", country.region || "", countryDetailsElem)
  fillData(
    "sub-region",
    "innerText",
    country.subregion || "",
    countryDetailsElem
  )
  fillData(
    "capital",
    "innerText",
    country.capital || "No Capital",
    countryDetailsElem
  )
  fillData(
    "top-level-domain",
    "innerText",
    `${country.topLevelDomain || "Not Found"}`,
    countryDetailsElem
  )
  fillData(
    "languages",
    "innerText",
    formatCollection(country.languages),
    countryDetailsElem
  )
  fillData(
    "currencies",
    "innerText",
    formatCollection(country.currencies),
    countryDetailsElem
  )

  const borderElem =
    countryDetailsElem.querySelector<HTMLDivElement>(`[data-borders]`)
  let borderCountries: country[] = []

  borderCountries = getBorderCountries(country)
  if (borderCountries.length === 0) borderElem?.append("No Borders...")

  borderCountries.forEach((borderCountry) => {
    const borderCountryElem = document.createElement("div")
    borderCountryElem.innerText = borderCountry.name
    borderCountryElem.classList.add("border-country")
    borderCountryElem.addEventListener("click", () =>
      showDetails(borderCountry)
    )
    borderElem?.append(borderCountryElem)
  })

  countryDetailsElem
    .querySelector(`[data-back-btn]`)
    ?.addEventListener("click", (e) => {
      const btn = e.target as HTMLButtonElement
      requestAnimationFrame(() => countryDetailsElem.classList.add("not-shown"))
      countryDetailsElem.addEventListener("transitionend", () =>
        btn.parentElement?.remove()
      )
    })

  document.body.append(countryDetailsElem)
  requestAnimationFrame(() => countryDetailsElem.classList.remove("not-shown"))
}

const langaugesType = countries[0].languages
const currenciesType = countries[0].currencies

function formatCollection(
  collection: typeof langaugesType | typeof currenciesType
) {
  if (!collection) return "None"
  return collection.map
    ? collection.map((item) => item.name).join(", ")
    : Object.entries(collection)[0][1]
}

function getBorderCountries(country: Partial<country>) {
  if (!country.borders) return []

  return countries.filter((possibleBorderCountry) => {
    return country.borders.some(
      (name) =>
        possibleBorderCountry.alpha2Code === name ||
        possibleBorderCountry.alpha3Code === name
    )
  })
}


function formatAPICurrencies(currencies: any) {
  return Object.entries(currencies) // @ts-ignore 
    .map(([key, value]) => value) 
    .map((currency: any) => {
      return {
        name: currency.name,
      }
    })
}

function formatAPILanguages(languages: any) { // @ts-ignore
  return Object.entries(languages).map(([key, value]) => {
    return { name: value }
  })
}

function formatAPIresults(country: apiResponse) {
  let formattedCountry = structuredClone(country)

  Object.defineProperty(formattedCountry, "name", {
    value: country.name.official,
  })

  Object.defineProperty(formattedCountry, "nativeName", {
    value: country.name.nativeName.eng?.official,
  })

  Object.defineProperties(formattedCountry, {
    capital: {
      value: country.capital[0],
    },
    languages: {
      value: formatAPILanguages(country.languages),
    },
    currencies: {
      value: formatAPICurrencies(country.currencies),
    },
  })

  return formattedCountry
}

filterRegionElem?.addEventListener("click", openOptions, { once: true })

function openOptions() {
  options?.classList.remove("disabled")
  options?.childNodes.forEach((option) =>
    option.addEventListener("click", filterCountries)
  )
  filterRegionElem?.addEventListener("click", closeOptions, { once: true })
}

function closeOptions() {
  options?.classList.add("disabled")
  options?.childNodes.forEach((option) =>
    option.removeEventListener("click", filterCountries)
  )
  filterRegionElem?.addEventListener("click", openOptions, { once: true })
}

function filterCountries(e: Event) {
  countriesSection.innerHTML = ""
  const option = e.target as HTMLDivElement
  ;(
    filterRegionElem?.querySelector(`[data-label]`) as HTMLDivElement
  ).innerText = option.dataset.value!
  if (option.dataset.value === "All"){
    loadCards()
    return
  } 

  countries
    .filter((country) => country.region === option.dataset.value)
    .forEach((country) => {
      const regionCountry = createCountryCard(country)
      countriesSection.append(regionCountry!)
    })
}
