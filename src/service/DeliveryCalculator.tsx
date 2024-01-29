import Order from "../model/Orders";

// ************ Cart Value Fee ************ //
const hasSurchargeValue = (cartValue: number): boolean => cartValue > 0 && cartValue < 10
const calculateSurchargeValue = (cartValue: number): number => 10 - cartValue
export const getSurchargeValue = (cartValue: number): number =>
    hasSurchargeValue(cartValue) ? calculateSurchargeValue(cartValue) : 0


// ************ DeliveryDistance Fee ************ //
const hasDeliveryDistance = (distance: number): boolean => distance > 0;
const calculateDeliveryDistance = (distance: number): number =>
    distance < 1000 ? 2 : Math.ceil(distance / 500);
export const getDeliveryDistanceValue = (distance: number): number =>
    hasDeliveryDistance(distance) ? calculateDeliveryDistance(distance) : 2;



// ************ surcharge with number of items ************ //
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


// ************ all fees without the Rush hours ************ //
// calucate all the previous fees
// TODO: test
export const getAllFeesWithoutRushHours = (cartValue: number, distance: number, numOfItems: number): number =>
    getSurchargeValue(cartValue) + getDeliveryDistanceValue(distance) + getNumberOfItemsFeeValue(numOfItems);

// ************ Fees in Ruch Hours ************ //
// Date().getDay() == 5 // that means it's friday
// Date().getHours() >= 15 && Date().getHours()<= 19 [3pm -7pm]
// TODO: test
const FRIDAY = 5;
const rushHoursFactor = 1.2;
const inRushHour = (time: Date) => time.getHours() >= 15 && time.getHours() <= 19;
const hasRushHours = (time: Date): boolean => time.getDay() == FRIDAY && inRushHour(time)
const partialyFeeValue =(order: Order): number=> getAllFeesWithoutRushHours(order.cartValue, order.deliveryDistance, order.numberOfItems);
export const getTotalFee = (order: Order): number =>
    hasRushHours(order.time) ? rushHoursFactor * partialyFeeValue(order) : partialyFeeValue(order) ;


// ************ Check Total Fees  bigger than 15€ ************ //
//The delivery fee can never be more than 15€, including possible surcharges.
// TODO: test
const calucateTotalFeeLimit = (order: Order): number =>
getTotalFee(order) > 15 ? 15 : getTotalFee(order);





    // export const abdallahGetAllFeesWithoutRushHourss = (
    //     order: Order, 
    //     surchargeFun: (x:number)=> number,
    //     deliveryDistanceFun: (x:number)=> number,
    //     numberOfItemsFeeFun: (x:number)=> number
    // ) : number => surchargeFun(order.cartValue) + deliveryDistanceFun(order.deliveryDistance) + numberOfItemsFeeFun(order.numberOfItems)
    
    // export const abdallahGetAllFeesWithRushHourss = (
    //     partialyFee: number,
    //     time: Date,
    //     hasRushHours: (x:Date) => boolean,
    // ) : number => hasRushHours(time) ? rushHoursFactor * partialyFee : partialyFee;
      