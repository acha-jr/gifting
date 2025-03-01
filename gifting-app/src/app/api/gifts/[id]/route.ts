import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const { sender, recipient } = await req.json();

    if (!sender || !recipient) {
      return NextResponse.json({ message: "Sender and recipient are required" }, { status: 400 });
    }

    // Simulate storing the gift in a database
    console.log(`Gift sent! Property ID: ${params.id}, Sender: ${sender}, Recipient: ${recipient}`);

    return NextResponse.json({ message: "Gift sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error handling request:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}