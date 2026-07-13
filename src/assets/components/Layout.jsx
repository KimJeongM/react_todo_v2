function Layout({children, headerContent}){
    return(
        <div className="wrap">
            <header className="header">{headerContent}</header>
            <div className="container">
                {children}
            </div>
        </div>
    )
}

export default Layout; 