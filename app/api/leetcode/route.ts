import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://leetcode-api-faisalshohag.vercel.app/dumbbcat", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error("failed");
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({
      totalSolved: 200,
      easySolved: 95,
      mediumSolved: 85,
      hardSolved: 20,
      totalEasy: 858,
      totalMedium: 1798,
      totalHard: 779,
      acceptanceRate: 62.5,
      ranking: 0,
    });
  }
}