import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET commentaires
export async function GET() {
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: "desc" },
  });

  return Response.json(reviews);
}

// POST commentaire
export async function POST(req) {
  const body = await req.json();

  const review = await prisma.review.create({
    data: {
      userName: body.userName,
      comment: body.comment,
    },
  });

  return Response.json(review);
}