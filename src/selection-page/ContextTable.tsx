import React from "react";
import { IContext } from "../context";

import "./../css/context-table.css";

interface IProps {
  contexts: IContext[];
  onDelete: (context: IContext) => void;
  onContextState: (context: IContext, state: "isKey" | "isMandatory") => void;
  onIsRequired: (context: IContext) => void;
  onCancel: () => void
}
const ContextTable: React.FC<IProps> = ({
  contexts,
  onDelete,
  onContextState,
  onIsRequired,
  onCancel
}) => {
  return (
    <div className="table-container">
      <table className="styled-table">
        <thead>
          <tr>
            <th>Context</th>
            <th>Value</th>
            <th>Iskey</th>
            <th>Mandatory</th>
            <th>Recommended</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {contexts.map((context) => {
            return (
              <tr key={context.id}>
                <td>{context.name}</td>
                <td>{context.value}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={context.isKey}
                    onChange={() => onContextState(context, "isKey")}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={context.isMandatory}
                    onChange={() => onContextState(context, "isMandatory")}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={context.isRecommended}
                    onChange={() => onIsRequired(context)}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => onDelete(context)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
            <tr>
              <td colSpan={6} >
                <button
                  className="btn btn-outline-danger"
                  disabled={contexts.length === 0}
                  onClick={() => console.log('hi')}
                >
                  Save
                </button>
                <button
                  disabled={contexts.length === 0}
                  className="btn btn-outline-danger"
                  onClick={onCancel}
                >
                  Cancel
                </button>
              </td>
            </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ContextTable;
