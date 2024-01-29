const hasDeliveryDistance = (distance: number) :boolean => distance > 0 ;
const calculateDeliveryDistance = (distance: number): number => distance< 1000 ? 2 : Math.ceil(distance/ 500) ;
export const getDeliveryDistanceValue = (distance: number): 
number => hasDeliveryDistance(distance) ? calculateDeliveryDistance(distance) : 2;