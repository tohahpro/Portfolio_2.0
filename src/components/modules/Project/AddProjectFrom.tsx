/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { project } from "@/actions/create";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import EditorBlock from "../TextEditor/EditorBlock";
import { useState } from "react";


const AddProjectFrom = () => {
    const form = useForm<FieldValues>();
    const [description, setDescription] = useState<any>(null);

    const onSubmit = async (values: FieldValues) => {
        if (!description) {
            toast.error("Please write some project description!");
            return;
        }

        const projectData = {
            ...values,
            description: JSON.stringify(description)
        };
        console.log(projectData);
        const res = await project(projectData);
        if (res) {
            toast.success("Project created successfully!");
        }

    };

    return (
        <div className="space-y-6 md:w-4/5 mx-auto bg-white p-8 rounded-lg shadow-md">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <p className="text-center text-2xl font-medium">Add Project</p>

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

export default AddProjectFrom;