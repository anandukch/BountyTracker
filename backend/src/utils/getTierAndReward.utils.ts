export function getCurrentTier(totalBounty: number): string {
	if (totalBounty < 500) return "Bronze";

	if (totalBounty < 1000) return "Silver";

	if (totalBounty < 2000) return "Gold";

	return "Platinum";
}

export function getReward(tier: string): number {
	switch (tier) {
		case "Silver":
			return 100;
			break;
		case "Gold":
			return 500;
			break;
		case "Platinum":
			return 1000;
			break;
	}
}
