import Image from "next/image"
import Link from "next/link"
import documentToReactComponents from "@contentful/rich-text-html-renderer"
import { createClient } from "contentful"
import { render } from "react-dom"

import ArticleNotFound from "@/components/ArticlesSection/article-not-found"
import ArticleRichText from "@/components/ArticlesSection/article-rich-text"

async function ArticlePage({ params }: { params: { articleId: string } }) {
    const accessToken = process.env.CONTENTFUL_ACCESS_KEY
    const space = process.env.CONTENTFUL_SPACE_ID

    const contentfulClient = createClient({
        accessToken: accessToken ? accessToken : "",
        space: space ? space : "",
    })

    const res = await contentfulClient.getEntries({
        content_type: "article",
        "fields.slug": params.articleId,
    })

    if (!res.total) {
        return <ArticleNotFound articleId={params.articleId} />
    }

    const article = res.items[0]

    console.log(article.fields.content)

    return (
        <section className="flex w-full justify-center pt-36">
            <article className="w-full max-w-[1500px] px-5">
                <article className="pb-10 text-left">
                    <h2 className="text-md font-light uppercase tracking-tighter">
                        {article.fields.subTitle?.toString()}
                    </h2>
                    <h1 className=" text-4xl font-medium uppercase tracking-tighter text-black/80 md:text-7xl">
                        {article.fields.title?.toString()}
                    </h1>
                    <p className=" text-lg text-muted-foreground">
                        {article.fields.shortDesc?.toString()}
                    </p>
                    <Link
                        className="group relative bottom-0 flex max-w-[185px] flex-col pt-5"
                        href={`#routine`}
                    >
                        <p className="text-xl font-medium tracking-wider">
                            GO TO THE ROUTINE
                        </p>
                        <div className=" absolute bottom-0 left-0 h-1 w-full origin-left scale-x-[.23] transform bg-orange-500 transition-transform duration-300 group-hover:scale-x-100" />
                    </Link>
                </article>
                <Image
                    src={"http:" + article.fields?.mainImage?.fields?.file.url}
                    width={690}
                    height={0}
                    alt={"dsf"}
                    className="w-full max-w-full object-cover "
                    loading="lazy"
                    style={{ height: "auto" }}
                />
                <ArticleRichText document={article.fields.content} />
            </article>
        </section>
    )
}
export default ArticlePage
