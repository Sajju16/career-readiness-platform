package com.careerready.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Service for managing users.
 */
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    /**
     * Finds a user by their email.
     * @param email the email to search for
     * @return the user if found
     * @throws RuntimeException if user is not found (will be replaced with a custom exception later if needed)
     */
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }
}
