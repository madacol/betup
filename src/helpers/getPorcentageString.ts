export function getPercentageString (probability: number): string {
    const roundedProbability = Math.floor(probability*10000)/10000
    const percentage = (roundedProbability*100).toFixed(2)||0;
    return `${percentage}%`;
}