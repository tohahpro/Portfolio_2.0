import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Post } from "@/types";
import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ blog }: { blog: Post }) => {
    return (
        <div>
            <Card className="p-5 gap-0 h-full">
                <CardHeader className="p-0">
                    <div className="relative h-56 w-full overflow-hidden">
                        <Image
                            src={blog.thumbnail}
                            alt={blog.title}
                            fill
                            className="object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                </CardHeader>
                <div className="pt-4">
                    <CardTitle>{blog.title}</CardTitle>
                    <CardContent className="py-2.5 px-0">
                        <p>{blog.content.split(" ").slice(0, 12).join(" ") + "..."}</p>
                    </CardContent>
                    <div className="flex justify-end">
                    <Link href={`/blogs/${blog.id}`}><Button className="py-0 cursor-pointer">Read More →</Button></Link>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default BlogCard;