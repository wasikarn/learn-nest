import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();
const publicProcedure = t.procedure;

const appRouter = t.router({
  products: t.router({
    getProduct: publicProcedure.input(z.object({ id: z.string() })).output(z.object({
      details: z.object({
        description: z.string().optional(),
        rating: z.number().optional(),
      }),
      id: z.string(),
      name: z.string(),
      price: z.number(),
    })).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    getProducts: publicProcedure.output(z.array(z.object({
      details: z.object({
        description: z.string().optional(),
        rating: z.number().optional(),
      }),
      id: z.string(),
      name: z.string(),
      price: z.number(),
    }))).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    updateProduct: publicProcedure.input(z.object({
      data: z.object({
        details: z.object({
          description: z.string().optional(),
          rating: z.number().optional(),
        }),
        id: z.string(),
        name: z.string(),
        price: z.number(),
      }).partial(),
      id: z.string(),
    })).output(z.object({
      details: z.object({
        description: z.string().optional(),
        rating: z.number().optional(),
      }),
      id: z.string(),
      name: z.string(),
      price: z.number(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    createProduct: publicProcedure.input(z.object({
      details: z.object({
        description: z.string().optional(),
        rating: z.number().optional(),
      }),
      id: z.string(),
      name: z.string(),
      price: z.number(),
    })).output(z.object({
      details: z.object({
        description: z.string().optional(),
        rating: z.number().optional(),
      }),
      id: z.string(),
      name: z.string(),
      price: z.number(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    deleteProduct: publicProcedure.input(z.object({ id: z.string() })).output(z.boolean()).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  })
});
export type AppRouter = typeof appRouter;

