import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    console.log("Application received:", data);

    return NextResponse.json(
      {
        success: true,
        message: "Application submitted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Application submission error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit application",
      },
      { status: 500 }
    );
  }
}
