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

  // let deliveryFee = 0;

  const addButtonClickHandler = (event: React.FormEvent): void => {

    event.preventDefault();
    const cartValue = cartValueRef.current ? parseFloat(cartValueRef.current.value) : 0;
    const numberOfItems = numberOfItemsRef.current ? parseInt(numberOfItemsRef.current.value, 10) : 0;
    const deliveryDistance = deliveryDistanceRef.current ? parseInt(deliveryDistanceRef.current.value, 10) : 0;
    const deliveryDate = deliveryDateRef.current ? new Date(deliveryDateRef.current.value) : new Date();

    if (!cartValue || !deliveryDistance || !numberOfItems || !deliveryDate) {
      alert('Please fill in all fields.');
      return;
    }
    if (cartValue) {

      if (cartValue >= 200) setDeliveryFee(fee => fee = 0);
      else {
        let order = new Order(cartValue, numberOfItems, deliveryDistance, deliveryDate);
        let calculatedFee = calucateTotalFeeLimit(order);
        setDeliveryFee(fee => fee = calculatedFee)
      }
    }

  };

  //change the form later 
  return (
    <section className='formSection'>

      <div className='formSection_content'>
        <form className='deliveryCalculationForm' onSubmit={addButtonClickHandler}>
          <div className='inputSection'>
            <label htmlFor="cart_value">Cart Value in €</label>
            <input id="cart_value" type="number" placeholder="Cart value" ref={cartValueRef} />
          </div>
          <div className='inputSection'>
            <label htmlFor="delivery_distance">Delivery Distance in m</label>
            <input id="delivery_distance" type="number" placeholder="Delivery Distance in m" ref={deliveryDistanceRef} />
          </div>
          <div className='inputSection'>
            <label htmlFor="number_of_items">Number of Items</label>
            <input id="number_of_items" type="number" placeholder="Number of Items" ref={numberOfItemsRef} />
          </div>
          <div className='inputSection'>
            <label htmlFor="time">Delivery Date</label>
            <input id="time" type="Date" placeholder="Delivery Date" ref={deliveryDateRef} />
          </div>
          <button type="submit">Calculate delivery price</button>
        </form>

        <p>Delivery Fee: {deliveryFee}€</p>
      </div>
    </section>
  );
};

export default DeliveryCalculationForm;