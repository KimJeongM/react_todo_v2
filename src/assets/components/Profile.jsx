function Profile({userName}){
    return (
        <div className="profile-wrap">
            <span className="img-wrap"></span>
            <div className="user-name-wrap">
                <p className="hello">Hello</p>
                <p className="user-name">{userName}</p>
            </div>
        </div>
    );
}

export default Profile; 