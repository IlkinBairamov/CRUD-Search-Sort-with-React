import axios from 'axios';
import React, { ChangeEvent } from 'react';
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { Initial_Async_Data } from '../const';
import { IAsyncData, IUser } from '../models';
import { EFormField, IModalFormData, INITIAL_FORM_DATA } from './CreatePostModal';


interface IEditPostModalProps{
    isOpen:boolean;
    toogle:()=>void;
    id?:number
    onUserEditSuccess?:()=>void;
    onUserEditError?:()=>void
}

export const EditPostModal : React.FC<IEditPostModalProps>=({isOpen,toogle,id,onUserEditSuccess,onUserEditError})=>{

    const [editModalData,setEditModalData]=React.useState<IAsyncData<IUser>>(Initial_Async_Data)
    const [editUserData,setEditUserData]=React.useState<IModalFormData>(INITIAL_FORM_DATA)
    const [isEditLoading,setEditLoading]=React.useState(false)

    const handleInputChange=React.useCallback((event:ChangeEvent<HTMLInputElement>,type:EFormField)=>{
        
        if (type===EFormField.CARD) {
            
            setEditUserData((oldValue)=>({...oldValue,[type]:event.target.checked}))
            
        }else{
            setEditUserData((oldValue)=>({...oldValue,[type]:event.target.value}))
        }
        console.log(editUserData);
        
    },[])
    
      //Get
    React.useEffect(()=>{
        if (Boolean(id)) {
            
            
                setEditModalData((oldData)=>({...oldData,loading:true}))
            axios.get<IUser>(`https://6388829aa4bb27a7f788fc78.mockapi.io/users/${id}`)
            .then(({data})=>{
                setEditUserData({...data})
                setEditModalData((oldData)=>({...oldData,loading:false,data,error:undefined}))   
            }).catch((error)=>{
                setEditModalData({data:undefined,loading:false,error:error.toString()})
            })
        }
    },[id])

      //Put
      const handleEditClick=React.useCallback(()=>{
       if (Boolean(id)) {
        setEditLoading(true)
        axios.put(`https://6388829aa4bb27a7f788fc78.mockapi.io/users/${id}`,editUserData)
        .then(onUserEditSuccess)
        .then(toogle)
        .then(()=>{
            console.log(id);
        })
        .catch(onUserEditError)
        .finally(()=>{
         setEditLoading(false)
        })
       }
    },[editUserData,id,onUserEditSuccess,onUserEditError])

    const RenderBody=React.useCallback(()=>{
        if (editModalData.loading) {
            return (
                <div className='d-flex justify-content-center'> 
                </div>
            )}
            else if (editModalData.error) {
               return( 
                <div className='d-flex justify-content-center'> 
                   <p className='text-danger'>404 Not found</p>
                </div>
               )
            }
            else{
                return(
                    <>
                    <Input 
                    className='task-input'
                    value={editUserData.name}
                    disabled={isEditLoading}
                    onChange={(event)=>handleInputChange(event,EFormField.NAME)}
                    />
                    <Input 
                    className='task-input'
                    value={editUserData.surname}
                    disabled={isEditLoading}
                    onChange={(event)=>handleInputChange(event,EFormField.SURNAME)}
                    />
                    <Input 
                    className='task-input'
                    type="select"
                    placeholder="Gender"
                    disabled={isEditLoading}
                    onChange={(event)=>handleInputChange(event,EFormField.GENDER)}>
                        <option value="other">Other</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </Input>
                     <Input 
                     className='task-input'
                    value={editUserData.balance}
                    disabled={isEditLoading}
                    onChange={(event)=>handleInputChange(event,EFormField.BALANCE)}
                    /> 
                     <Input 
                     className='task-input'
                     type='checkbox'
                    defaultChecked={editUserData.card==true}
                    disabled={isEditLoading}
                    onChange={(event)=>handleInputChange(event,EFormField.CARD)}
                    />    
                    </>
                )
            }
        },[editUserData.name,editUserData.surname,editUserData.gender,editUserData.card,editUserData.balance,handleInputChange,editModalData.error,editModalData.loading])
    
    return(
        <Modal centered isOpen={isOpen} toggle={toogle}>
        <ModalHeader>Edit User</ModalHeader>
        <ModalBody>
            {RenderBody()}
        </ModalBody>
            <ModalFooter>
              <Button onClick={handleEditClick}  disabled={isEditLoading} className="btn btn-success">Edit
              </ Button>
            </ModalFooter>
    </Modal>
    )
}