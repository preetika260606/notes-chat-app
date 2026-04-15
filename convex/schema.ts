import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  documents: defineTable({
    title: v.string(),
    parentDocument: v.union(v.id("documents"), v.null()),
    userId: v.string(),
    isArchived: v.boolean(),
    isPublished: v.boolean(),
    createdAt: v.optional(v.number()), // ✅ IMPORTANT FIX
  })
    .index("by_user_parent", ["userId", "parentDocument"]),
});