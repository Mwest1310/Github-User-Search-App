import "./main.scss"
import { useState } from "react";
import { useEffect } from "react";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Searcher() {
    const [theme, setTheme] = useState("light");
    const [themeIcon, setThemeIcon] = useState(faLightbulb);
    const [searchUser, setSearchUser] = useState("");
    const [user, setUser] = useState([]);

    useEffect(() => {
        document.title = "Searcher";
    }, []);

    function handleClick(){
        if(theme === "light") {
            setTheme("dark");
            setThemeIcon(faMoon);
        } else {
            setTheme("light");
            setThemeIcon(faLightbulb);
        }
    }

    function handleSearch(){
        const url = `https://api.github.com/users/${searchUser}`;

        async function getUser(){
            const response = await fetch(url);
            const data = await response.json();
            setUser(data);
            
            console.log(user);
        }
        getUser();
        
    }

        return(
        <div id = "main" className = {theme}>
            <div id = "title">
                    <h1 className = "major-text">Searcher</h1>
                    <button id = "toggle-mode" className = {theme} onClick = {handleClick}>
                        <FontAwesomeIcon icon = {themeIcon} className = "minor-text" />
                    </button>
                </div>

                <div id = "input-div">
                    <input type = "text" id = "user-input" className = "inner major-text" 
                        placeholder = "Please input a username here"
                        onChange = {(e) => setSearchUser(e.target.value)}></input>
                    <button id = "user-submit" className = "inner minor-text" onClick = {handleSearch}>Search</button>
                </div>
            <div id = "container" className = "inner">
                
                
                <div id = "output-div">
                    <div id = "output-header">
                        <img src = {user.avatar_url} id = "avatar" alt = "Profile Picture will display here" className = "minor-text"></img>
                        <div id = "name-link-div">
                            <h1 className = "major-text">{user.name ? user.name : user.login ? user.login : "Name will display here"}</h1>
                            <a href = {user.html_url} target = "_blank" className = "minor-text">Link here</a>
                            
                        </div>
                        <p id = "date" className = "minor-text">{user.created_at ? user.created_at.substr(0,10) : "Date joined will display here"}</p>
                    </div>
                    <p id = "bio" className = "minor-text">{user.bio ? user.bio : "No Bio Available"}</p>
                    <div id = "output-body">
                    <div id = "info-body">
                            <div className = "info minor-text">
                                <p className = "info-title minor-text">Repos</p>
                                <p className = "info-value minor-text">{user.public_repos}</p>
                            </div>
                            <div className = "info minor-text">
                                <p className = "info-title minor-text">Followers</p>
                                <p className = "info-value minor-text">{user.followers}</p>
                            </div>
                            <div className = "info minor-text">
                                <p className = "info-title minor-text">Following</p>
                                <p className = "info-value minor-text">{user.following}</p>
                            </div>
                        </div>
                    </div>
                    <div id = "output-footer">
                            <p className = "footer-details minor-text">{user.location ? user.location : "N/A"}</p>
                            <a className = "footer-details minor-text">{user.twitter_username ? user.twitter_username : "N/A"}</a>
                            <a className = "footer-details minor-text">{user.blog ? user.blog : "N/A"}</a>
                            <a className = "footer-details minor-text">{user.company ? user.company : "N/A"}</a>
                    </div>
                </div>
            </div>
        </div>
    )
    
}

export default Searcher