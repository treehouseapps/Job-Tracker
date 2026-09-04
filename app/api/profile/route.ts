import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return Response.json(
        { message: "Unauthorized Account" },
        { status: 401 },
      );
    }

    const profile = await prisma.user.findUnique({
      where: {
        id: user.userId as string,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    if (!profile) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    return Response.json(profile);
  } catch (error) {
    console.error(error);

    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return Response.json(
        { message: "Unauthorized Account" },
        { status: 401 },
      );
    }

    const { name, email } = await request.json();

    if (!name || !email) {
      return Response.json(
        { message: "Name and email are required" },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        email,
        NOT: {
          id: user.userId as string,
        },
      },
    });

    if (existingUser) {
      return Response.json(
        { message: "Email already exists" },
        { status: 400 },
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: user.userId as string,
      },
      data: {
        name,
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return Response.json(updatedUser);
  } catch (error) {
    console.error(error);

    return Response.json({ message: "Something is wrong" }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return Response.json(
        { message: "Unauthorized Account" },
        { status: 401 },
      );
    }

    await prisma.user.delete({
      where: {
        id: user.userId as string,
      },
    });

    const response = Response.json({
      message: "Account deleted successfully",
    });

    return response;
  } catch (error) {
    console.error(error);

    return Response.json({ message: "Something is wrong" }, { status: 500 });
  }
}
