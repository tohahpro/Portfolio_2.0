import { Project } from "@/types";
import Image from "next/image";
import EditorJSContent from "../Blogs/EditorJSContent";

const ProjectDetailsCard = ({ project }: { project: Project }) => {

    console.log(project);


    if (!project) {
        return (
            <div className="py-20 text-center text-gray-500">project not found.</div>
        );
    }

    return (
        <main className="max-w-4xl mx-auto py-20 px-4">
            <h1 className="text-5xl font-bold mb-6">{project?.projectName}</h1>

            <div>
                {project.thumbnail && (
                    <div className="relative h-[32rem] w-full overflow-hidden">
                        <Image
                            src={project.thumbnail}
                            alt={project.projectName}
                            fill
                            className="rounded-lg object-cover shadow-md"
                        />
                    </div>
                )}
            </div>

            <div className="pt-5 flex gap-4">
                <h3 className="font-medium text-lg py-1">Features -</h3>
                <div className="flex gap-3">
                    {
                        project?.features?.map((feature, idx) => (
                            <span className="px-4 py-0.5 rounded-sm border" key={idx}>{feature}</span>
                        ))
                    }
                </div>
            </div>

            <article className="pt-7">                
                <EditorJSContent data={project.description} className="prose prose-lg max-w-none" />
            </article>
        </main>
    );
};

export default ProjectDetailsCard;