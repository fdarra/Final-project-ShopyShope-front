import React, { useEffect, useState } from "react";
import { Radio, RadioGroup } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { getColors } from "../JS/Actions/ProductActions";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Color_Sizes = (Product,instock) => {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const Sizes = useSelector((state) => state.ProductReducer.sizes);
  const Colors = useSelector((state) => state.ProductReducer.colors);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(Product);
    if (Product && Product.title) dispatch(getColors(Product.title));
    if (!Colors) setSelectedColor(Colors[0]);
    if (!Sizes) setSelectedSize(Product.size);
    console.log("color & size", Colors);
    console.log("color & size", Sizes);
  },[dispatch]);

  useEffect(() => {
  
    if (!Colors) setSelectedColor(Colors[0]);
    if (!Sizes) setSelectedSize(Sizes[0]);
    console.log("color & size", Colors);
    console.log("color & size", Sizes);
  },[Product]);

  return (
    <div className="">
      {/* Sizes */}
      <div className="ml-0 h-10 flex">
        <fieldset aria-label="Choose a size" className="mt-2 ">
          <RadioGroup
            value={selectedSize}
            onChange={setSelectedSize}
            className="flex"
          >
            {Sizes.map((size, i) => (
              <Radio
                key={i}
                value={size}
                disabled={!instock}
                className={classNames(
                  instock
                    ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                    : "cursor-not-allowed bg-gray-50 text-gray-200",
                  "group relative flex  items-center justify-start rounded-md border mx-1 px-1  text-sm font-medium uppercase hover:bg-gray-100 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 "
                )}
                
              >
                <span>{size}</span>
                {instock ? (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                  >
                    <svg
                      stroke="currentColor"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                      className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                    >
                      <line
                        x1={0}
                        x2={100}
                        y1={100}
                        y2={0}
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  </span>
                )}
              </Radio>
            ))}
          </RadioGroup>
          {/* End Sizes */}
        </fieldset>
        {/* Colors */}
        <div className=" ">
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>

                  <fieldset aria-label="Choose a color" className="mt- ">
                    <RadioGroup
                      value={selectedColor}
                      onChange={setSelectedColor}
                      className="flex items-start space-x-3"
                    >
                      {Colors.map((color) => (
                        <Radio
                          key={color}
                          value={color}
                          aria-label={color}
                          className={classNames(
                           ` bg-${color}-700
                            relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-[checked]:ring-2 data-[focus]:data-[checked]:ring data-[focus]:data-[checked]:ring-offset-1`
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={classNames(
                              color.class,
                              "h-8 w-8 rounded-full border border-black border-opacity-10"
                            )}
                          />
                        </Radio>
                      ))}
                    </RadioGroup>
                  </fieldset>
                </div>
      </div>
    </div>
  );
};

export default Color_Sizes;
