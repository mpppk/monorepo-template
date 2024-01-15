"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function getCount() {
  console.log("getCount");
  const prisma = new PrismaClient();
  const countRow = await prisma.count.findFirst();
  console.log("countRow", countRow);
  return countRow?.count ?? 0;
}

export async function setCount(count: number, path?: string) {
  const prisma = new PrismaClient();
  const updatedCount = await prisma.count.update({
    where: { id: "clrdl2bev0000wwvx19oz79ac" },
    data: { count },
  });
  console.log("count", updatedCount);
  if (path) {
    revalidatePath(path);
  }
  return updatedCount.count;
}
