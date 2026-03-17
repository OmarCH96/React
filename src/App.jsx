import { useState, useEffect } from "react";
import { db } from "./data/db";
import Guitar from "./components/Guitar";
import Header from "./components/Header";
function App() {

  const initialCart = () =>{
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  }

  const [data] = useState(db);
  const [cart, setCart] =useState(initialCart);
  const MAX_QUANTITY = 10;
  const MIN_QUANTITY = 1;

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart])

  function addToCart(item){

    const itemExist = cart.findIndex(guitar => guitar.id === item.id);
    if(itemExist >= 0){
      if(cart[itemExist].quantity >= MAX_QUANTITY) return;
      const updatedCart = [...cart];
      updatedCart[itemExist].quantity += 1;
      setCart(updatedCart);
    }else{
      item.quantity = 1;
      setCart([...cart, item]);
    }
    // saveLocalStorage();
  }

  function removeFromCart(id){
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

  function incrementarQuantity(id){
    const updatedCart = cart.map(item =>{
      if(item.id === id && item.quantity < MAX_QUANTITY){
        return{
          ...item, //spread operator para manterner las referencias del objeto.
          quantity: item.quantity + 1
        }
      }
      return item;
    })
    setCart(updatedCart);
  }

  function decrementarQuantity(id){
    const updatedCart = cart.map(item =>{
      if(item.id === id && item.quantity > MIN_QUANTITY){
        return{
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item;
    })
    setCart(updatedCart);

  }

  function clearCart(){
    setCart([]);
  }


  // function saveLocalStorage(){
  //   localStorage.setItem('cart', JSON.stringify(cart));
  // }


  return (
    <>
      <Header 
        cart={cart}
        removeFromCart={removeFromCart}
        incrementarQuantity={incrementarQuantity}
        decrementarQuantity={decrementarQuantity}
        clearCart={clearCart}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar = {guitar}
              setCart={setCart}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>
      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
