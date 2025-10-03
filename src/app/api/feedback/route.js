import db from "@/lib/utils/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const contentType = request.headers.get("content-type") || "";

    let data = {};

    if (contentType.includes("application/json")) {
      data = await request.json();
    } else if (contentType.includes("form")) {
      const formData = await request.formData();
      data = Object.fromEntries(formData.entries());
    } else {
      return NextResponse.json(
        {
          success: false,
          errors: { root: "Unsupported content type" },
        },
        { status: 415 }
      );
    }

    if (!data.name || !data.email || !data.feedback) {
      return NextResponse.json(
        { success: false, errors: { root: "All fields are required" } },
        { status: 400 }
      );
    }

    const feedback = await db.feedback.create({
      data: {
        name: data.name,
        email: data.email,
        feedback: data.feedback,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Feedback successfully submitted",
        data: feedback,
      },
      { status: 201 }
    );
  } catch (reason) {
    const message =
      reason instanceof Error ? reason.message : "Something went wrong!";
    return NextResponse.json(
      { success: false, errors: { root: message } },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const feedbacks = await db.feedback.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(feedbacks, { status: 200 });
  } catch (reason) {
    const message =
      reason instanceof Error ? reason.message : "Something went wrong!";
    return NextResponse.json(
      { success: false, errors: { root: message } },
      { status: 500 }
    );
  }
}
