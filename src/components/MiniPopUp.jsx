import { useSelector } from "react-redux"


const MiniPopUp = ({id , setpopUp}) => {
    const allUsers=useSelector((state)=> state.app.users)

    const singleUser=allUsers.filter((elem)=> elem.id === id)

    console.log(singleUser);
    
  return (
    <>
        <div className='popUp h-fit w-60 bg-red-400'>
            <button
             onClick={()=>{
                setpopUp(false)
             }}
             className='px-2 py-1 m-2 rounded-lg bg-green-400'>close</button>
            <div className=' text-center'>
                <h1>Name: {singleUser[0].name} </h1>
                <h1>Email: {singleUser[0].email}</h1>
                <h1>Age: {singleUser[0].age}</h1>
                <h1>Gender: {singleUser[0].gender}</h1>
            </div>
        </div>
    </>
  )
}

export default MiniPopUp