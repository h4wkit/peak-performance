import Image from "next/image"
import Link from "next/link"

import { Button } from "./button"

function ArticlePreview(article: any) {
    return (
        <div className="mx-auto flex max-w-md flex-col overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-800">
            <Image
                src={"http:" + article.article.fields.miniImage.fields.file.url}
                width={690}
                height={0}
                alt={"dsf"}
                className="h-64 w-full object-cover"
                loading="lazy"
                style={{
                    aspectRatio: "400/200",
                    objectFit: "cover",
                }}
            />
            <div className="space-y-2 p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {article.article.fields.title}
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                    {article.article.fields.shortDesc}
                </p>
                <Link
                    className="group relative bottom-0 flex max-w-[105px] flex-col"
                    href={`/articles/${article.article.fields.slug}`}
                >
                    <p className="font-medium tracking-wider">READ ARTICLE</p>
                    <div className=" absolute bottom-0 left-0 h-1 w-full origin-left scale-x-[.23] transform bg-orange-500 transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
            </div>
        </div>
    )
}
export default ArticlePreview

// <article className="flex max-w-[1200px] flex-col items-start space-y-5 border-t px-5 py-12 lg:flex-row lg:space-x-5 lg:space-y-0">
{
    /* <Image
    src={"http:" + article.article.fields.miniImage.fields.file.url}
    width={690}
    height={0}
    alt={"dsf"}
    className="max-w-full object-cover lg:max-w-[280px] lg:object-scale-down"
    loading="lazy"
    style={{ height: "auto" }}
/> */
}
// <article className="flex h-full flex-col justify-between gap-1 space-y-5">
//     <article>
// ;<h2 className="text-md font-light uppercase tracking-tighter">
//     {article.article.fields.subTitle}
// </h2>
//         <h1 className="max-w-[600px] text-4xl font-medium uppercase tracking-tighter text-black/80">
//             {article.article.fields.title}
//         </h1>
//         <p className="max-w-[550px] text-lg text-muted-foreground">
//             {article.article.fields.shortDesc}
//         </p>
//     </article>
// <Link
//     className="group relative bottom-0 flex max-w-[105px] flex-col"
//     href={`/articles/${article.article.fields.slug}`}
// >
//     <p className="font-medium tracking-wider">READ ARTICLE</p>
//     <div className=" absolute bottom-0 left-0 h-1 w-full origin-left scale-x-[.23] transform bg-orange-500 transition-transform duration-300 group-hover:scale-x-100" />
// </Link>
// </article>
// </article>
