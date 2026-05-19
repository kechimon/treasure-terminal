import Parser from "rss-parser"

const parser = new Parser()

function translateToJapanese(text: string) {

  return text
    .replace(/Fed/gi, "FRB")
    .replace(/interest rates?/gi, "金利")
    .replace(/inflation/gi, "インフレ")
    .replace(/stocks?/gi, "株式")
    .replace(/market/gi, "市場")
    .replace(/economy/gi, "経済")
    .replace(/oil/gi, "原油")
    .replace(/gold/gi, "ゴールド")
    .replace(/Iran/gi, "イラン")
    .replace(/Middle East/gi, "中東")
    .replace(/US/gi, "米国")
    .replace(/Dollar/gi, "ドル")

}

export async function GET() {

  try {

    const feeds = [

      {
        url: "https://feeds.bbci.co.uk/news/business/rss.xml",
        source: "BBC"
      },

      {
        url: "https://www.cnbc.com/id/100003114/device/rss/rss.html",
        source: "CNBC"
      },

      {
        url: "https://rss.nytimes.com/services/xml/rss/nyt/Business.xml",
        source: "NYTIMES"
      }

    ]

    let allNews: any[] = []

    for (const feedInfo of feeds) {

      try {

        const feed = await parser.parseURL(feedInfo.url)

        const items = feed.items.slice(0, 2)

        const formatted = items.map((item: any) => ({

          title: translateToJapanese(
            item.title || "海外マーケットニュース"
          ),

          link:
            item.link?.startsWith("http")
              ? item.link
              : "#",

          source: feedInfo.source,

          date: item.pubDate || "",

          description: translateToJapanese(
            item.contentSnippet ||
            item.content ||
            "最新マーケットニュース"
          ),

          image:
            "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop"

        }))

        allNews.push(...formatted)

      } catch (feedError) {

        console.log("US RSS ERROR:", feedInfo.source, feedError)

      }

    }

    allNews.sort((a, b) => {

      return new Date(b.date).getTime() - new Date(a.date).getTime()

    })

    return Response.json(allNews.slice(0, 6), {

      headers: {

        "Cache-Control": "s-maxage=300, stale-while-revalidate"

      }

    })

  } catch (error) {

    console.log("US NEWS API ERROR:", error)

    return Response.json([])

  }

}