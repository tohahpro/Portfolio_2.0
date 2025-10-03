import BlogDetailsCard from "@/components/modules/Blogs/BlogDetailsCard";

type Props = {
    params: {
        'blogId': string;
    };
};
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