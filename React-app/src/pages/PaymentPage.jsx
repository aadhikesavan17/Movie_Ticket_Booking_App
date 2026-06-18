/*import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentPage.css";

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); 

  const { movieTitle, time, selectedSeats } = location.state;
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleConfirm = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    try {
      const response = await fetch("https://cinebook4.onrender.com/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: user.name,
          movie_title: movieTitle,
          showtime: time,
          seats: selectedSeats.join(","),
          payment_method: paymentMethod
        })
      });

      const data = await response.json();
      console.log("📥 Response from server:", data);

      if (data.success) {
      navigate("/confirmation", {
        state: {
          bookingDetails: {
            name: user.name, // get from state or localStorage
            movie_title: movieTitle,
            showtime: time,
            seats: selectedSeats.join(", "),
            payment_method: paymentMethod,
          }
        }
      });

      } else {
        alert("❌ Booking failed. Try again.");
      }
    } catch (err) {
      console.error("Booking error:", err);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="payment-page">
      <h2>Choose Payment Method</h2>

      <div className="payment-options">
        <label>
          <input
            type="radio"
            value="UPI"
            checked={paymentMethod === "UPI"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          UPI
        </label>
        <label>
          <input
            type="radio"
            value="CARD"
            checked={paymentMethod === "CARD"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Card
        </label>
        <label>
          <input
            type="radio"
            value="COD"
            checked={paymentMethod === "COD"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Cash on Delivery (COD)
        </label>
      </div>

      <button className="confirm-btn" onClick={handleConfirm}>
        Confirm Payment
      </button>
    </div>
  );
}

export default PaymentPage;*/

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./PaymentPage.css";

function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Data coming from previous page (movie/seat selection page)
  const { movieTitle, time, selectedSeats } = location.state || {};

  // Payment selection state
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleConfirm = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      if (!token) {
        alert("Please login again");
        return;
      }

      const response = await fetch("http://localhost:8080/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          name: user.name,
          movie_title: movieTitle,
          showtime: time,
          seats: selectedSeats?.join(", ") || "",
          payment_method: paymentMethod
        })
      });

      const data = await response.json();
      console.log("BOOKING RESPONSE:", data);

      if (data.success) {
        alert("Booking successful! ID: " + data.bookingId);

        navigate("/confirmation", {
          state: {
            bookingDetails: {
              name: user.name,
              movie_title: movieTitle,
              showtime: time,
              seats: selectedSeats?.join(", "),
              payment_method: paymentMethod,
            }
          }
        });
      } else {
        alert("Booking failed. Try again.");
      }

    } catch (err) {
      console.error("Booking error:", err);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="payment-page">

      <h2>Payment Page</h2>

      <div className="payment-options">
        <label>
          <input
            type="radio"
            value="UPI"
            checked={paymentMethod === "UPI"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          UPI
        </label>

        <label>
          <input
            type="radio"
            value="Card"
            checked={paymentMethod === "Card"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Card
        </label>
      </div>

      <button className="confirm-btn" onClick={handleConfirm}>
        Confirm Booking
      </button>

    </div>
  );
}
export default PaymentPage;