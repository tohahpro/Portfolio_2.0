/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { updateProject } from "@/actions/create";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Project } from "@/types";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import EditorBlock from "../TextEditor/EditorBlock";
import { useState, useEffect } from "react";


const UpdateProjectFrom = ({project}: { project: Project}) => {
    const router = useRouter();
    const [description, setDescription] = useState<any>(null);

    const form = useForm<FieldValues>({
        defaultValues: {
            projectName: project.projectName || '',
            thumbnail: project.thumbnail || '',
            liveLink: project.liveLink || '',
            githubLink: project.githubLink || '',
            features: project.features?.join(', ') || '',
        }
    });

    // Parse existing description if it's JSON, otherwise create a simple text block
    useEffect(() => {
        try {
            const parsedContent = JSON.parse(project.description);
            setDescription(parsedContent);
        } catch {
            setDescription({
                blocks: [
                    {
                        type: "paragraph",
                        data: {
                            text: project.description
                        }
                    }
                ]
            });
        }
    }, [project.description]);

    const onSubmit = async (values: FieldValues) => {
        if (!description) {
            toast.error("Please write some project description!");
            return;
        }

        try {
            const projectData = {
                ...values,
                description: JSON.stringify(description),
                features: values.features?.split(',').map((feature: string) => feature.trim()) || []
            };
            const res = await updateProject(String(project.id), projectData);
            if (res?.id) {
                toast.success("Project updated successfully!");
                router.push("/dashboard/projects");
            }
        } catch (error) {
            toast.error("Project update failed");
            console.error(error);
        }
    };

    return (
        <div className="space-y-6 md:w-4/5 mx-auto bg-white p-8 rounded-lg shadow-md">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <p className="text-center text-2xl font-medium">Update Project</p>

                    {/* Project Name */}
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

                    {/* Features */}
                    <FormField
                        control={form.control}
                        name="features"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Features (comma separated)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="React, Node.js, MongoDB, etc."
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* Project Description */}
                    <div>
                        <FormLabel>Project Description</FormLabel>
                        <EditorBlock 
                            onChange={(data) => setDescription(data)} 
                            data={description} 
                        />
                    </div>

                    {/* Thumbnail */}
                    <FormField
                        control={form.control}
                        name="thumbnail"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Thumbnail URL</FormLabel>
                                <FormControl>
                                    <Input
                                        type="url"
                                        placeholder="Enter thumbnail URL"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* GitHub Link */}
                    <FormField
                        control={form.control}
                        name="githubLink"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>GitHub Link</FormLabel>
                                <FormControl>
                                    <Input
                                        type="url"
                                        placeholder="Enter GitHub repository URL"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* Live Link */}
                    <FormField
                        control={form.control}
                        name="liveLink"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Live Link</FormLabel>
                                <FormControl>
                                    <Input
                                        type="url"
                                        placeholder="Enter live demo URL"
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