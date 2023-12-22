import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  // 参考としてデフォルト記載を残しておく

  /*   create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.post.create({
        data: {
          name: input.name,
        },
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }), */

  // Subscription table
  getAllSubscription: publicProcedure.query(() => {
    return db.subscription.findMany();
  }),

  postSubscription: publicProcedure
    .input(
      z.object({
        name: z.string(),
        overview: z.string(),
        fee: z.number(),
        billingType: z.string(),
        billingInterval: z.number(),
        url: z.string(),
        contracted_at: z.date(),
        image: z.string(),
      }),
    )
    .mutation((req) => {
      const postSubscription = db.subscription.create({
        data: {
          name: req.input.name,
          overview: req.input.overview,
          fee: req.input.fee,
          billingType: req.input.billingType,
          billingInterval: req.input.billingInterval,
          url: req.input.url,
          contracted_at: req.input.contracted_at,
          image: req.input.image,
        },
      });
      return postSubscription;
    }),

  getDetailSubscription: publicProcedure
    .input(z.object({ id: z.number() }))
    .query((req) => {
      return db.subscription.findUnique({ where: { id: req.input.id } });
    }),

  deleteSubscription: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation((req) => {
      return db.subscription.delete({ where: { id: req.input.id } });
    }),

  // Impression table
  getAllImpression: publicProcedure.query(() => {
    return db.impression.findMany();
  }),

  postImpression: publicProcedure
    .input(
      z.object({
        subscription_id: z.number(),
        comment: z.string(),
        rating: z.number(),
      }),
    )
    .mutation((req) => {
      const postSubscription = db.impression.create({
        data: {
          subscription_id: req.input.subscription_id,
          comment: req.input.comment,
          rating: req.input.rating,
        },
      });
      return postSubscription;
    }),

  getDetailImpression: publicProcedure
    .input(z.object({ id: z.number() }))
    .query((req) => {
      return db.impression.findUnique({
        where: { impression_id: req.input.id },
      });
    }),

  deleteImpression: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation((req) => {
      return db.impression.delete({ where: { impression_id: req.input.id } });
    }),
});
