import React, { useEffect, useRef, useState } from "react";
import { IContext } from "./../context";

import "./../css/context-selector.css";

interface IProps {
  contexts: IContext[];
  onSelect: (context: IContext) => void;
}
const ContextSelector: React.FC<IProps> = ({ contexts, onSelect }) => {
  const [items, setItems] = useState<IContext[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setItems(contexts);
    // inputRef.current?.focus();
  }, [contexts]);

  const filterList = (event: React.ChangeEvent<HTMLInputElement>) => {
    let updatedList = contexts;
    updatedList = updatedList.filter(function (item) {
      return (
        item.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1
      );
    });
    setItems(updatedList);
  };

  return (
    <div className="context-selector">
      <div className="search-label">Item Name: </div>
      <div className="inout-container">
        <input
          ref={inputRef}
          type="text"
          className="search-bar"
          placeholder="Search"
          autoFocus
          onFocus={(e) => e.target.classList.toggle("isFocus")}
          onBlur={(e) =>
            setTimeout(() => {
              e.target.classList.toggle("isFocus");
            }, 300)
          }
          onChange={filterList}
        />
        <div className="list-box">
          {items.map((c) => (
            <div
              className="items"
              key={c.id}
              onClick={() => {
                inputRef.current!.value = "";
                onSelect(c);
              }}
            >
              {c.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContextSelector;
