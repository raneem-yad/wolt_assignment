class Order {
  constructor(
    public cartValue: number,
    public numberOfItems: number,
    public deliveryDistance: number,
    public time: Date
  ){}
};

export default Order;