const { z } = require('zod');

const uuid = z.string().uuid();

const createGameSchema = z.object({
  categoryId: uuid,
  title: z.string().min(2).max(120),
  slug: z.string().min(2).max(140).optional(),
  description: z.string().max(2000).optional(),
  difficulty: z.enum(['easy', 'med', 'hard']).optional(),
  isPublished: z.boolean().optional(),
});

const updateGameSchema = createGameSchema.partial();

const createLevelSchema = z.object({
  title: z.string().min(1).max(120),
  levelOrder: z.number().int().nonnegative(),
  isPublished: z.boolean().optional(),
});

const updateLevelSchema = createLevelSchema.partial();

module.exports = {
  uuid,
  createGameSchema,
  updateGameSchema,
  createLevelSchema,
  updateLevelSchema,
};
