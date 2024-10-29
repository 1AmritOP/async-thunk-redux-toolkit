import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletUser, showUser } from "../features/UserDetailSlice";
import MiniPopUp from "./MiniPopUp";
import {Link} from "react-router-dom"

const Read = () => {
  const [popUp, setpopUp] = useState(false);
  const [id, setid] = useState(null);
  const [radioData, setradioData] = useState("");

  const { users, loading, searchData } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  
  useEffect(() => {
    dispatch(showUser());
  }, []);

  if (loading) {
    return <h1>Loading</h1>;
  }

  return (
    <>
      {popUp && <MiniPopUp id={id} setpopUp={setpopUp} />}
      {/* <MiniPopUp /> */}
      <h1 className=" text-center text-3xl font-bold">All Data</h1>
      <div className=" text-center">
        <input
          onChange={(e) => {
            setradioData(e.target.value);
          }}
          checked={radioData == ""}
          type="radio"
          name="btn"
          value=""
          id="all"
        />
        <label className=" mr-2" htmlFor="all">
          All
        </label>

        <input
          onChange={(e) => {
            setradioData(e.target.value);
          }}
          type="radio"
          name="btn"
          id="male"
          value="male"
        />
        <label className=" mr-2" htmlFor="male">
          male
        </label>

        <input
          onChange={(e) => {
            setradioData(e.target.value);
          }}
          type="radio"
          name="btn"
          id="female"
          value="female"
        />
        <label className=" mr-2" htmlFor="female">
          female
        </label>
      </div>
      <div className="w-full h-fit flex flex-wrap">
        {users &&
          users
            .filter((elem) => {
              if (searchData.length == 0) {
                return elem;
              } else {
                return elem.name
                  .toLowerCase()
                  .includes(searchData.toLowerCase());
              }
            })
            .filter((elem)=>{
              if (radioData == "male") {
                return elem.gender == "male"
              }else if (radioData == "female") {
                return elem.gender == "female"
              } else return elem
            })
            .map((elem) => {
              return (
                <div
                  key={elem.id}
                  className="m-2 p-4 border-black border-solid border-2 w-60 h-fit"
                >
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {elem.name}
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    {elem.email}
                  </p>
                  <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">
                    Gender: {elem.gender}
                  </p>

                  <button
                    onClick={() => {
                      setid(elem.id);
                      setpopUp(true);
                    }}
                    className=" py-1 px-2 rounded-lg bg-slate-500"
                  >
                    view
                  </button>

                  <Link to={`/edit/${elem.id}`}  className=" mx-2 py-1 px-2 rounded-lg bg-slate-500">
                    update
                  </Link>

                  <button
                    onClick={() => {
                      dispatch(deletUser(elem.id));
                    }}
                    className=" py-1 px-2 rounded-lg bg-slate-500"
                  >
                    delete
                  </button>
                </div>
              );
            })}
      </div>
    </>
  );
};

export default Read;
