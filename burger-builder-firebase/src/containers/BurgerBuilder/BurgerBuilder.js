import React, { Component } from 'react';
import axios from '../../axios-orders';

import Aux from '../../hoc/Auxilliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}
class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
  }

  componentDidMount() {
    axios.get("https://burger-builder-11061.firebaseio.com/ingredients.json")
      .then((response) => {
        console.log(response);
        this.setState({ ingredients: response.data })
      }).catch((error) => {
        console.log(error);
      })
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igkey => {
        return ingredients[igkey]
      }).reduce((total, el) => {
        return total + el
      }, 0);
    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) return;

    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceSubtraction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceSubtraction;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
    console.log("continue");
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Trey Arnold",
        address: {
          street: "123 test street",
          zipCode: "12345",
          country: "USA"
        },
        email: "test@test.com"
      },
      deliveryMethod: "fastest"
    }
    axios.post("/orders.json", order).then((response => {
      console.log(response);
      this.setState({ loading: false, purchasing: false });
    })).catch((error) => {
      console.log(error);
      this.setState({ loading: false, purchasing: false });
    });
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null;
    let burger = <Spinner />
    if (this.state.ingredients) {
      burger = (<Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          purchasable={this.state.purchasable}
          price={this.state.totalPrice}
          ordered={this.purchaseHandler} />
      </Aux>);
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCancel={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
          price={this.state.totalPrice}
        />
      )
    }
    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios)