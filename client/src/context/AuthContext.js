import { createContext, useReducer } from "react"
import AuthReducer  from "./AuthReducer"

const INITIAL_STATE = {
  user: {
    _id:"61ca4100ee1f904579382044",
    username:"youssefkizou",
    email:"youssefkizou@gmail.com",
    followings: ["61ca412eee1f904579382048", "61ca4119ee1f904579382046"],
    password: "$2b$10$NUmgo2bqW02cRQb1SeGki.6j5O4wtr9BCllPo9ff32WzqWjSoa4w.",
    profilePicture:"person/kizou.jpeg",
    city:"evry",
    desc:"Hello! My name is Youssef. Born and raised in Morocco, I now live in Paris. I am always curious and willing to learn new things."
}
  ,
  isFetching: false,
  error: false
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return(
    <AuthContext.Provider 
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}