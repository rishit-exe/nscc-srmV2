function FlipCard(props){
    const style = {
        backgroundColor: props.bgColor,
    }

    return(
        <div className="flip-card">
            <div className="flip-card-inner">
                <div style={style} className="flip-card-front">
                    <img 
                        src={props.image} 
                        alt={props.name}
                        className="sponsor-logo w-full h-full object-cover"
                        onError={(e) => {
                            console.log(`❌ Failed to load image: ${props.image}`);
                        }}
                        onLoad={() => console.log(`✅ Successfully loaded: ${props.image}`)}
                    />
                </div>
                <div style={style} className="flip-card-back">
                    <p className="text-blue-500">{props.name}</p>
                    <p className="description">{props.description}</p>
                    {props.website && (
                        <a 
                            href={props.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="website-link"
                        >
                            Visit Website
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

export default FlipCard;