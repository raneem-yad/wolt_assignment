class Order {
  constructor(
    public cartValue: number,
    public numberOfItems: number,
    public deliveryDistance: number,
    time: Date
  ){}
};

export default Order;