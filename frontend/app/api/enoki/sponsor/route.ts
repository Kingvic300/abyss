import { EnokiClient } from "@mysten/enoki";
import { NextResponse } from "next/server";

const enokiClient = new EnokiClient({
  apiKey: process.env.ENOKI_PRIVATE_KEY!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(body);
    const { txBytes, sender, network } = body;

    if (!txBytes || !sender) {
      return NextResponse.json(
        { error: "Missing txBytes or sender" },
        { status: 400 }
      );
    }

    const sponsored = await enokiClient.createSponsoredTransaction({
      network: network,
      transactionKindBytes: txBytes,
      sender: sender,
      allowedMoveCallTargets: [
        "0xe7db2d28c7331174d226217ebadcd063d780dfa7caa67323432d0a19b07ac845::abyss::mint_nft",
        "0xe7db2d28c7331174d226217ebadcd063d780dfa7caa67323432d0a19b07ac845::abyss::mint_abyss",
      ],
      allowedAddresses: [sender], //the recipient
    });

    return NextResponse.json({
      bytes: sponsored.bytes,
      digest: sponsored.digest,
    });
  } catch (error) {
    console.error("Sponsor error:", error);

    return NextResponse.json(
      { error: "Failed to sponsor transaction" },
      { status: 500 }
    );
  }
}
