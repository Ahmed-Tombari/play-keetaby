const slugify = require('slugify');
const { z } = require('zod');
const prisma = require('../lib/prisma');

const categorySchema = z.object({
  name: z.string().min(1).max(80),
  slug: z.string().min(1).max(100).optional(),
  icon: z.string().max(50).optional(),
});

async function listCategories(req, res, next) {
  try {
    const categories = await prisma.category.findMany({
      include: { _count: { select: { games: true } } },
      orderBy: { createdAt: 'asc' },
    });
    res.json(categories);
  } catch (err) {
    next(err);
  }
}

async function getCategory(req, res, next) {
  try {
    const category = await prisma.category.findUnique({
      where: { id: req.params.id },
      include: { games: { where: { isPublished: true } } },
    });
    if (!category) return res.status(404).json({ error: 'Catégorie introuvable' });
    res.json(category);
  } catch (err) {
    next(err);
  }
}

async function createCategory(req, res, next) {
  try {
    const data = categorySchema.parse(req.body);
    const slug = slugify(data.slug || data.name, { lower: true });
    const category = await prisma.category.create({ data: { ...data, slug } });
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
}

async function updateCategory(req, res, next) {
  try {
    const data = categorySchema.partial().parse(req.body);
    if (data.slug) data.slug = slugify(data.slug, { lower: true });
    const category = await prisma.category.update({
      where: { id: req.params.id },
      data,
    });
    res.json(category);
  } catch (err) {
    next(err);
  }
}

async function deleteCategory(req, res, next) {
  try {
    await prisma.category.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { listCategories, getCategory, createCategory, updateCategory, deleteCategory };
