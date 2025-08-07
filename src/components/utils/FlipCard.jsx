function FlipCard(props) {
  const cardStyle = {
    backgroundColor: "transparent",
    width: "280px",
    height: "320px",
    perspective: "1000px",
    margin: "0 auto",
    cursor: "pointer",
  };

  const innerStyle = {
    position: "relative",
    width: "100%",
    height: "100%",
    textAlign: "center",
    transition: "transform 0.8s",
    transformStyle: "preserve-3d",
    borderRadius: "16px",
  };

  const frontStyle = {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    background: props.bgColor,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    boxSizing: "border-box",
  };

  const backStyle = {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    background: props.bgColor,
    transform: "rotateY(180deg)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "20px",
    boxSizing: "border-box",
    overflow: "hidden",
  };

  const contentStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    width: "100%",
    textAlign: "center",
    overflow: "hidden",
    position: "relative",
  };

  const titleStyle = {
    color: props.accent || "#31C4BF",
    fontSize: "18px",
    fontWeight: "bold",
    margin: "0 0 15px 0",
    textAlign: "center",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
    maxHeight: "50px",
    lineHeight: "1.2",
    flexShrink: 0,
  };

  const descriptionStyle = {
    color: "#d1d5db",
    fontSize: "14px",
    lineHeight: "1.4",
    textAlign: "center",
    margin: "0",
    flex: "1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    maxHeight: "150px",
    wordWrap: "break-word",
    hyphens: "auto",
    padding: "0 5px",
  };

  const buttonStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    padding: "10px 15px",
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    border: `1px solid ${props.accent || "#31C4BF"}`,
    borderRadius: "8px",
    color: "white",
    fontSize: "13px",
    fontWeight: "500",
    textDecoration: "none",
    transition: "all 0.3s ease",
    whiteSpace: "nowrap",
    boxShadow: `0 0 15px ${props.accent || "#31C4BF"}33`,
    flexShrink: 0,
    marginTop: "15px",
  };

  const logoContainerStyle = {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px",
    boxSizing: "border-box",
  };

  const logoStyle = {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
    filter: "brightness(1.1) contrast(1.1)",
  };

  return (
    <div
      className="flip-card-container"
      style={cardStyle}
      onMouseEnter={(e) => {
        const inner = e.currentTarget.querySelector(".flip-inner");
        if (inner) inner.style.transform = "rotateY(180deg)";
      }}
      onMouseLeave={(e) => {
        const inner = e.currentTarget.querySelector(".flip-inner");
        if (inner) inner.style.transform = "rotateY(0deg)";
      }}
    >
      <div className="flip-inner" style={innerStyle}>
        <div style={frontStyle}>
          <div style={logoContainerStyle}>
            <img
              src={props.image}
              alt={props.name}
              style={logoStyle}
              onError={(e) => {
                console.log(`❌ Failed to load image: ${props.image}`);
              }}
              onLoad={() =>
                console.log(`✅ Successfully loaded: ${props.image}`)
              }
            />
          </div>
        </div>
        <div style={backStyle}>
          <div style={contentStyle}>
            <h3 style={titleStyle}>{props.name}</h3>
            {props.description && (
              <p style={descriptionStyle}>{props.description}</p>
            )}
            {props.website && (
              <a
                href={props.website}
                target="_blank"
                rel="noopener noreferrer"
                style={buttonStyle}
                onMouseEnter={(e) => {
                  e.target.style.background = "rgba(255, 255, 255, 0.2)";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "rgba(255, 255, 255, 0.1)";
                  e.target.style.transform = "translateY(0px)";
                }}
              >
                <span>Visit Website</span>
                <svg
                  style={{ width: "12px", height: "12px", flexShrink: 0 }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlipCard;
