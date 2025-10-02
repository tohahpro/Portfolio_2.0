"use client";

import { updateBlog } from '@/actions/create';
import { Post } from '@/types';
import Form from 'next/form'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';


export default function UpdateBlogForm({ blog }: { blog: Post }) {
    const [isFeatured, setIsFeatured] = useState("false");

    const defaultBlog = {
        title: blog.title,
        content: blog.content,
        thumbnail: blog.thumbnail,
        tags: blog.tags,
        isFeatured: blog.isFeatured,
    };

    const router = useRouter()

    const handleUpdate = async (formData: FormData) => {
        try {
            const values = Object.fromEntries(formData.entries());
            const data = {
                ...values,
                isFeatured: isFeatured,
            };
            const res = await updateBlog(String(blog.id), data);
            if (res?.id) {
                toast.success("Blog updated successfully!");
                router.push("/dashboard/blogs");
            } else {
                toast.error("Failed to update blog");
            }
        } catch (error) {
            toast.error("Something went wrong while updating the blog");
            console.error(error);
        }
    };



    return (
        <Form
            action={handleUpdate}
            className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-4 w-full"
        >
            <h2 className="text-xl font-semibold mb-4 text-center">Update Blog</h2>

            {/* Title */}
            <div>
                <label className="block text-sm font-medium mb-1" htmlFor="title">
                    Title
                </label>
                <input
                    type="text"
                    defaultValue={defaultBlog.title}
                    id="title"
                    name="title"
                    className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
                />
            </div>

            {/* Content */}
            <div>
                <label className="block text-sm font-medium mb-1" htmlFor="content">
                    Content
                </label>
                <textarea
                    id="content"
                    defaultValue={defaultBlog.content}
                    name="content"
                    rows={6}
                    className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
                />
            </div>

            {/* Thumbnail */}
            <div>
                <label className="block text-sm font-medium mb-1" htmlFor="thumbnail">
                    Thumbnail URL
                </label>
                <input
                    type="url"
                    defaultValue={defaultBlog.thumbnail}
                    id="thumbnail"
                    name="thumbnail"
                    className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
                />
            </div>

            {/* Tags */}
            <div>
                <label className="block text-sm font-medium mb-1" htmlFor="tags">
                    Tags (comma separated)
                </label>
                <input
                    type="text"
                    defaultValue={defaultBlog.tags}
                    id="tags"
                    name="tags"
                    placeholder="Next.js, React, Web Development"
                    className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
                />
            </div>

            {/* Featured */}
            <div>
                <p className="block text-sm font-medium mb-1">Featured</p>
                <div className="flex gap-6">
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="isFeatured"
                            value="true"
                            checked={isFeatured === "true"}
                            onChange={(e) => setIsFeatured(e.target.value)}
                            className="text-blue-600 focus:ring-blue-500"
                        />
                        Yes
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="isFeatured"
                            value="false"
                            checked={isFeatured === "false"}
                            onChange={(e) => setIsFeatured(e.target.value)}
                            className="text-blue-600 focus:ring-blue-500"
                        />
                        No
                    </label>
                </div>
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition"
            >
                Submit
            </button>
        </Form>
    );
}