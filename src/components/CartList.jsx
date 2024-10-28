import React, { useEffect, useState } from "react";
import { Radio, RadioGroup } from "@headlessui/react";
import minus from "../images/minus.png";
import plus from "../images/plus.png";
import like from "../images/like.png";
import edit from "../images/edit.png";
import delet from "../images/delet.png";
import { ScrollPanel } from "primereact/scrollpanel";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishesList,
  getCartFromStorage,
  getWishesFromStorage,
  removeFromCartList,
  removeFromWishesList,
} from "../JS/Actions/Cart_wishes_ListActions";
import { REMOVE_FROM_CART } from "../JS/Actiontypes/Cart_Wishes_ListActionTypes";
import { getAllSizes, getColors } from "../JS/Actions/ProductActions";
import ProgressLoad from "./ProgressLoad";
import { FormControl, InputLabel, NativeSelect } from "@mui/material";
import Color_Sizes from "./Color_Sizes";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const CartList = () => {
  const [edite, setEdite] = useState("");
  const [prod, setProd] = useState();
  const [quantities, setQuantities] = useState({}); // Gérer les quantités par produit
  const [selectedSize, setSelectedSize] = useState("");
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState("");
  const [sizes, setSizes] = useState([]);
  const cartlist = useSelector((state) => state.Cart_wishesListReducer.cart);
  const wishes = useSelector((state) => state.Cart_wishesListReducer.wishes);
  const Load = useSelector((state) => state.ProductReducer.load);
  const titles_sizes = useSelector((state) => state.ProductReducer.allSizes);
  const Sizes = useSelector((state) => state.ProductReducer.sizes);

  useEffect(() => {
    dispatch(getCartFromStorage());
    dispatch(getWishesFromStorage());
    dispatch(getAllSizes());
  }, [dispatch]);

  // Lorsque le panier est chargé, initialisez les quantités
  useEffect(() => {
    const initialQuantities = {};
    cartlist.forEach((item) => {
      initialQuantities[item._id] = 1; // Quantité initiale de chaque produit à 1
    });
    setQuantities(initialQuantities);
    setSizes(titles_sizes);
  }, [cartlist]);

  const handleIncrement = (item) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [item._id]: (prevQuantities[item._id] || 1) + 1, // Incrémenter la quantité pour ce produit
    }));
  };

  const handleDecrement = (item) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [item._id]: Math.max(1, (prevQuantities[item._id] || 1) - 1), // Ne pas descendre en dessous de 1
    }));
  };
  return (
    <div>
      <ScrollPanel className="w-full xl:h-[500px] h-[400px] bg-white px-0">
        {cartlist.map((item, index) => (
          <div
            key={`${item._id}-${index}`} // Clé unique combinant l'ID et l'index
            className="border-b-2 border-slate-200 flex bg-white p-0 m-0"
          >
            <div className="bg-white w-1/3 h-[200px] flex-col object-cover object-center">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full"
              />
            </div>

            <div className="w-2/3 h-[200px] bg-white">
              <h1 className="text-start pl-4 font-semibold text-wrap text-black text-base mt-1 pr-1">
                {item.title}
              </h1>
              <h1 className="pl-4 text-lg text-black font-semibold">
                ${item.price}
              </h1>

              <div className="flex mt-2 justify-start pl-4">
                <button
                  className="border-2 rounded-l-lg border-slate-200 hover:bg-slate-200"
                  onClick={() => handleDecrement(item)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="22px"
                    viewBox="0 -960 960 960"
                    width="20px"
                    fill="#000000"
                  >
                    <path d="M200-440v-80h560v80H200Z" />
                  </svg>
                </button>
                <label className="px-2 text-black font-mono font-semibold text-base">
                  {quantities[item._id] || 1}
                </label>
                <button
                  className="border-2 rounded-r-lg border-slate-200 content-center hover:bg-slate-200"
                  onClick={() => handleIncrement(item)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="22px"
                    viewBox="0 -960 960 960"
                    width="20px"
                    fill="#000000"
                  >
                    <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                  </svg>
                </button>
              </div>

              <div
                className={
                  edite !== item._id
                    ? "flex mt-2 h-10 items-center contents-center"
                    : "hidden"
                }
              >
                {/* Stock */}
                <div
                  className={`w-1/3 pt-2  pl-1 border-r-2  border-slate-200 ${
                    item.countInStock ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {item.countInStock ? "In Stock" : "exhausted"}
                </div>

                {/* size */}
                <div className="w-1/3 pt-2  pl-1 text-center text-black border-r-2 border-slate-200">
                  {item.size}
                </div>

                {/* Color */}
                <div className="w-1/3 pt-2 text-black  pl-1 text-center">
                  {item.color}
                </div>
              </div>

              {/* edit Sizes */}
              <div className="w-full pt-3 pl-1  flex text-black ">
                <div
                  className={
                    edite === item._id
                      ? "w-full pt-1 h-10 pl-1 text-black pr-1 flex flex-wrap"
                      : "hidden m-0 p-0"
                  }
                >
                  <Color_Sizes Product={prod} instock={item.countInStock} />
                </div>
              </div>

              <div className="flex justify-end items-end pr-2 mb-2 w-full ">
                {/* Like button */}
                <button
                  className="p-1 rounded-full bg-slate-50 mx-2 cursor-pointer"
                  onClick={() => {
                    dispatch(addToWishesList(item, wishes));
                    dispatch(removeFromCartList(item._id, cartlist));
                  }}
                >
                  <img src={like} alt="like" className="w-5 h-5" />
                </button>

                {/* Edit button */}
                <button
                  className={
                    edite !== item._id
                      ? "p-1 rounded-full bg-slate-50 mx-2 cursor-pointer hover:bg-slate-200"
                      : "hidden m-0 p-0"
                  }
                  onClick={(e) => {
                    dispatch(getColors(item.title));
                    setProd(item);
                    setEdite(item._id);
                  }}
                >
                  <img src={edit} alt="edit" className="w-5 h-5" />
                </button>

                {/* Cancel edit button */}
                <button
                  className={
                    edite === item._id
                      ? "p-1 rounded-full bg-slate-50 mx-2 cursor-pointer hover:bg-slate-200"
                      : "hidden"
                  }
                  onClick={(e) => {
                    setProd("");
                    setEdite("");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="22px"
                    viewBox="0 -960 960 960"
                    width="22px"
                    fill="#EA3323"
                  >
                    <path d="m332-285.33 148-148 148 148L674.67-332l-148-148 148-148L628-674.67l-148 148-148-148L285.33-628l148 148-148 148L332-285.33ZM480-80q-82.33 0-155.33-31.5-73-31.5-127.34-85.83Q143-251.67 111.5-324.67T80-480q0-83 31.5-156t85.83-127q54.34-54 127.34-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82.33-31.5 155.33-31.5 73-85.5 127.34Q709-143 636-111.5T480-80Zm0-66.67q139.33 0 236.33-97.33t97-236q0-139.33-97-236.33t-236.33-97q-138.67 0-236 97-97.33 97-97.33 236.33 0 138.67 97.33 236 97.33 97.33 236 97.33ZM480-480Z" />
                  </svg>
                </button>

                {/* Validate edit button */}
                <button
                  className={
                    edite === item._id
                      ? "p-1 rounded-full bg-slate-50 mx-2 cursor-pointer hover:bg-slate-200"
                      : "hidden"
                  }
                  onClick={() => {
                    setEdite("");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="22px"
                    viewBox="0 -960 960 960"
                    width="22px"
                    fill="#75FB4C"
                  >
                    <path d="M422-297.33 704.67-580l-49.34-48.67L422-395.33l-118-118-48.67 48.66L422-297.33ZM480-80q-82.33 0-155.33-31.5-73-31.5-127.34-85.83Q143-251.67 111.5-324.67T80-480q0-83 31.5-156t85.83-127q54.34-54 127.34-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82.33-31.5 155.33-31.5 73-85.5 127.34Q709-143 636-111.5T480-80Zm0-66.67q139.33 0 236.33-97.33t97-236q0-139.33-97-236.33t-236.33-97q-138.67 0-236 97-97.33 97-97.33 236.33 0 138.67 97.33 236 97.33 97.33 236 97.33ZM480-480Z" />
                  </svg>
                </button>

                {/* Remove button */}
                <button
                  className="p-1 rounded-full bg-slate-50 mx-2 cursor-pointer hover:bg-slate-200"
                  onClick={() =>
                    dispatch(removeFromCartList(item._id, cartlist))
                  }
                >
                  <img src={delet} alt="delete" className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </ScrollPanel>

      <div>
        <div className="flex justify-between pt-1">
          <div className="w-full">
            <label className="py-4">total</label>
          </div>
          <div className="">
            <label className="py-4">total</label>
          </div>
        </div>
        <div className="w-full flex justify-center items-end h-full bg-white bottom-0">
          <button className="py-3 text-black bg-gray-500 px-36 rounded-lg ">
            validate
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartList;
