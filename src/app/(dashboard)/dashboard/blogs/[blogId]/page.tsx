import UpdateBlogForm from "@/components/modules/Blogs/UpdateBlogForm";


type Props = {
    params: {
        'blogId': string;
    };
};
const UpdateBlogPage = async({ params }: Props) => {
    
    const { "blogId" : blogId } = await params;
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post/${blogId}`);
    const blog = await res.json();


    return (
        <div className='w-full py-10 md:py-20 min-h-screen flex items-center justify-center'>
            <UpdateBlogForm blog={blog}/>
        </div>
    );
};

export default UpdateBlogPage;