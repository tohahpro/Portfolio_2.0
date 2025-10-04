
import { Post } from "@/types";
import Image from "next/image";
import EditorJSContent from "./EditorJSContent";

export default async function BlogDetailsCard({ blog }: { blog: Post }) {
  if (!blog) {
    return (
      <div className="py-20 text-center text-gray-500">Blog not found.</div>
    );
  }

  console.log(blog);

  return (
    <main className="max-w-4xl mx-auto py-30 px-4">
      <h1 className="text-5xl font-bold mb-6">{blog?.title}</h1>

      <div className="pb-8">
        <div className="flex items-center gap-4">
          <Image
            src={
              blog.thumbnail ||
              "https://cdn-icons-png.flaticon.com/512/9385/9385289.png"
            }
            alt={blog?.title}
            width={48}
            height={48}
            className="rounded-full"
          />
          <div>
            <p className="font-semibold">
              {blog.title}{" "}
              {blog.author && (
                <span className="inline-block ml-1 text-blue-500">✔</span>
              )}
            </p>
            <p className="text-gray-500 text-sm">
              {new Date(blog.createdAt).toLocaleDateString()} • {blog.views} views
            </p>

          </div>
        </div>
        <div className="pt-2">
          <p className="flex gap-2">
            {
              blog.tags.map((tag, idx) => (
                <span key={idx} className="px-4  rounded-sm bg-gray-200 shadow-lg">{tag}</span>
              ))
            }
          </p>
        </div>
      </div>

      {blog.thumbnail && (
        <div className="relative h-80 w-full overflow-hidden">
          <Image
            src={blog.thumbnail}
            alt={blog.title}
            fill
            className="rounded-lg object-cover shadow-md"
          />
        </div>
      )}

      <article className="pt-7">
        <EditorJSContent data={blog.content} className="prose prose-lg max-w-none" />
      </article>
    </main>
  );
}
