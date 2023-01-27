import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro"

import { toggleTheme, setTheme } from "store/slice-defaults"



function ThemeSwitcher() {

	const dispatch = useDispatch();
    const theme = useSelector(state => state.defaults.theme);

    useEffect(() => {
        // choose theme depends on:
		// 1. saved user choice
		// 2. browser meta data
		let theme_item = localStorage.getItem("theme");
		let theme_pcs_dark = window.matchMedia("(prefers-color-scheme: dark)")
			.matches;
		if (theme_item)
			dispatch(setTheme(theme_item));
		else if (theme_pcs_dark)
			dispatch(setTheme("dark"));
    }, [dispatch]);


    useEffect(() => {
		// changing and saving the user's theme selection
		localStorage.setItem("theme", theme || '');
		document.getElementById("App").setAttribute("theme", theme);
	}, [theme]);


    function switch_theme () {
		dispatch(toggleTheme());
	}

    return (
        <div className="theme_switcher">
            <FontAwesomeIcon
                icon={solid("moon")}
                size="xl"
                onClick={() => switch_theme()}
            />
        </div>
    )
}

export default ThemeSwitcher
