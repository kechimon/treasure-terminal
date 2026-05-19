import Parser from "rss-parser"

const parser = new Parser()

export async function GET() {

  try {

    const feeds = [

      {
        url: "https://news.yahoo.co.jp/rss/topics/business.xml",
        source: "Yahoo経済"
      },

      {
        url: "https://www3.nhk.or.jp/rss/news/cat5.xml",
        source: "NHK経済"
      },

      

    ]

    let allNews: any[] = []

    for (const feedInfo of feeds) {

      try {

        const feed = await parser.parseURL(feedInfo.url)

        const items = feed.items.slice(0, 4)

        const formatted = items.map((item: any) => ({

          title:
            item.title ||
            "マーケットニュース",

          link:
            item.link?.startsWith("http")
              ? item.link
              : "#",

          source:
            feedInfo.source,

          date:
            item.pubDate || "",

          description:
            item.contentSnippet ||
            item.content ||
            "最新の経済ニュース",

          image:
            "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop"

        }))

        allNews.push(...formatted)

      } catch (feedError) {

        console.log(
          "RSS ERROR:",
          feedInfo.source,
          feedError
        )

      }

    }

    // 経済・マーケット系だけ優先

    const keywords = [

      "為替",
"ドル円",
"円安",
"円高",
"日銀",
"FRB",
"FOMC",
"金利",
"利下げ",
"利上げ",
"NASDAQ",
"ナスダック",
"NYダウ",
"S&P500",
"株",
"米国株",
"CPI",
"インフレ",
"GDP",
"景気",
"雇用統計",
"原油",
"ゴールド",
"XAUUSD",
"先物",
"日本株",
"イラン",
"イスラエル",
"戦争",
"中東",
"軍事",
"ホルムズ海峡",
"地政学",
"有事",
"リスクオフ",

    ]

    // 経済ニュースを優先順位UP

allNews.sort((a, b) => {

  const textA =
    `${a.title} ${a.description}`

  const textB =
    `${b.title} ${b.description}`

  const scoreA = keywords.some((k) =>
    textA.includes(k)
  )
    ? 1
    : 0

  const scoreB = keywords.some((k) =>
    textB.includes(k)
  )
    ? 1
    : 0

  return scoreB - scoreA

})

    // 新しい順

    allNews.sort((a, b) => {

      return (
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
      )

    })

    return Response.json(

      allNews.slice(0, 8),

      {

        headers: {

          "Cache-Control":
            "s-maxage=300, stale-while-revalidate"

        }

      }

    )

  } catch (error) {

    console.log(
      "NEWS API ERROR:",
      error
    )

    return Response.json([])

  }

}