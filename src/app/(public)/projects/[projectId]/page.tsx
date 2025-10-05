import ProjectDetailsCard from "@/components/modules/Project/ProjectDetailsCard";
import { Metadata } from "next";

type Props = {
    params: {
        'projectId': string;
    };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { projectId } = await params
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project/${projectId}`);
    const project = await res.json();
    console.log(project);

    if (!project) {
        return {
            title: "Projects",
            description: "The requested project could not be found.",
        };
    }
    return {
        title: `${project.projectName} | Projects`,
        description: `Explore the ${project.title} project in detail, including features, technologies used, and outcomes.`,
    };
}
const projectDetailsPage = async ({ params }: Props) => {

    const { projectId } = await params

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project/${projectId}`);
    const project = await res.json();

    return (
        <div className="px-4 mx-auto">
            <ProjectDetailsCard project={project} />
        </div>
    );
};

export default projectDetailsPage;