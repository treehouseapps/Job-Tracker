import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(request: Request, { params }: Params) {
  try {
    const { id } = await params;

    const user = await getCurrentUser();

    if (!user) {
      return Response.json(
        { message: "Unauthorized Account" },
        { status: 401 },
      );
    }

    const application = await prisma.application.findFirst({
      where: {
        id,
        userId: user.userId as string,
      },
    });

    if (!application) {
      return Response.json(
        { message: "Application not found" },
        { status: 404 },
      );
    }

    return Response.json(application);
  } catch (error) {
    console.error(error);

    return Response.json(
      { message: "Error happened try again" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const { id } = await params;

    const user = await getCurrentUser();

    if (!user) {
      return Response.json(
        { message: "Unauthorized Account" },
        { status: 401 },
      );
    }

    const data = await request.json();

    const check = await prisma.application.findFirst({
      where: {
        id,
        userId: user.userId as string,
      },
    });

    if (!check) {
      return Response.json(
        { message: "Application not found" },
        { status: 404 },
      );
    }

    const application = await prisma.application.update({
      where: {
        id,
      },
      data: {
        company: data.company,
        jobTitle: data.jobTitle,
        location: data.location,
        status: data.status,
        jobUrl: data.jobUrl,
        appliedDate: data.appliedDate ? new Date(data.appliedDate) : null,
        notes: data.notes,
      },
    });

    return Response.json(application);
  } catch (error) {
    console.error(error);

    return Response.json(
      { message: "Error happened try again" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const { id } = await params;

    const user = await getCurrentUser();

    if (!user) {
      return Response.json(
        { message: "Unauthorized Account" },
        { status: 401 },
      );
    }

    const check = await prisma.application.findFirst({
      where: {
        id,
        userId: user.userId as string,
      },
    });

    if (!check) {
      return Response.json(
        { message: "Application not found" },
        { status: 404 },
      );
    }

    await prisma.application.delete({
      where: { id },
    });

    return Response.json({
      message: "Application deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { message: "Error happened try again" },
      { status: 500 },
    );
  }
}
