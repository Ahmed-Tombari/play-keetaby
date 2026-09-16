import { redirect } from "next/navigation";

// Server component redirect — no 'use client' needed
export default function TracingIndexPage() {
  redirect("/tracing/alif");
}
