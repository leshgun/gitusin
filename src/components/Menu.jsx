import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro"

import { setStartupUser } from "store/slice-user"

import MyButton from "UI/button/MyButton"
import MyDropDown from "UI/dropdown/MyDropDown"
import MySettings from "UI/settings/MySettings"

import { toggleVisible, clear_local_storage } from "../utils/MyTools"

function Menu() {

    const [menuVisible, setMenuVisible] = useState(false);
    const [settingsVisible, setSettingsVisible] = useState(false);

    const startup_user = useSelector(state => state.user.startup);
	const dispatch = useDispatch();

    return (
        <div id="menu">

            <MyButton 
                inner_class='secondary'
                type='submit'
                onClick={() => toggleVisible(menuVisible, setMenuVisible)}
                >
                <div className='dd__button'>
                    <i><FontAwesomeIcon 
                        icon = {solid("bars")}
                        size = "1x"
                    /></i>
                </div>
            </MyButton>

            <MyDropDown
                visible={menuVisible}
                setVisible={setMenuVisible}
                >
                    <span 
                        id={'settings'} 
                        key={'settings'}
                        onClick={() => {
                            setSettingsVisible(true);
                            setMenuVisible(false);
                        }}
                        >settings</span>
                    <span 
                        key={'refresh'}
                        onClick={() => clear_local_storage()}
                        >refresh</span>
            </MyDropDown>
            
            <MySettings
                key='settings'
                settings = { settingsVisible }
                setSettings = { setSettingsVisible }
                startup_user = { startup_user }
                setStartupUser = {
                    username => dispatch(setStartupUser(username))
                }
            />

        </div>
    )

}

export default Menu
