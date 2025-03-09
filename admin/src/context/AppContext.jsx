import { createContext } from "react";

export const AppContext=createContext()

const AppContextProvider=(props)=>{

    const calculateAge=(dob)=>{
        const tody =new Date()
        const birtDate=new Date(dob)

        let age=tody.getFullYear()-birtDate.getFullYear()

        return age

    }
    const months = [
        ' ',
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      const slotDateFormate=(slotDate)=>{
        const dateArray=slotDate.split('_')
        return dateArray[0]+" "+months[Number(dateArray[1])]+" "+dateArray[2]
      }

    const value={
        calculateAge,slotDateFormate
    }
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider