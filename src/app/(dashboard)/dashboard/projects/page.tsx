import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Project } from "@/types";
import { SquarePen, Link2Icon } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import Link from "next/link";
import { ProjectDelete } from "@/components/modules/Project/ProjectDelete";




const AllProjects = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project`, {
        next: {
            tags: ["PROJECT"]
        }
    });
    const data = await res.json();
    console.log(data);
    const projects = data?.data;


    return (
        
            <div className="w-full min-h-screen flex items-center">
                <Table className="w-5/6 mx-auto">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">Id</TableHead>
                            <TableHead>Project Name</TableHead>
                            <TableHead>Live Link</TableHead>
                            <TableHead>GitHub Link</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            projects?.map((project: Project) => (
                                <TableRow key={project?.id}>
                                    <TableCell className="font-medium">{project.id}</TableCell>
                                    <TableCell className="font-medium">{project.projectName}</TableCell>
                                    <TableCell className="font-medium cursor-pointer"><Button><a href={project.liveLink}><Link2Icon size={20}/></a></Button></TableCell>
                                    <TableCell className="font-medium cursor-pointer"><Button><a href={project.githubLink}><FaGithub size={28}/></a></Button></TableCell>
                                    <TableCell className="font-medium gap-2 flex justify-end">
                                        <Link href={`/dashboard/projects/${project.id}`}><Button className="cursor-pointer"><SquarePen /></Button></Link>
                                        {/* <Button className="bg-destructive cursor-pointer"><Trash /></Button> */}
                                        <ProjectDelete projectId={project.id} />
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