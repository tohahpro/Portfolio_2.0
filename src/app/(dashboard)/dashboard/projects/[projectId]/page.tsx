import UpdateProjectFrom from "@/components/modules/Project/UpdateProjectFrom";

type Props = {
    params: {
        'projectId': string;
    };
};
const UpdateProject = async ({ params }: Props) => {

    const { "projectId" : projectId } = await params;
    

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project/${projectId}`);
    const project = await res.json();

    return (
        <div className="w-full min-h-screen flex items-center">
                <UpdateProjectFrom project={project}/>
        </div>
    );
};

export default UpdateProject;