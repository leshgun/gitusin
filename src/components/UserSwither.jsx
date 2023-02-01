import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { setName } from "store/slice-user"

import MyInput from "UI/input/MyInput"
import MyButton from "UI/button/MyButton"

import { onFormSubmit } from "utils/MyTools"



function UserSwither() {

    const [inputValue, setInputValue] = useState('');

    const user_reducer = useSelector(state => state.user)
    const dispatch = useDispatch();
    
    const user = user_reducer.name;
    const startup_user = user_reducer.startup;


    useEffect(() => {
		if (!user)
			dispatch(setName(startup_user))
	}, [dispatch, user, startup_user])

    
    function switch_target_user ( username = inputValue ) {
		if (username && username !== user) {
			dispatch(setName(username));
			setInputValue('');
		}
	}
    
    return (
        <form onSubmit={(e) => onFormSubmit(e, switch_target_user)}>
            <MyInput 
                placeholder={user}
                type="text"
                title="Choose user to get info about"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
            />
            <MyButton 
                inner_class='primary'
                type='submit'
            >Get</MyButton>
        </form>
    )
}

export default UserSwither
