export function calcRatingAverage(rating, isFavorite) {
    if (!rating || Object.values(rating).length === 0) return 0;
    let average = Object.values(rating).reduce((a, b) => a + b, 0) / Object.values(rating).length;
    if (isFavorite && average === 10) { average += 1; }
    return average;
}