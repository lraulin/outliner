import { createContext, useContext, useReducer } from "react";
import { Tree, TreeNode } from "./tree";

/**
 * @typedef {Object} Action
 * @property {"append_child" | "delete"} type
 * @property {number} key
 * @property {string | undefined} value
 */

/** @type {React.Context<Tree>} */
const TreeContext = createContext(null);

const TreeDispatchContext = createContext(null);

export function TreeProvider({ children }) {
  const [Tree, dispatch] = useReducer(TreeReducer, initialTree);

  return (
    <TreeContext.Provider value={Tree}>
      <TreeDispatchContext.Provider value={dispatch}>
        {children}
      </TreeDispatchContext.Provider>
    </TreeContext.Provider>
  );
}

export function useTree() {
  return useContext(TreeContext);
}

/**
 * Description placeholder
 *
 * @export
 * @returns {(action:Action) => any}
 */
export function useTreeDispatch() {
  return useContext(TreeDispatchContext);
}

/**
 * Description placeholder
 *
 * @param {Tree} tree
 * @param {Action} action
 * @returns {*}
 */
function TreeReducer(tree, action) {
  switch (action.type) {
    case "append_child": {
      return tree.insert(action.key, action.value);
    }
    case "delete": {
      return tree.remove(action.key);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

const initialTree = new Tree();
