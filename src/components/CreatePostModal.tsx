import axios from "axios";
import { check } from "prettier";
import React, { ChangeEvent , MouseEvent } from "react";
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

interface ICreatePostModelProps{
    isOpen:boolean;
    toogle:()=>void;
    onUserCreateSuccess:()=>void;
    onUserCreateError:()=>void;
}

export interface IModalFormData{
    name:string,
    surname:string
    card:boolean,
    balance:number,
    gender:string,
    date:Date
}
var curr = new Date();
export const INITIAL_FORM_DATA:IModalFormData={
    name:'',
    surname:'',
    gender:'',
    card:false,
    balance:0,
    date:curr
}

export enum EFormField{
    NAME='name',
    SURNAME='surname',
    GENDER='gender',
    CARD='card',
    BALANCE='balance',
    DATE='date'
}

export const CreatePostModal : React.FC<ICreatePostModelProps>=({isOpen,toogle,onUserCreateError,onUserCreateSuccess})=>{
    const [createUserData,setCreateUserData]=React.useState<IModalFormData>(INITIAL_FORM_DATA);
    const [isCreateLoading,setCreatLoading]=React.useState(false);
    const handleInputChange=React.useCallback((event:ChangeEvent<HTMLInputElement>,type:EFormField)=>{
        if (type===EFormField.CARD) {
            console.log(event.target.checked);
            
            setCreateUserData((oldValue)=>({...oldValue,[type]:event.target.checked}))
            
        }else{
            setCreateUserData((oldValue)=>({...oldValue,[type]:event.target.value}))
        }
        
    },[createUserData])
    //Post
    const handlePostCreate=React.useCallback(()=>{
        // setCreateUserData((oldValue)=>({...oldValue,[EFormField.DATE]:}))
        setCreatLoading(true)
        axios.post('https://6388829aa4bb27a7f788fc78.mockapi.io/users',createUserData)
        .then(onUserCreateSuccess)
        .then(toogle)
        .catch(onUserCreateError)
        .finally(()=>{
        setCreatLoading(false)
        })
        
    },[createUserData,onUserCreateError,onUserCreateSuccess,isOpen,toogle])

    return(
       <Modal centered isOpen={isOpen} toggle={toogle}>
           <ModalHeader>Add User</ModalHeader>
           <ModalBody>
               <Input 
               className='task-input'
                placeholder="Name" 
                disabled={isCreateLoading}
                onChange={(event)=>handleInputChange(event,EFormField.NAME)}>
                </Input>
               <Input 
               className='task-input'
                placeholder="surname"
                //value={createUserData.surname}
                disabled={isCreateLoading}
                onChange={(event)=>handleInputChange(event,EFormField.SURNAME)}>
                </Input>
                <Input 
                className='task-input'
                type="number"
                placeholder="Balance"
                disabled={isCreateLoading}
                onChange={(event)=>handleInputChange(event,EFormField.BALANCE)}>
                </Input>
                <Input 
                className='task-input'
                type="select"
                placeholder="Gender"
                disabled={isCreateLoading}
                onChange={(event)=>handleInputChange(event,EFormField.GENDER)}>
                    <option value="other">Other</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </Input>
                <input
                className='task-input'
                type="checkbox"
                defaultChecked={false}
                onChange={(event)=>handleInputChange(event,EFormField.CARD)}
                />
           </ModalBody>
           <ModalFooter>
               <Button onClick={handlePostCreate} disabled={isCreateLoading} className="btn btn-success">Create</Button>
           </ModalFooter>
       </Modal>
    )
}