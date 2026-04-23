export const rankRecommendations = ({ behavior, listings }) => {
  const categoryWeight = new Map();
  const countryWeight = new Map();

  behavior.forEach((event) => {
    const base = event.action === 'VIEW' ? 1 : event.action === 'FAVORITE' ? 3 : 2;
    const weight = base + Math.min(event.durationSec / 20, 5);

    categoryWeight.set(event.listing.category, (categoryWeight.get(event.listing.category) || 0) + weight);
    countryWeight.set(event.listing.audienceCountry, (countryWeight.get(event.listing.audienceCountry) || 0) + weight);
  });

  return listings
    .map((listing) => {
      const score =
        (categoryWeight.get(listing.category) || 0) * 1.6 +
        (countryWeight.get(listing.audienceCountry) || 0) * 1.3 +
        (listing.engagementRate > 5 ? 1.2 : 0.3) +
        (listing.verified ? 1.1 : 0.2);

      return { ...listing, recommendationScore: Number(score.toFixed(2)) };
    })
    .sort((a, b) => b.recommendationScore - a.recommendationScore);
};
