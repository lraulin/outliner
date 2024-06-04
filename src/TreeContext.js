import { createContext, useContext, useReducer } from "react";
import { Tree, TreeNode } from "./tree";

const TreeContext = createContext(new Tree());

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

export function useTreeDispatch() {
  return useContext(TreeDispatchContext);
}

/**
 * Description placeholder
 *
 * @param {TreeNode} tree
 * @param {*} action
 * @returns {*}
 */
function TreeReducer(tree, action) {
  switch (action.type) {
    case "append_child": {
      return tree.insert(action.key, action.value);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

const initialTree = new Tree();
