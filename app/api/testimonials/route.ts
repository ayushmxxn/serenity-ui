import { Client } from "@notionhq/client";
import { NextRequest, NextResponse } from "next/server";

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_API_TOKEN,
});

interface Testimonial {
  name: string;
  profession: string;
  text: string;
  socialPlatform: string;
  socialHandle: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: Testimonial = await request.json();

    // Validate required fields
    if (
      !body.name ||
      !body.profession ||
      !body.text ||
      !body.socialPlatform ||
      !body.socialHandle
    ) {
      return NextResponse.json(
        {
          error:
            "All fields (name, profession, testimonial, social platform, and social handle) are required.",
        },
        { status: 400 }
      );
    }

    // Validate URL format
    const urlValidation: Record<string, RegExp> = {
      twitter: /^https:\/\/(www\.)?(twitter\.com|x\.com)\/[a-zA-Z0-9_]+\/?$/,
      github: /^https:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+\/?$/,
      linkedin:
        /^https:\/\/(www\.)?linkedin\.com\/(in|pub)\/[a-zA-Z0-9_-]+\/?$/,
      instagram: /^https:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_.]+\/?$/,
      facebook: /^https:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9.]+\/?$/,
      discord: /^https:\/\/(www\.)?discord\.(gg|com)\/[a-zA-Z0-9_-]+\/?$/,
      reddit: /^https:\/\/(www\.)?reddit\.com\/(u|user)\/[a-zA-Z0-9_-]+\/?$/,
    };

    if (!urlValidation[body.socialPlatform].test(body.socialHandle)) {
      return NextResponse.json(
        {
          error: `Invalid ${
            body.socialPlatform
          } URL. Please use a valid profile URL (e.g., https://${
            body.socialPlatform === "twitter" ? "x.com" : body.socialPlatform
          }.com/username).`,
        },
        { status: 400 }
      );
    }

    // Create a new page in Notion database
    await notion.pages.create({
      parent: { database_id: process.env.NOTION_DATABASE_ID! },
      properties: {
        Name: { title: [{ text: { content: body.name } }] },
        Profession: { rich_text: [{ text: { content: body.profession } }] },
        Testimonial: { rich_text: [{ text: { content: body.text } }] },
        "Social Platform": { select: { name: body.socialPlatform } },
        "Social Handle": { url: body.socialHandle },
      },
    });

    return NextResponse.json(
      { message: "Testimonial submitted successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error submitting testimonial:", error);

    let errorMessage = "Failed to submit testimonial due to an unknown error.";
    let statusCode = 500;

    if (error.code === "unauthorized") {
      errorMessage =
        "Unauthorized: Invalid API token or insufficient permissions. Please check NOTION_API_TOKEN and ensure the integration has access to the database.";
      statusCode = 401;
    } else if (error.code === "validation_error") {
      errorMessage = `Validation error: ${error.message}. Check the database schema and input data.`;
      statusCode = 400;
    } else if (error.code === "rate_limited") {
      errorMessage = "Rate limited: Too many requests. Please try again later.";
      statusCode = 429;
    } else if (error.code === "object_not_found") {
      errorMessage =
        "Database not found: Please verify NOTION_DATABASE_ID is correct and the database exists.";
      statusCode = 404;
    } else if (error.message) {
      errorMessage = `Error: ${error.message}`;
    }

    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}
