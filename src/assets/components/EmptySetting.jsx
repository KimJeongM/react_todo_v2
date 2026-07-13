function EmptySetting({title="our task box is empty.", desc="Once your create new task you'll see it listed here"}){
    return(
        <div className="empty-wrap">
            <img src="/src/assets/components/img/empty_img.svg" alt="" />
            <p className="title">{title}</p>
            <p className="desc">{desc}</p>
        </div>
    );
}

export default EmptySetting;