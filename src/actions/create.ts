"use server";

import { getUserSession } from "@/helpers/getUserSession";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { FieldValues } from "react-hook-form";

export const create = async (data: FormData) => {
    const session = await getUserSession();

    const blogInfo = Object.fromEntries(data.entries());
    console.log(blogInfo);
    const modifiedData = {
        ...blogInfo,
        authorId: session?.user?.id,
        isFeatured: Boolean(blogInfo.isFeatured),
        tags: blogInfo.tags
            .toString()
            .split(',')
            .map(tag => tag.trim())
    };
    console.log(modifiedData);
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(modifiedData)
    });

    const result = await res.json();
    if (result?.id) {
        revalidateTag('BLOGS');
        redirect('/');
    }
    return result;
}


export const updateBlog = async (postId: string, data: FieldValues) => {
 
    const session = await getUserSession();
    const updatedData = {
      ...data,
      authorId: session?.user?.id,
      isFeatured: Boolean(data.isFeatured),
      tags: data.tags
        ?.toString()
        .split(",")
        .map((tag: string) => tag.trim()) || [],
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post/${postId}`, {
      method: "PATCH", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData)
    });

    if (!res.ok) {
      throw new Error("Update blog Failed");
    }

    const result = await res.json();
    revalidateTag("BLOGS");
    return result;
  
};


export const project = async (data: FieldValues) => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const result = await res.json();
    console.log(result);

    if (result?.id) {
        revalidateTag('PROJECT');
        redirect('/');
    }
    return result;
}


export const updateProject = async (projectId: string, data: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project/${projectId}`, {
      method: "PATCH", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (result?.id) {
      revalidateTag("PROJECT");
    }

    return result;
  } catch (error) {
    console.error("Update failed", error);
    throw new Error("Failed to update project.");
  }
};


export const deleteProject = async (projectId: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project/${projectId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Project delete field");
    }

    const result = await res.json();    
    revalidateTag("PROJECT");

    return result; 
  } catch (error) {
    console.error("Delete failed", error);
    throw new Error("Project delete field");
  }
};