import Parser from "rss-parser"

const parser = new Parser()

export async function GET() {

  try {

    const feeds = [

      {
        url: "https://news.yahoo.co.jp/rss/topics/business.xml",
        source: "Yahoo"
      },

      {
        url: "https://www3.nhk.or.jp/rss/news/cat5.xml",
        source: "NHK"
      }

    ]

    let allNews: any[] = []

    for (const feedInfo of feeds) {

      try {

        const feed = await parser.parseURL(feedInfo.url)

        const items = feed.items.slice(0, 3)

        const formatted = items.map((item: any) => ({

          title: item.title || "日本マーケットニュース",

          link:
            item.link?.startsWith("http")
              ? item.link
              : "#",

          source: feedInfo.source,

          date: item.pubDate || "",

          description:
            item.contentSnippet ||
            item.content ||
            "最新の日本マーケットニュース",

          image:
            "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop"

        }))

        allNews.push(...formatted)

      } catch (feedError) {

        console.log("RSS ERROR:", feedInfo.source, feedError)

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

    console.log("NEWS API ERROR:", error)

    return Response.json([])

  }

}