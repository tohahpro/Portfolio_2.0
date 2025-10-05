import BlogCard from "@/components/modules/Blogs/BlogCard";
import { Post } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Blogs",
  description: "Read insightful articles, tutorials, and updates on web development.",
};
const BlogsPage = async () => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post`, {
        next: {
            revalidate: 30
        }
    });
    const data = await res.json();

    return (
        <div className="min-h-dvh py-20 px-8 w-11/12 mx-auto">
            <h2 className="text-center font-medium text-2xl pb-10">All Blogs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {
                    data?.data?.map((blog: Post) => (

                        <BlogCard key={blog.id} blog={blog} />

                    ))
                }
            </div>
        </div>
    );
};

export default BlogsPage;