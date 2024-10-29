import { createSlice, createAsyncThunk, } from "@reduxjs/toolkit";

export const createUser=createAsyncThunk("createUser",
    async(data, {rejectWithValue})=>{
        const response=await fetch("https://671c849a09103098807a5611.mockapi.io/crud",
            {
                method: "POST",
                headers : {
                    "Content-Type":"application/json",
                },
                body :JSON.stringify(data),
            }
        );

        try {
            const result=await response.json();
            console.log("create result ..",result);
            
            return result;
        } catch (error) {
            return rejectWithValue(error.response)
        }
    }
)

export const showUser=createAsyncThunk("showUser",async(args,{rejectWithValue})=>{
    const response=await fetch("https://671c849a09103098807a5611.mockapi.io/crud")

    try {
        const result= await response.json();
        console.log("show result ..",result);

        return result;
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const deletUser=createAsyncThunk("deletUser",async(id,{rejectWithValue})=>{
    const response=await fetch(`https://671c849a09103098807a5611.mockapi.io/crud/${id}`,
        {method: "DELETE"}
    );

    try {
        const result=await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error)
    }

})

export const updateUser=createAsyncThunk("updateUser",
    async(data, {rejectWithValue})=>{
        const response=await fetch(`https://671c849a09103098807a5611.mockapi.io/crud/${data.id}`,
            {
                method: "PUT",
                headers : {
                    "Content-Type":"application/json",
                },
                body :JSON.stringify(data),
            }
        );

        try {
            const result=await response.json();
            console.log("create result ..",result);
            
            return result;
        } catch (error) {
            return rejectWithValue(error.response)
        }
    }
)

export const userDetail=createSlice({
    name: "userDetails",
    initialState : {
        users: [],
        loading: false,
        error: null,
        searchData: [],
    },
    reducers :{
        searchUser: (state,action)=>{
            state.searchData =action.payload
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(createUser.pending, (state)=>{
            state.loading=true;
        })
        builder.addCase(createUser.fulfilled, (state,action)=>{
            state.loading=false;
            state.users.push(action.payload)
            
        })
        builder.addCase(createUser.rejected , (state,action)=>{
            state.loading= false;
            state.error = action.payload;
        })



        builder.addCase(showUser.pending, (state)=>{
            state.loading=true
        })
        builder.addCase(showUser.fulfilled, (state,action)=>{
            state.loading=false;
            state.users=action.payload;
            console.log("hey show .." ,action.payload);
        })
        builder.addCase(showUser.rejected , (state,action)=>{
            state.loading= false;
            state.error = action.payload;
            
        })


        builder.addCase(deletUser.pending, (state)=>{
            state.loading= true;
        })
        builder.addCase(deletUser.fulfilled, (state,action)=>{
            state.loading= false
            
            const {id}=action.payload

            if(id){
                state.users=state.users.filter((elem)=> elem.id !== id)
            }
            
        })
        builder.addCase(deletUser.rejected , (state,action)=>{
            state.loading= false;
            state.error = action.payload;
            
        })

        builder.addCase(updateUser.pending, (state)=>{
            state.loading=true
        })
        builder.addCase(updateUser.fulfilled, (state,action)=>{
            state.loading=false;
            state.users=state.users.map((elem)=>(
                elem.id == action.payload.id ? action.payload : elem
            ))
        })
        builder.addCase(updateUser.rejected , (state,action)=>{
            state.loading= false;
            state.error = action.payload;
            
        })
        
    }
})

export default userDetail.reducer

export const {searchUser} =userDetail.actions