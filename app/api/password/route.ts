import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { getCurrentUser } from "@/lib/auth";

export async function PUT(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return Response.json(
        { message: "Unauthorized Account" },
        { status: 401 },
      );
    }

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return Response.json({ message: "Enter all fields" }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return Response.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 },
      );
    }

    const account = await prisma.user.findUnique({
      where: {
        id: user.userId as string,
      },
    });

    if (!account) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    const passwordMatch = await bcrypt.compare(
      currentPassword,
      account.password,
    );

    if (!passwordMatch) {
      return Response.json(
        { message: "Old password is incorrect" },
        { status: 401 },
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: {
        id: account.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return Response.json({
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error(error);

    return Response.json({ message: "Something is wrong" }, { status: 500 });
  }
}
