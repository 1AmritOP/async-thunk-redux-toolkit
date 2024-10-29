import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../features/UserDetailSlice";

const Update = () => {
  const { id } = useParams();
  const [updateData, setupdateData] = useState("")

  const {users,loading }= useSelector((state) => state.app);
  const dispatch=useDispatch()
  const navigate =useNavigate()
  

  useEffect(() => {
    if (id) {
        const singleUser = users.filter((elem) => elem.id == id);
        setupdateData(singleUser[0])
    }
  }, [])

  const newData= (e)=>{
    setupdateData({...updateData, [e.target.name] : e.target.value})
  }

  console.log(updateData);

  

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Update the Data
              </h1>
              <form
                onSubmit={(e)=>{
                    e.preventDefault()
                    dispatch(updateUser(updateData))
                    navigate("/read")
                }}
                className="space-y-4 md:space-y-6"
                action="#"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    onChange={newData}
                    name="name"
                    type="text"
                    id="name"
                    value={updateData && updateData.name}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Amrit kumar"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    onChange={newData}
                    type="email"
                    name="email"
                    id="email"
                    value={updateData && updateData.email}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Age
                  </label>
                  <input
                    onChange={newData}
                    type="number"
                    name="age"
                    id="age"
                    placeholder="Age"
                    value={updateData && updateData.age}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>

                <div>
                  <label className="text-lg font-semibold mr-4">Gender</label>

                  <input
                    className="mx-2"
                    onChange={newData}
                    type="radio"
                    id="male"
                    value="male"
                    name="gender"
                    checked={updateData && updateData.gender == "male"}
                  />
                  <label htmlFor="male">male</label>

                  <input
                    className="mx-2"
                    onChange={newData}
                    type="radio"
                    id="female"
                    value="female"
                    name="gender"
                    checked={updateData && updateData.gender == "female"}
                  />
                  <label htmlFor="female">female</label>
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Update User
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Update;
