import { Project } from "@/types";
import Image from "next/image";

const ProjectDetailsCard = ({ project }: { project: Project} ) => {

    console.log(project);
    

    if (!project) {
        return (
            <div className="py-20 text-center text-gray-500">project not found.</div>
        );
    }

    return (
        <main className="max-w-4xl mx-auto py-20 px-4">
            <h1 className="text-5xl font-bold mb-6">{project?.projectName}</h1>

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

            <article className="prose pt-7 prose-lg max-w-none">
                {/* <p>{project.content}</p> */}
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam commodi cum aperiam earum odio quia optio beatae rem laborum labore debitis inventore quasi corrupti tempore, veritatis modi? Atque, minus nulla?</p>
            </article>
        </main>
    );
};

export default ProjectDetailsCard;