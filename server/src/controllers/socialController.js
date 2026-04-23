import prisma from '../config/db.js';

export const toggleFavorite = async (req, res, next) => {
  try {
    const { listingId } = req.body;
    const existing = await prisma.favorite.findUnique({
      where: { userId_listingId: { userId: req.user.id, listingId } },
    });

    if (existing) {
      await prisma.favorite.delete({ where: { id: existing.id } });
      return res.json({ favorited: false });
    }

    await prisma.favorite.create({ data: { userId: req.user.id, listingId } });
    return res.json({ favorited: true });
  } catch (error) {
    return next(error);
  }
};

export const getFavorites = async (req, res, next) => {
  try {
    const favorites = await prisma.favorite.findMany({
      where: { userId: req.user.id },
      include: { listing: true },
    });

    return res.json(favorites);
  } catch (error) {
    return next(error);
  }
};

export const sendMessage = async (req, res, next) => {
  try {
    const message = await prisma.message.create({
      data: {
        senderId: req.user.id,
        receiverId: req.body.receiverId,
        content: req.body.content,
        listingId: req.body.listingId,
      },
    });

    return res.status(201).json(message);
  } catch (error) {
    return next(error);
  }
};

export const getConversations = async (req, res, next) => {
  try {
    const messages = await prisma.message.findMany({
      where: {
        OR: [{ senderId: req.user.id }, { receiverId: req.user.id }],
      },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    return res.json(messages);
  } catch (error) {
    return next(error);
  }
};

export const createReview = async (req, res, next) => {
  try {
    const review = await prisma.review.create({
      data: {
        rating: Number(req.body.rating),
        comment: req.body.comment,
        listingId: req.body.listingId,
        buyerId: req.user.id,
        sellerId: req.body.sellerId,
      },
    });

    return res.status(201).json(review);
  } catch (error) {
    return next(error);
  }
};
