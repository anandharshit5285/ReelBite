import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// Reusable feed for vertical reels
// Props:
// - items: Array of video items { _id, video, name, description, price, foodPartner, foodPartnerName }
// - onLike: (item) => void | Promise<void>
// - onSave: (item) => void | Promise<void>
// - emptyMessage: string
// - userAddress: string
const ReelFeed = ({
  items = [],
  onLike,
  onSave,
  emptyMessage = "No videos yet.",
  userAddress = "",
}) => {
  const videoRefs = useRef(new Map());
  const navigate = useNavigate();

  // Handle empty address and truncation
  const truncatedAddress = userAddress
    ? userAddress.length > 25
      ? userAddress.substring(0, 22) + "..."
      : userAddress
    : "Set your delivery address";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (!(video instanceof HTMLVideoElement)) return;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            video.play().catch(() => {
              /* ignore autoplay errors */
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: [0, 0.25, 0.6, 0.9, 1] },
    );

    videoRefs.current.forEach((vid) => observer.observe(vid));
    return () => observer.disconnect();
  }, [items]);

  const setVideoRef = (id) => (el) => {
    if (!el) {
      videoRefs.current.delete(id);
      return;
    }
    videoRefs.current.set(id, el);
  };

  const handleAddToCart = (item) => {
    // store minimal item details in localStorage so Cart can read them
    try {
      const payload = {
        _id: item._id,
        name: item.name,
        price: item.price ?? item?.price ?? 0,
      };
      localStorage.setItem("cartItem", JSON.stringify(payload));
    } catch (e) {
      console.warn("Failed to write cartItem to localStorage", e);
    }
    navigate("/cart");
  };

  return (
    <div className="reels-page">
      {/* Address Bar */}
      <div className="address-bar">
        <div className="location-icon">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 21s-8-4.5-8-11a8 8 0 1 1 16 0c0 6.5-8 11-8 11z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>
        <div className="address-block">
          <div className="delivery-label">Delivery to:</div>
          <div className="address-text">{truncatedAddress}</div>
        </div>
      </div>

      <div className="reels-feed" role="list">
        {items.length === 0 && (
          <div className="empty-state">
            <p>{emptyMessage}</p>
          </div>
        )}

        {items.map((item) => (
          <section key={item._id} className="reel" role="listitem">
            <video
              ref={setVideoRef(item._id)}
              className="reel-video"
              src={item.video}
              muted
              playsInline
              loop
              preload="metadata"
            />

            <div className="reel-overlay">
              <div className="reel-overlay-gradient" aria-hidden="true" />

              {/* Right side actions */}
              <div className="reel-actions">
                <div className="reel-action-group">
                  <button
                    onTouchStart={(e) => {
                      // e.preventDefault();
                      // e.stopPropagation();
                    }}
                    onTouchEnd={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log("Like button clicked for item:", item);
                      if (onLike) {
                        onLike(item);
                      } else {
                        console.log("No onLike handler provided");
                      }
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (onLike) onLike(item);
                    }}
                    className={`reel-action ${item.isLiked ? "is-active" : ""}`}
                    aria-label="Like"
                    style={{
                      width: "44px",
                      height: "44px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0",
                      touchAction: "manipulation",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        pointerEvents: "none",
                      }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill={item.isLiked ? "currentColor" : "none"}
                        stroke={item.isLiked ? "none" : "currentColor"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                          color: item.isLiked ? "#ff4b4b" : "white",
                          transition: "all 0.2s ease",
                          pointerEvents: "none",
                        }}
                      >
                        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
                      </svg>
                    </div>
                  </button>
                  <div className="reel-action__count">
                    {item.likeCount || 0}
                  </div>
                </div>

                <div className="reel-action-group">
                  <button
                    className={`reel-action ${item.isSaved ? "is-active" : ""}`}
                    onTouchStart={(e) => {
                      // e.preventDefault();
                      // e.stopPropagation();
                    }}
                    onTouchEnd={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log("Save button clicked for item:", item);
                      if (onSave) {
                        onSave(item);
                      } else {
                        console.log("No onSave handler provided");
                      }
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (onSave) onSave(item);
                    }}
                    aria-label="Save"
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
                    </svg>
                  </button>
                  <div className="reel-action__count">
                    {item.savesCount ?? item.saves ?? 0}
                  </div>
                </div>
              </div>

              {/* Food details and actions */}
              <div className="reel-content">
                <h2 className="reel-dish-name">{item.name}</h2>
                <p className="reel-description" title={item.description}>
                  {item.description}
                </p>
                {item.foodPartner && item.foodPartner.name ? (
                  <p className="reel-partner-name">
                    <svg
                      className="store-icon"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M3 9l1-2h16l1 2" />
                      <path d="M3 9v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9" />
                      <path d="M7 9V6a5 5 0 0 1 10 0v3" />
                    </svg>
                    <span className="partner-name-text">
                      {item.foodPartner.name}
                    </span>
                  </p>
                ) : null}

                <div className="reel-bottom-actions">
                  {item.foodPartner && (
                    <button
                      className="menu-btn"
                      onClick={() => {
                        navigate(`/food-partner/${item.foodPartner._id}`);
                      }}
                    >
                      Menu
                    </button>
                  )}

                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to cart - ₹
                    {(item.price ?? item?.price ?? 0).toFixed
                      ? Number(item.price || 0).toFixed(2)
                      : item.price || 0}
                  </button>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default ReelFeed;
