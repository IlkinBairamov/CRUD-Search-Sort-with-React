import axios from 'axios';
import React, { ChangeEvent } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Button, Col, Input, Row, Spinner, Table } from 'reactstrap';
import { CreatePostModal } from '../components/CreatePostModal';
import { EditPostModal } from '../components/EditPostModal';
import { Initial_Async_Data } from '../const';
import { CommandPageContainer } from '../hoc/CommandPageContainer';
import { IAsyncData, IUser } from '../models';
import {Pagination} from '../components/Pagination';
import { FaArrowUp, FaArrowDown } from "react-icons/fa";


export const Users : React.FC = ()=>{
const [UserData,setUserData] = React.useState<IAsyncData<IUser[]>>(Initial_Async_Data)  

const [isDeleteLoading,setDeleteLoading]=React.useState(false)
const [editingUserId,setEditingUserId]=React.useState<number>()
const [isCreateModalOpen,setCreateModalOpen]=React.useState(false)
const [users, setUsers] = React.useState<IUser[]>([])
const [sorted, setSorted] = React.useState({ sorted: "id", reversed: false });
const [searchPhrase, setSearchPhrase] = React.useState("");
const [currentPage, setCurrentPage] = React.useState(1);
  const [postsPerPage] = React.useState(10);

const getPost= React.useCallback(()=>{
    setUserData((oldData)=>({...oldData,loading:true}))
    axios.get<IUser[]>(`https://6388829aa4bb27a7f788fc78.mockapi.io/users`).then(({data})=>{
        setUserData((oldData)=>({...oldData,loading:false,data,error:undefined}))
    }).catch((error)=>{
        setUserData({data:undefined,loading:false,error:error.toString()})
    })
    
    
},[]) 
React.useEffect(()=>{
    getPost()
},[getPost])
//Pagination
const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = matchedUsers?.slice(indexOfFirstPost, indexOfLastPost);
  //SEARCH
  var matchedUsers = UserData.data;
  const paginate = (pageNumber:number) => {
    setCurrentPage(pageNumber)
    
}; 
  const search = (event:ChangeEvent<HTMLInputElement>) => {
    
    matchedUsers = UserData.data?.filter(user => {
        if (event.target.value === "") {
          return user;
        } else if (user.name.toLowerCase().includes(event.target.value.toLowerCase()) || user.surname.toLowerCase().includes(event.target.value.toLowerCase()) || user.date.toString() == event.target.value || user.gender.toLowerCase().includes(event.target.value.toLowerCase())) {
          return user;
        }
      
    });
    if (matchedUsers!==undefined) {
        setUsers(matchedUsers);
        console.log(matchedUsers);
    }
    
    setSearchPhrase(event.target.value);
};
//SORT
var reversed:boolean;
const sortByName = (Reversed:boolean) => {
    reversed=!Reversed;
    matchedUsers?.sort((userA, userB) => {
        if (reversed) {
            return userB.name.localeCompare(userA.name);
        }
        return userA.name.localeCompare(userB.name);
    });
    setSorted({ sorted: "name", reversed: reversed });
    
    
};
const sortBySurname = (Reversed:boolean) => {
    reversed=!Reversed;
    matchedUsers?.sort((userA, userB) => {
        if (reversed) {
            return userB.surname.localeCompare(userA.surname);
        }
        return userA.surname.localeCompare(userB.surname);
    });
    setSorted({ sorted: "surname", reversed: reversed });
    
    
};
const sortByBalance = (Reversed:boolean) => {
    reversed=!Reversed;
    matchedUsers?.sort((userA, userB) => {
        if (reversed) {
            console.log("sa");
            
            return userA.balance - userB.balance;
        }
        return userB.balance - userA.balance;
    });
    setSorted({ sorted: "id", reversed: !sorted.reversed });
};
const renderArrow = () => {
    if (reversed) {
        return <FaArrowUp />;
    }
    return <FaArrowDown />;
};
//Pagination
//Delete
const handleDeleteClick=React.useCallback((id:number)=>{
    if (window.confirm("are you sure u want to delete this post?")) {
        setDeleteLoading(true)
        axios.delete(`https://6388829aa4bb27a7f788fc78.mockapi.io/users/${id}`).then(()=>{
            toast("Post has been delete successfully",{type:"success"})
            getPost()
        }).catch(()=>{
            toast("Unexpected error occured, please try again later...",{type:"error"})
        }).finally(()=>{
            setDeleteLoading(false)
        })
    }
},[getPost])

//Edit
const handleEditModalClick=React.useCallback((id:number)=>{
    setEditingUserId(id)
},[])

const onUserEditSuccess=React.useCallback(()=>{
    toast("User has been updated successfully",{type:"success"})
    getPost();
},[getPost])

const onUserEditError=React.useCallback(()=>{
    toast("Unexpected error occured, please try again later...",{type:"error"})
    getPost();
},[getPost])

//create
const handlePostCreateSuccess=React.useCallback(()=>{
    toast("User has been updated successfully",{type:"success"})
    getPost();
},[getPost])

const handlePostCreateError=React.useCallback(()=>{
    toast("Unexpected error occured, please try again later...",{type:"error"})
    getPost();
},[getPost])


const toogleCreateModal=React.useCallback(()=>{
    setCreateModalOpen((oldValue)=>!oldValue)
},[])

const handleCreateModalClick=React.useCallback(()=>{
    setCreateModalOpen(true) 
},[])

const RenderBody=React.useCallback(()=>{
    if (UserData.loading) {
        return (
            <div className='d-flex justify-content-center'> 
                <Spinner/>
            </div>
        )}
        else if (UserData.error) {
           return( 
            <div className='d-flex justify-content-center'> 
               <p className='text-danger'>404 Not found</p>
            </div>
           )
        }
        else{
            return(
                <>
                    <div className="search-container">
                        <Input
                        type="text"
                        placeholder="Search"
                      //  value={searchPhrase}
                        onChange={(event)=>search(event)}>
                        </Input>
                    </div>
                    <Table>
                            <thead>
                            <tr>
                                <th>Id</th>
                                <th >
                                    <Button className="btn btn-warning" onClick={()=>sortByName(reversed)}>
                                    <span style={{ marginRight: 10 }}>Name</span>
                                    
                                    </Button>
                                    
                                </th>
                                <th >
                                    <Button className="btn btn-warning" onClick={()=>sortBySurname(reversed)}>
                                    <span style={{ marginRight: 10 }}>Surname</span>
                                    
                                    </Button>
                                    
                                </th>
                                <th >
                                    <Button className="btn btn-warning" onClick={()=>sortByBalance(reversed)}><span style={{ marginRight: 10 }}>Balance</span>
                                    </Button>
                                </th>
                                <th>Gender</th>
                                <th>Card</th>
                                <th>Date</th>
                                
                                <th><Button onClick={handleCreateModalClick} className="btn btn-success">Add User</Button></th>
                                </tr>
                        </thead>

                        <tbody>
                            {matchedUsers?.slice(indexOfFirstPost, indexOfLastPost).map(({id,surname,card,balance,gender,name,date})=>(
                                <tr key={id}>
                                    <th scope="row">{id}</th>
                                    <td>{name}</td>
                                    <td>{surname}</td>
                                    <td>{balance}</td>
                                    <td>{gender}</td>
                                    <td><input type='checkbox' value={id} checked={card == true}></input></td>
                                    <td>{date.toLocaleString()}</td>
                                    <td>
                                        <Button  className="btn btn-primary  ms-2" onClick={()=>handleEditModalClick(id)}>Edit</Button>
                                    </td>
                                    <td>
                                        <Button className="btn btn-danger" onClick={()=>handleDeleteClick(id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Pagination
                        postsPerPage={postsPerPage}
                        totalPosts={57}
                        paginate={paginate}
                    />
                </>
            )
        }
    },[handleEditModalClick,handleDeleteClick,UserData.data,UserData.error,UserData.loading,isDeleteLoading,matchedUsers,currentPage])

   
 return(
    <CommandPageContainer>
        <Row>
            <Col>
                {RenderBody()}
                {/* <ToastContainer/> */}
                    <EditPostModal
                    isOpen={!!editingUserId}
                    toogle={()=>setEditingUserId(undefined)}
                    id={editingUserId}
                    onUserEditSuccess={onUserEditSuccess}
                    onUserEditError={onUserEditError}
                />

                    <CreatePostModal
                    isOpen={isCreateModalOpen}
                    toogle={toogleCreateModal}
                    onUserCreateError={handlePostCreateError}
                    onUserCreateSuccess={handlePostCreateSuccess}
                    />
            </Col>
        </Row>
    </CommandPageContainer>
 )
}