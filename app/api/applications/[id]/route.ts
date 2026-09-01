import prisma from "@/lib/prisma";

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(request: Request, { params }: Params) {
  try {
    const { id } = await params;

    const application = await prisma.application.findUnique({
      where: { id },
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
    const data = await request.json();

    const application = await prisma.application.update({
      where: { id },
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
