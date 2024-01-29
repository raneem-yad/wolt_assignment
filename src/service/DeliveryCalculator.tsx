const hasSurchargeValue = (cartValue: number): boolean => cartValue > 0 && cartValue < 10
const calculateSurchargeValue = (cartValue: number): number => 10 - cartValue
export const getSurchargeValue = (cartValue: number): number =>
    hasSurchargeValue(cartValue) ? calculateSurchargeValue(cartValue) : 0


// surcharge with number of items
// add surcharge according to number of items
const hasSurchargePerNumberOfItemsValue = (numOfItems: number): boolean => numOfItems > 4
const calculateSurchargePerNumberOfItemsValue = (numOfItems: number): number => (numOfItems - 4) * 0.50
const getSurchargePerNumberOfItemsValue = (numOfItems: number): number =>
    hasSurchargePerNumberOfItemsValue(numOfItems) ? calculateSurchargePerNumberOfItemsValue(numOfItems) : 0;


// add bulk fee according to number of items
const hasBulkFeeValue = (numOfItems: number): boolean => numOfItems > 12
const calculateBulkFeeValue = (): number => 1.20;
const getBulkFeeValue = (numOfItems: number): number =>
    hasBulkFeeValue(numOfItems) ? calculateBulkFeeValue() : 0;

// surcharge according to number of items + bulk fee according to number of items
export const getNumberOfItemsFeeValue = (numOfItems: number): number =>
    getBulkFeeValue(numOfItems) + getSurchargePerNumberOfItemsValue(numOfItems);
