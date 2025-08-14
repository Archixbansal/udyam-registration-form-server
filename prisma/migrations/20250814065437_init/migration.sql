-- CreateTable
CREATE TABLE "public"."Submission" (
    "id" TEXT NOT NULL,
    "aadhaar" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "organizationType" TEXT NOT NULL,
    "pan" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);
