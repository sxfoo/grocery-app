import { db } from "../../firebaseConfig"; 
import { ref, set, get, remove} from "firebase/database";

export const onlineRemoveItemsfromList = async({listID, itemID}) => {
    const listRef = ref(db, (`list_node/lists/List_ID: ${listID}/items/${itemID}`));
    await remove(listRef); //removes the node if the list is empty
};                         //adds back the node if the user adds something else