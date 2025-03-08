'use server'

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

type UserResponse = {
  status: number;
  user?: {
    id: string;
    clerkId: string;
    email: string;
    name: string;
    profileImage: string | null;
    PurchasedProjects?: { id: string }[];
  };
  error?: string;
};

export async function onAuthenticateUser(): Promise<UserResponse> {
  try {
    const user = await currentUser();

    // Check if the user is authenticated
    if (!user) {
      return { status: 403, error: "User not authenticated" };
    }

    // Check if the user already exists in the database
    const userExist = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
      include: {
        PurchasedProjects: {
          select: {
            id: true,
          },
        },
      },
    });

    // If the user exists, return the user data
    if (userExist) {
      return {
        status: 200,
        user: userExist,
      };
    }

    // Create a new user if they don't exist
    const newUser = await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: `${user.firstName} ${user.lastName}`, // Add space between first and last name
        profileImage: user.imageUrl,
      },
      include: {
        PurchasedProjects: {
          select: {
            id: true,
          },
        },
      },
    });

    // If the new user is created successfully, return the user data
    if (newUser) {
      return { status: 201, user: newUser };
    }

    // If user creation fails, return a 400 status
    return { status: 400, error: "Failed to create user" };
  } catch (err) {
    console.log("Error in onAuthenticateUser:", err);
    return { status: 500, error: "Internal server error" };
  }
}
