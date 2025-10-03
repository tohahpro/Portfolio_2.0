import { BlogDelete } from "@/components/modules/Blogs/BlogDelete";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Post } from "@/types";
import { SquarePen } from "lucide-react";
import Link from "next/link";


const AllProjects = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post`, {
        next: {
            tags: ["BLOGS"]
        }
    });
    const data = await res.json();

    return (        
            <div className="w-full min-h-screen flex items-center">
                <Table className="w-5/6 mx-auto">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">Id</TableHead>
                            <TableHead>Blog Title</TableHead>                            
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            data?.data?.map((blog: Post) => (
                                <TableRow key={blog?.id}>
                                    <TableCell className="font-medium">{blog.id}</TableCell>
                                    <TableCell className="font-medium">{blog.title}</TableCell>
                                    
                                    <TableCell className="font-medium gap-2 flex justify-end">
                                        <Link href={`/dashboard/blogs/${blog.id}`}><Button className="cursor-pointer"><SquarePen /></Button></Link>
                                        <BlogDelete blogId={blog.id} />                                        
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
    );
};

export default AllProjects;