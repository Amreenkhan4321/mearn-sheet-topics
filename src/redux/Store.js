import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // Import storage, not localStorage
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";
import localStorage from "redux-persist/es/storage";
import { serialize, deserialize } from "./admin/action"; // Import the custom serializer and deserializer

import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { encryptTransform } from "redux-persist-transform-encrypt";

// const encryptor = encryptTransform({
//   secretKey: "your-secret-key", // Replace with a strong and secure secret key
//   onError: function (error) {
//     console.error("Encryption error:", error);
//   },
// });

// const encryptor = encryptTransform({
//   secretKey: "your-secret-key",
//   onError: function (error) {
//     console.error("Encryption error:", error);
//   },
//   // Use the custom serializer and deserializer
//   stateReconciler: autoMergeLevel2,
//   serialize: serialize,
//   deserialize: deserialize,
// });

const persistConfig = {
  key: "root",
  storage: localStorage, // Use the 'storage' imported from 'redux-persist/lib/storage'
  // transforms: [encryptor],
  // stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let Store = createStore(persistedReducer, {}, applyMiddleware(thunk));
  let persistor = persistStore(Store);
  return { Store, persistor };
};
