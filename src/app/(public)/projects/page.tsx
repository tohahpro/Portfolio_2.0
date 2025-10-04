import ProjectCard from "@/components/modules/Project/ProjectCard";
import { Project } from "@/types";



const ProjectPage = async () => {


    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project`, {
        next: {
            tags: ["PROJECT"]
        }
    });
    const data = await res.json();
    console.log(data);

    return (
        <div className="min-h-dvh py-20 px-8 w-11/12 mx-auto">
            <h2 className="text-center font-medium text-2xl pb-10">All Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {
                data?.data?.map((project: Project)=>(

                    <ProjectCard key={project.id} project={project}/>
                ))
              }
            </div>
        </div>
    );
};

export default ProjectPage;