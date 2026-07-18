package com.careerready.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

/**
 * Repository interface for managing User entities.
 */
@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    
    /**
     * Finds a user by their email address.
     * @param email the email to search for
     * @return an Optional containing the user if found, or empty otherwise
     */
    Optional<User> findByEmail(String email);
    
    /**
     * Checks if a user with the given email exists.
     * @param email the email to check
     * @return true if a user with the email exists, false otherwise
     */
    boolean existsByEmail(String email);
}
