function EmptyCategory(){
    return(
        <div className="empty-wrap">
            <img src="/src/assets/components/img/no-folder.svg" alt="" />
            <p className="title">No category yet.</p>
            <p className="desc">Tap the + button to create your first one</p>
        </div>
    ); 

}

export default EmptyCategory;