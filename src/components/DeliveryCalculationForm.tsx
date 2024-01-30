import '../styles/DeliveryCalculationForm.css';
import Orders from '../model/Orders';
import React, { useRef, useState } from 'react';
import Order from '../model/Orders';
import { calucateTotalFeeLimit } from '../service/DeliveryCalculator';


function DeliveryCalculationForm() {

  const [deliveryFee, setDeliveryFee] = useState(0);
  const cartValueRef = useRef<HTMLInputElement>(null);
  const deliveryDistanceRef = useRef<HTMLInputElement>(null);
  const numberOfItemsRef = useRef<HTMLInputElement>(null);
  const deliveryDateRef = useRef<HTMLInputElement>(null);

  const calculateDeliveryFee = (): void => {
    const cartValue = cartValueRef.current ? parseFloat(cartValueRef.current.value) : 0;
    const numberOfItems = numberOfItemsRef.current ? parseInt(numberOfItemsRef.current.value, 10) : 0;
    const deliveryDistance = deliveryDistanceRef.current ? parseInt(deliveryDistanceRef.current.value, 10) : 0;
    const deliveryDate = deliveryDateRef.current ? new Date(deliveryDateRef.current.value) : new Date();
    const deliveryDateTime = `${deliveryDate}TZ${new Date().toLocaleTimeString()}`
    alert(deliveryDate.getHours())
    if (cartValue >= 200) {
      setDeliveryFee(0);
    } else {
      const order = new Order(cartValue, numberOfItems, deliveryDistance, deliveryDate);
      const calculatedFee = calucateTotalFeeLimit(order);
      setDeliveryFee(calculatedFee);
    }
  };

  const addButtonClickHandler = (event: React.FormEvent): void => {
    event.preventDefault();
    calculateDeliveryFee();
  };

  //change the form later 
  return (
    <section className='formSection'>

      <div className='formSection_content'>
        <form className='deliveryCalculationForm' onSubmit={addButtonClickHandler}>
          <div className='inputSection'>
            <label htmlFor="cart_value">Cart Value in €</label>
            <input id="cart_value" type="number" required min="0" step="any" placeholder="Cart value" ref={cartValueRef} />
          </div>
          <div className='inputSection'>
            <label htmlFor="delivery_distance">Delivery Distance in m</label>
            <input id="delivery_distance" type="number" min="0" required placeholder="Delivery Distance" ref={deliveryDistanceRef} />
          </div>
          <div className='inputSection'>
            <label htmlFor="number_of_items">Number of Items</label>
            <input id="number_of_items" type="number" min="0" required placeholder="Number of Items" ref={numberOfItemsRef} />
          </div>
          <div className='inputSection'>
            <label htmlFor="time">Delivery Date</label>
            <input id="time" type="datetime-local" placeholder="Delivery Date and Time" required ref={deliveryDateRef} />
          </div>
          <button type="submit">Calculate delivery price</button>
        </form>

        <p>Delivery Fee: {deliveryFee}€</p>
      </div>
    </section>
  );
};

export default DeliveryCalculationForm;