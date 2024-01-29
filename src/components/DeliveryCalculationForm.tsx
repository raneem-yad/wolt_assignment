// import styles from '../styles/QuotesForm.module.css';
import Orders from '../model/Orders';
import React, { useRef } from 'react';

type DeliveryCalculationFormProps = {
  onAddQuote: (quote: Orders) => void
};

const DeliveryCalculationForm: React.FC<DeliveryCalculationFormProps> = ({onAddQuote}) => {

  const cartValueRef = useRef<HTMLInputElement>(null);
  const deliveryDistanceRef = useRef<HTMLInputElement>(null);
  const numberOfItemsRef = useRef<HTMLInputElement>(null);
  const deliveryDateRef = useRef<HTMLInputElement>(null);


  const addButtonClickHandler = (event: React.FormEvent): void => {
    event.preventDefault();
    // get the values from inputs fields 
    // quoteRef.current ? quoteRef.current.value : '',
    //   authorRef.current ? authorRef.current.value: ''

    // const quote = new QuoteData(
    //   // Random number generator for quote id creation
    //   Math.floor(Math.random()*100000 + 1), 
    //   quoteRef.current ? quoteRef.current.value : '',
    //   authorRef.current ? authorRef.current.value: ''
    // );
    // onAddQuote(quote);
  };

  //change the form later 
  return (
    <form  onSubmit={addButtonClickHandler}>
      <div >
        <label htmlFor="cart_value">Cart Value in €</label>
        <input id="cart_value" type="number" placeholder="Cart value" ref={cartValueRef} />
      </div>
      <div >
        <label htmlFor="delivery_distance">Delivery Distance in m</label>
        <input id="delivery_distance" type="number" placeholder="Delivery Distance in m" ref={deliveryDistanceRef} />
      </div>
      <div >
        <label htmlFor="number_of_items">Number of Items</label>
        <input id="number_of_items" type="number" placeholder="Number of Items" ref={numberOfItemsRef} />
      </div>
      <div >
        <label htmlFor="time">Delivery Date</label>
        <input id="time" type="Date" placeholder="Delivery Date" ref={deliveryDateRef} />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default DeliveryCalculationForm;