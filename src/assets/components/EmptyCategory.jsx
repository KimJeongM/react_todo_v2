import { images } from "../components/images";
function EmptyCategory(){
    return(
        <div className="empty-wrap">
            <img src={images.noFolder} alt="" />
            <p className="title">No category yet.</p>
            <p className="desc">Tap the + button to create your first one</p>
        </div>
    ); 

}

export default EmptyCategory;