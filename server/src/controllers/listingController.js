import prisma from '../config/db.js';

const buildFilterQuery = (query) => {
  const where = {};
  if (query.country) where.audienceCountry = query.country;
  if (query.category) where.category = query.category;
  if (query.verified) where.verified = query.verified === 'true';
  if (query.rightsManager) where.rightsManager = query.rightsManager === 'true';
  if (query.monetization) where.monetization = query.monetization === 'true';

  where.followersCount = {
    gte: Number(query.minFollowers || 0),
    lte: Number(query.maxFollowers || 50000000),
  };

  where.engagementRate = {
    gte: Number(query.minEngagement || 0),
    lte: Number(query.maxEngagement || 100),
  };

  where.price = {
    gte: Number(query.minPrice || 0),
    lte: Number(query.maxPrice || 1000000),
  };

  return where;
};

export const getListings = async (req, res, next) => {
  try {
    const where = buildFilterQuery(req.query);
    const listings = await prisma.listing.findMany({
      where,
      include: { seller: { select: { id: true, name: true } } },
      orderBy: { createdAt: 'desc' },
    });

    return res.json(listings);
  } catch (error) {
    return next(error);
  }
};

export const getFeaturedListings = async (req, res, next) => {
  try {
    const featured = await prisma.listing.findMany({
      orderBy: [{ verified: 'desc' }, { engagementRate: 'desc' }],
      take: 8,
    });

    return res.json(featured);
  } catch (error) {
    return next(error);
  }
};

export const getListingById = async (req, res, next) => {
  try {
    const listing = await prisma.listing.findUnique({
      where: { id: req.params.id },
      include: {
        seller: { select: { id: true, name: true, email: true } },
        screenshots: true,
        reviews: true,
      },
    });

    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    return res.json(listing);
  } catch (error) {
    return next(error);
  }
};

export const createListing = async (req, res, next) => {
  try {
    const listing = await prisma.listing.create({
      data: {
        ...req.body,
        followersCount: Number(req.body.followersCount),
        engagementRate: Number(req.body.engagementRate),
        price: Number(req.body.price),
        reach: Number(req.body.reach),
        avgDailyViews: Number(req.body.avgDailyViews),
        sellerId: req.user.id,
      },
    });

    return res.status(201).json(listing);
  } catch (error) {
    return next(error);
  }
};

export const updateListing = async (req, res, next) => {
  try {
    const listing = await prisma.listing.update({
      where: { id: req.params.id },
      data: req.body,
    });

    return res.json(listing);
  } catch (error) {
    return next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  try {
    await prisma.listing.delete({ where: { id: req.params.id } });
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
};
