/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Project } from "@/types";
import Image from "next/image";
import Link from "next/link";

const ProjectCard = ({project}: {project: Project}) => {

    const getTextPreview = (content: string) => {
        try {
            const parsed = JSON.parse(content);
            if (parsed.blocks && Array.isArray(parsed.blocks)) {
                const text = parsed.blocks
                    .filter((block: any) => block.type === "paragraph" || block.type === "header")
                    .map((block: any) => block.data?.text || "")
                    .join(" ");
                
                const cleanText = text.replace(/<[^>]*>/g, '');
                const words = cleanText.split(/\s+/);
                return words.slice(0, 15).join(" ") + "...";
            }
        } catch {
            const cleanText = content.replace(/<[^>]*>/g, '');
            const words = cleanText.split(/\s+/);
            return words.slice(0, 15).join(" ") + "...";
        }
        
        const cleanText = content.replace(/<[^>]*>/g, '');
        const words = cleanText.split(/\s+/);
        return words.slice(0, 15).join(" ") + "...";
    };
    
    return (
        <div>
            <Card className="p-5 gap-0 h-full flex-1">
                <CardHeader className="p-0">
                    <div className="relative h-56 w-full overflow-hidden">
                        <Image
                            src={project.thumbnail}
                            alt={project.projectName}
                            fill
                            className="object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                </CardHeader>
                <div className="pt-4">
                    <CardTitle>{project.projectName}</CardTitle>
                    <CardContent className="py-2.5 w-full px-0">

                        <p>{getTextPreview(project.description)}</p>
                    </CardContent>
                    <div className="flex justify-end">
                    <Link href={`/projects/${project.id}`}><Button className="py-0 cursor-pointer">Read More →</Button></Link>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ProjectCard;