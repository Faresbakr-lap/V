import prisma from '../config/db.js';
import { rankRecommendations } from '../utils/recommendationEngine.js';

export const logBrowsingEvent = async (req, res, next) => {
  try {
    const event = await prisma.browsingEvent.create({
      data: {
        userId: req.user.id,
        listingId: req.body.listingId,
        action: req.body.action,
        durationSec: Number(req.body.durationSec || 0),
      },
    });

    return res.status(201).json(event);
  } catch (error) {
    return next(error);
  }
};

export const getRecommendations = async (req, res, next) => {
  try {
    const behavior = await prisma.browsingEvent.findMany({
      where: { userId: req.user.id },
      include: { listing: true },
      orderBy: { createdAt: 'desc' },
      take: 80,
    });

    const listings = await prisma.listing.findMany({
      where: { sellerId: { not: req.user.id } },
      take: 100,
    });

    const ranked = rankRecommendations({ behavior, listings });

    return res.json({
      strategy: 'weighted_behavioral_scoring_v1',
      recommendations: ranked.slice(0, 10),
    });
  } catch (error) {
    return next(error);
  }
};
