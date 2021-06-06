import React from "react";
import styles from './Cart.module.css'
import {FiShoppingCart} from 'react-icons/fi'
import {appContext} from "../AppState";

interface Props {

}

interface State {
    isOpen: boolean
}

class Cart extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isOpen: false,
        };
    }

    handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // console.log(e.target);
        // console.log(e.currentTarget);

        // 点击元素为span时才可以触发
        if ((e.target as HTMLElement).nodeName === "SPAN") {
            this.setState({isOpen: !this.state.isOpen});
        }
    }

    render() {
        return (
            <appContext.Consumer>
                {(value) => {
                    return (
                        <div className={styles.cartContainer}>
                            <button className={styles.button}
                                    onClick={this.handleClick}
                            >
                                <FiShoppingCart/>
                                <span>购物车 {value.shoppingCart.items.length} (件）</span>
                            </button>
                            <div className={styles.cartDropDown}
                                 style={{
                                     display: this.state.isOpen ? "block" : "none"
                                 }}
                            >
                                <ul>
                                    {
                                        value.shoppingCart.items.map((i)=>{
                                            return (<li>{i.name}</li>)
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    );
                }}
            </appContext.Consumer>
        )
    }
}

export default Cart;
