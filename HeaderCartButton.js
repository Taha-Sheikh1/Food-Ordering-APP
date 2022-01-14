import { useContext, useEffect, useState } from 'react';

import CartIcon from '../Cart/CartIcon';
import CartContext from '../../Store/cart-context';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const [isBtnHighlighted, setBtnHighlighted] = useState(false);

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);


  const { items } = cartCtx;

  const btnClasses = `${classes.button} ${isBtnHighlighted ? classes.bump : ''}`;
  useEffect(() => {
    if(items.length === 0) {
      return;
    }
    setBtnHighlighted(true);
    const timer = setTimeout(() => {
      setBtnHighlighted(false)
    }, 300);

    return () => {
      clearTimeout(timer);
    }
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;




