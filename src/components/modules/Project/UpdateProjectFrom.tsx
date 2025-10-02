"use client";

import { updateProject } from "@/actions/create";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Project } from "@/types";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";


const UpdateProjectFrom = ({project}: { project: Project}) => {
    
    const router = useRouter();

    const form = useForm<FieldValues>({
        defaultValues: {
            projectName : project.projectName || '',
            thumbnail: project.thumbnail || '',
            liveLink: project.liveLink || '',
            githubLink: project.githubLink || '',
        }
    })

    const onSubmit = async (values: FieldValues) => {


        try {
            const res = await updateProject(String(project.id), values);
            if (res?.id) {
                toast.success("Update Successfully.")
                router.push("/dashboard/projects");
            }
        } catch (error) {
            toast.error("Update Failed")
            console.error(error);
        }
    }

    return (
        <div className="space-y-6 md:w-4/5 mx-auto bg-white p-8 rounded-lg shadow-md">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <p className="text-center text-2xl font-medium">Update Project</p>

                    {/* Name */}
                    <FormField
                        control={form.control}
                        name="projectName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Project Name</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Enter project name"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {/* Name */}
                    <FormField
                        control={form.control}
                        name="thumbnail"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Photo Url</FormLabel>
                                <FormControl>
                                    <Input
                                        type="url"
                                        placeholder="Enter photo url"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {/* Name */}
                    <FormField
                        control={form.control}
                        name="githubLink"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Github Link</FormLabel>
                                <FormControl>
                                    <Input
                                        type="url"
                                        placeholder="Enter github url"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {/* Name */}
                    <FormField
                        control={form.control}
                        name="liveLink"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Live Link</FormLabel>
                                <FormControl>
                                    <Input
                                        type="url"
                                        placeholder="Enter live url"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full mt-2">
                        Submit
                    </Button>
                </form>
            </Form>
        </div>

    );
};

export default UpdateProjectFrom;