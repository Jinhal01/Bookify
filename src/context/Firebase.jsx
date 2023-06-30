import { createContext, useContext ,useState,useEffect} from "react";
import { initializeApp } from "firebase/app";
import {getAuth , createUserWithEmailAndPassword , signInWithEmailAndPassword , GoogleAuthProvider , signInWithPopup,onAuthStateChanged} from 'firebase/auth'
import {getFirestore,collection,addDoc , getDocs , doc, getDoc,query,where } from 'firebase/firestore'
import {getStorage ,ref,uploadBytes,getDownloadURL } from 'firebase/storage'

const FirebaseContext = createContext(null);
const firebaseConfig = {
    apiKey: "AIzaSyDn5F-Dbk9SsHdmHv1J4JvI3H-Sd3Dorzo",
    authDomain: "bookify-b538c.firebaseapp.com",
    projectId: "bookify-b538c",
    storageBucket: "bookify-b538c.appspot.com",
    messagingSenderId: "1058720546559",
    appId: "1:1058720546559:web:f5e46896d0c714a78016ca"
  };

export const useFirebase =()=> useContext(FirebaseContext);
const firebaseapp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseapp);
const googleProvider = new GoogleAuthProvider();
const firestore = getFirestore(firebaseapp);
const storage = getStorage(firebaseapp)
 
export const FirebaseProvider = (props) =>{
    const [user,setUser] = useState(null);

    useEffect(() =>{
        onAuthStateChanged(firebaseAuth,(user)=>{
            if(user) setUser(user);
            else setUser(null);
        })
    } , [])
    const signup = (email,password)=>{
        createUserWithEmailAndPassword(firebaseAuth,email,password)
    }
    const signinUser = (email,password) =>{
        signInWithEmailAndPassword(firebaseAuth,email,password)
    }
    const signInwithGoogle = () =>{
        signInWithPopup(firebaseAuth ,googleProvider)
    }
    const isLoggedIn = user ? true : false;
    
    const handleCreateList = async(name , isbn , price,coverPic) =>{
        const imageRef = ref(storage , `uploads/images/${Date.now()}-${coverPic.name}`);
        const uploadResult = await uploadBytes(imageRef,coverPic);
        return await addDoc(collection(firestore , 'books'),
        {
            name,
            isbn,
            price,
            imageURL: uploadResult.ref.fullPath,
            userId: user.uid , 
            userEmail: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
        })
    }
     const listAllBooks = () => {
            return getDocs(collection(firestore,"books"))
     }
     const getImageURl = (path) =>{
        return getDownloadURL(ref(storage,path));
     }

     const getBookbyId = async(id) =>{
        const docref = doc(firestore,'books',id);
        const result = await getDoc(docref);
        return result;
     }

     const placeOrder = async(bookId ,qty) =>{
        const collectionref = collection(firestore , 'books' , bookId , 'orders');
        const result = await addDoc(collectionref , {
            userId: user.uid , 
            userEmail: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            qty: Number(qty),
        });
        return result;
     };

     const fetchMyBooks = async(userId) =>{
        const collectionref = collection(firestore , "books");
        const q = query(collectionref , where("userId" , "==" , userId));
        const result = await getDocs(q);
        return result;
     }
     
    const getOrders = async(bookId) =>{
        const collectionref = collection(firestore,"books" , bookId,"orders");
        const result = await getDocs(collectionref);
        return result;
    }
   
// const isBooks= isLoggedIn ? true :false;

// useEffect(() =>{
//   onAuthStateChanged(auth,(user) =>{
//     if(user){
//       setUser(user);
//     }else{
//       console.log("You are logged out");
//       setUser(null);
//     }
//   })
// },[]);
// if(user === null){
//   return (
//     <div className="App">
//       <Signup>
//       </Signup>
//     </div>
//   );
// }
    
    return <FirebaseContext.Provider value={{signup , 
        signinUser ,
        signInwithGoogle,
         isLoggedIn ,
          handleCreateList,
           listAllBooks,
           getImageURl,
           getBookbyId,
           placeOrder,
           fetchMyBooks,
           user,
           getOrders,
           firebaseAuth
        //    isBooks
        }}>{props.children}</FirebaseContext.Provider>
}