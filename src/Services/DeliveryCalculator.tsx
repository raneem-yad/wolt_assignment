const hasSurchargeValue = (cartValue: number): boolean => cartValue > 0 && cartValue < 10
const calculateSurchargeValue = (cartValue: number): number => 10 - cartValue
export const getSurchargeValue = (cartValue: number): number => hasSurchargeValue(cartValue) ? calculateSurchargeValue(cartValue) : 0