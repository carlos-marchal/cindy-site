'use client'

import { useEffect } from 'react'

export default function ConsoleLogger() {
  useEffect(() => {
    console.log(
      "%cWebsite built with ❤️ by Carlos Marchal <carlos.marchal@pm.me>\n\n%cTake a look at the code -> https://github.com/carlos-marchal/cindy-site\n\nOr, take a look at me! -> https://carlos.marchal.page",
      "font-size: 18px; font-family: monospace",
      "font-size: 15px; font-family: monospace; color: gray"
    )
  }, [])

  return null
}
