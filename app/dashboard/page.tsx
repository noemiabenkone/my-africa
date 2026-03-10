"use client"
import {BotMessageSquare} from "lucide-react"
import {useState, useEffect} from "react"
import {useRouter} from "next/navigation";

export default function Page() {

    interface country {
        name: {
            common: string;
        },
        flags: {
            png: string;
        },
        capital?: string[];
        area: number;
    }

    const [countries, setCountries] = useState<country[]>([])

    useEffect(() => {
        async function fetchCountries() {
            try {
                const response = await fetch("https://restcountries.com/v3.1/region/africa");
                const data = await response.json();
                setCountries(data);
            } catch (error) {
                console.error("Deu erro ao buscar pais:", error)
            }

        }

        fetchCountries()
    }, [])
    const router = useRouter();
    return (
        <main className="bg-red-100 min-h-screen text-red-900 ">
            <header
                className="w-full bg-white flex justify-between items-center px-6 py-4 shadow-md text-2xl font-bold">
                <h1>MY AFRICA</h1>
                <img
                    src="https://www.pngitem.com/pimgs/m/68-680152_an-illustration-of-the-continent-of-africa-transparent.png"
                    alt="Mapa da África"
                    className="
                  h-20
                  opacity-80
                  "
                />
            </header>
            <section className="
                 max-w-7xl
                 mx-auto
                 mt-10
                 px-6
                 grid
                 grid-cols-1
                 sm:grid-cols-2
                 md:grid-cols-3
                 lg:grid-cols-4
                 gap-6
            ">
                {countries.map((country, index) => (
                    <div
                        key={index}
                        onClick={() => {
                            router.push(`/chat?country=${country.name.common}`)
                        }}
                        className="bg-white p-4 shadow-lg text-center rounded-lg">
                        <img
                            src={country.flags.png}
                            alt={`Bandeira de ${country.name.common}`}
                            className="mx-auto mb-2 h-16"/>
                        <p className="font-semibold text-red-900">{country.name.common}</p>
                        <p className="text-sm">Capital: {country.capital ? country.capital[0] : "N/A"}</p>
                        <p className="text-sm">Área: {country.area.toLocaleString()} km²</p>
                    </div>
                ))}
            </section>
        </main>
    )
}