import { NextResponse } from "next/server";
import { createUser, updateUser } from "@/lib/actions/user.actions"; // <- your own actions
import { connectToDatabase } from "@/lib/database/mongoose"; // already set up

export async function POST(req: Request) {
  try {
    const payload = await req.json(); // Clerk webhook body

    const eventType = payload.type;
    const userData = payload.data; // User data from Clerk

    await connectToDatabase();

    if (eventType === "user.created") {
      // For new users, create a user in the database
      await createUser({
        clerkId: userData.id,
        email: userData.email_addresses[0]?.email_address || "", // Ensure correct email
        username: userData.username || userData.first_name || "user", // Default username
        photo: userData.image_url || "", // Image URL
        firstName: userData.first_name || "", // First name
        lastName: userData.last_name || "", // Last name
        creditBalance: 10, // Starting credit balance for new user
      });
    }

    if (eventType === "user.updated") {
      // For user updates, update the user in the database
      await updateUser(userData.id, {
        email: userData.email_addresses[0]?.email_address || "", // Ensure correct email
        username: userData.username || userData.first_name || "user", // Default username
        photo: userData.image_url || "", // Image URL
        firstName: userData.first_name || "", // First name
        lastName: userData.last_name || "", // Last name
        creditBalance: 10, // If you want to update credit balance (or remove if not needed)
      });
    }

    return NextResponse.json({ message: "Webhook received" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Webhook error" }, { status: 500 });
  }
}

