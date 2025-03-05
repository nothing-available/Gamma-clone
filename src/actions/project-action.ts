"use server";

import { prisma } from "@/lib/prisma";
import { onAuthenticateUser } from "./user";

export async function getAllProjects() {
  try {
    // Authenticate the user
    const checkUser = await onAuthenticateUser();

    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User not authenticated." };
    }

    // Fetch projects for the authenticated user
    const projects = await prisma.project.findMany({
      where: {
        userId: checkUser.user.id,
        isDeleted: false,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    // Handle no projects found
    if (projects.length === 0) {
      return { status: 404, error: "No projects found." };
    }

    // Return the projects
    return { status: 200, data: projects };
  } catch (err) {
    console.error("Error in getAllProjects:", err);
    return { status: 500, error: "An unexpected error occurred." };
  }
}

export async function getRecentProjects() {
  try {
    const checkUser = await onAuthenticateUser();

    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "user not authenticate" };
    }

    const projects = await prisma.project.findMany({
      where: {
        userId: checkUser.user.id,
        isDeleted: false,
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: 5,
    });

    if (projects.length === 0) {
      return {
        status: 404,
        error: "No recent projects available",
      };
    }
    return { status: 200, data: projects };
  } catch (err) {
    console.error("Error in getRecentProjects:", err);
    return { status: 500, error: "An unexpected error occurred." };
  }
}

export async function recoverProject(projectId: string) {
  try {
    const checkUser = await onAuthenticateUser();

    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "user not authenticate" };
    }

    const updateProject = await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        isDeleted: false,
      },
    });

    if (!updateProject) {
      return { status: 500, error: "Failed to recover project" };
    }

    return { status: 200, data: updateProject };
  } catch (err) {
    console.error("Errorin recoverProject:", err);
    return { status: 500, error: "An unexpected error occurred." };
  }
}
