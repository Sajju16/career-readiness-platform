package com.careerready.auth;

import com.careerready.user.Role;
import com.careerready.user.User;
import com.careerready.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Service for handling user registration and authentication.
 */
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    /**
     * Registers a new user.
     * @param request the registration details
     * @return AuthResponse containing the JWT token
     */
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        var user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER) // Default role
                .build();
        
        userRepository.save(user);
        
        var jwtToken = jwtService.generateToken(user);
        
        return buildAuthResponse(user, jwtToken);
    }

    /**
     * Authenticates a user.
     * @param request the login details
     * @return AuthResponse containing the JWT token
     */
    public AuthResponse login(LoginRequest request) {
        // Authenticate the user - will throw exception if bad credentials
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        
        // If we get here, user is authenticated
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
                
        var jwtToken = jwtService.generateToken(user);
        
        return buildAuthResponse(user, jwtToken);
    }

    private AuthResponse buildAuthResponse(User user, String jwtToken) {
        AuthResponse.UserDto userDto = AuthResponse.UserDto.builder()
                .id(user.getId().toString())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .build();
                
        return AuthResponse.builder()
                .token(jwtToken)
                .user(userDto)
                .build();
    }
}
