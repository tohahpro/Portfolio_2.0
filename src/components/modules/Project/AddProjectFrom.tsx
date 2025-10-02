"use client";

import { project } from "@/actions/create";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";


const AddProjectFrom = () => {
    const form = useForm<FieldValues>()

    const onSubmit = async (values: FieldValues) => {

        try {
            const res = await project(values);
            if (res?.id) {
                toast.success("User Login Successfully.")
            }
        } catch (error) {
            toast.error("User Login Failed")
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
                    <p className="text-center text-2xl font-medium">Add Project</p>

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
                                        placeholder="Enter your email"
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
                                        placeholder="Enter your email"
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
                                        placeholder="Enter your email"
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
                                        placeholder="Enter your email"
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