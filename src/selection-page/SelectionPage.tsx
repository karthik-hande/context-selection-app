import React, { useEffect, useState } from "react";

import data from "./../data.json";

import ContextSelector from "./Context-selector";
import ContextTable from "./ContextTable";
import { IContext } from "./../context";

import "./../css/selection-page.css";

const SelectionPage = () => {
  const [contextsOptions, setContextOptions] = useState<IContext[]>([]);
  const [contextSelections, setContextSelections] = useState<IContext[]>([]);
  useEffect(() => {
    console.log(data);
    setContextOptions(data.data);
  }, []);

  const selectContext = (context: IContext) => {
    let updatedSelection = [...contextSelections, context];
    setContextSelections(updatedSelection);
    let updatedOption = contextsOptions.filter((c) => c.id !== context.id);
    setContextOptions(updatedOption);
  };

  const deleteContext = (context: IContext) => {
    context.isKey = context.isMandatory = true;
    context.isRecommended = false;
    let updatedOption = [...contextsOptions, context];
    setContextOptions(updatedOption);
    let updatedSelection = contextSelections.filter((c) => c.id !== context.id);
    setContextSelections(updatedSelection);
  };

  const updateContextState = (
    context: IContext,
    state: "isKey" | "isMandatory"
  ) => {
    let list = [...contextSelections];
    let item = list.find((c) => c.id === context.id);
    item && (item[state] = !item[state]);
    setContextSelections(list);
  };

  const onIsRequired = (context: IContext) => {
    let list = [...contextSelections];
    let item = list.find((c) => c.id === context.id);
    if (item) {
      if (item.isRecommended) {
        item.isKey = true;
        item.isMandatory = true;
        item.isRecommended = false;
        setContextSelections(list);
      } else {
        item.isKey = false;
        item.isMandatory = false;
        item.isRecommended = true;
        setContextSelections(list);
      }
    }
  };

  const cancelSelections = () => {
    contextSelections.forEach((c) => {
      c.isKey = true;
      c.isMandatory = true;
      c.isRecommended = false;
    });

    let allOptions = [...contextsOptions, ...contextSelections];
    setContextOptions(allOptions);
    setContextSelections([]);
  };

  return (
    <div className="selection-page">
      <ContextSelector contexts={contextsOptions} onSelect={selectContext} />
      <ContextTable
        contexts={contextSelections}
        onDelete={deleteContext}
        onContextState={updateContextState}
        onIsRequired={onIsRequired}
        onCancel={cancelSelections}
      />
    </div>
  );
};

export default SelectionPage;
