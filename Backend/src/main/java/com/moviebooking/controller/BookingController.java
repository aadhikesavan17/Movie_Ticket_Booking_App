package com.moviebooking.controller;

import com.moviebooking.entity.Booking;
import com.moviebooking.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @GetMapping("/")
    public String home() {
        return " CineBook Spring Boot Backend is Live";
    }

    @PostMapping("/booking")
    public ResponseEntity<?> createBooking(@RequestBody Map<String, Object> body) {
        try {
            Booking booking = new Booking();
            booking.setName((String) body.get("name"));
            booking.setMovieTitle((String) body.get("movie_title"));
            booking.setShowtime((String) body.get("showtime"));
            booking.setSeats(String.valueOf(body.get("seats")));
            booking.setPaymentMethod((String) body.get("payment_method"));

            Booking saved = bookingRepository.save(booking);

            return ResponseEntity.ok(Map.of(
                "success", true,
                "bookingId", saved.getId()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "success", false,
                "message", "Database error"
            ));
        }
    }
}