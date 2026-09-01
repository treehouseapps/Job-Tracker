import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const applications = await prisma.application.findMany({
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
        userId: data.userId,
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
