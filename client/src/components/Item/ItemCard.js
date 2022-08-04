function ItemCard({data}){
    return(
        <div className="ItemCard">
            <h4>{data.Name}</h4>
            <p>{data.Status}</p>
            <p>{data.ItemGroup?.Name}</p>
        </div>
    )
}

export default ItemCard