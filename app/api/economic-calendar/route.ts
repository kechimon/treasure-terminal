export async function GET() {

  try {

    const events = [

      {
        countryJP: "🇺🇸 米国",
        title: "消費者物価指数（CPI）",
        date: "21:30"
      },

      {
        countryJP: "🇺🇸 米国",
        title: "非農業部門雇用者数",
        date: "21:30"
      },

      {
        countryJP: "🇯🇵 日本",
        title: "国内総生産（GDP）",
        date: "08:50"
      },

      {
        countryJP: "🇯🇵 日本",
        title: "日銀政策金利",
        date: "12:00"
      }

    ]

    return Response.json(events)

  } catch (error) {

    return Response.json([])

  }

}