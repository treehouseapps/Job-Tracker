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

    const applications = await prisma.application.findMany({
      where: {
        userId: user.userId as string,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json(applications);
  } catch (error) {
    console.error(error);

    return Response.json(
      { message: "Error happened try again" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return Response.json(
        { message: "Unauthorized Account" },
        { status: 401 },
      );
    }

    const data = await request.json();

    const application = await prisma.application.create({
      data: {
        company: data.company,
        jobTitle: data.jobTitle,
        location: data.location,
        status: data.status || "Applied",
        jobUrl: data.jobUrl,
        appliedDate: data.appliedDate ? new Date(data.appliedDate) : null,
        notes: data.notes,
        userId: user.userId as string,
      },
    });

    return Response.json(application, { status: 201 });
  } catch (error) {
    console.error(error);

    return Response.json(
      { message: "Error happened try again" },
      { status: 500 },
    );
  }
}
