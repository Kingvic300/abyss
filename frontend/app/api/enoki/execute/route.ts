import { NextResponse } from "next/server";
import { EnokiClient } from "@mysten/enoki";

const enokiClient = new EnokiClient({
  apiKey: process.env.ENOKI_PRIVATE_KEY!,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { digest, signature } = body;

    // Validation
    if (!digest || !signature) {
      return NextResponse.json(
        { error: "Missing required fields: digest, signature" },
        { status: 400 }
      );
    }

    console.log(`Executing sponsored transaction: ${digest}`);

    const result = await enokiClient.executeSponsoredTransaction({
      digest,
      signature,
    });

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error: any) {
    console.error("Execute sponsored tx error:", error);

    return NextResponse.json(
      {
        error: "Failed to execute transaction",
        details: error?.message ?? "Unknown error",
      },
      { status: 500 }
    );
  }
}
