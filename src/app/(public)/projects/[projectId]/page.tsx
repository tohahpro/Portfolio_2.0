import ProjectDetailsCard from "@/components/modules/Project/ProjectDetailsCard";

type Props = {
    params: {
        'projectId': string;
    };
};
const projectDetailsPage = async ({ params }: Props) => {

    const { projectId } = await params

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project/${projectId}`);
    const project = await res.json();

    console.log(project);
    return (
        <div className="px-4 mx-auto">            
            <ProjectDetailsCard project={project} />
        </div>
    );
};

export default projectDetailsPage;