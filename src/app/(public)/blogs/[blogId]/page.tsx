import BlogDetailsCard from "@/components/modules/Blogs/BlogDetailsCard";
import { Metadata } from "next";

type Props = {
    params: {
        'blogId': string;
    };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { blogId } = await params
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post/${blogId}`);
    const blog = await res.json();
    if (!blog) {
        return {
            title: "blogs",
            description: "The requested blog could not be found.",
        };
    }
    return {
        title: `${blog.title} | blogs`,
        description: `Explore the ${blog.title} blog.`,
    };
}
const BlogDetailsPage = async ({ params }: Props) => {

    const { blogId } = await params

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post/${blogId}`);
    const blog = await res.json();

    console.log(blog);
    return (
        <div className="py-10 px-4 mx-auto">            
            <BlogDetailsCard blog={blog} />
        </div>
    );
};

export default BlogDetailsPage;