function Category({categoryTit, className="", cateColor="#FF5959"}){
    const categoryColorStyle = {
        '--cate-color' : cateColor
    }
    return (
        <span className={`category ${className}`} style={categoryColorStyle}>{categoryTit}</span>
    )
}

export default Category