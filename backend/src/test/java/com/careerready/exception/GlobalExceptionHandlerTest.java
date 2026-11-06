package com.careerready.exception;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class GlobalExceptionHandlerTest {

    private GlobalExceptionHandler exceptionHandler;

    @BeforeEach
    void setUp() {
        exceptionHandler = new GlobalExceptionHandler();
    }

    @Test
    void handleNoResourceFoundException_ShouldReturn404() {
        NoResourceFoundException ex = new NoResourceFoundException(HttpMethod.GET, "api/nonexistent");
        ResponseEntity<Map<String, String>> response = exceptionHandler.handleNoResourceFoundException(ex);

        assertNotNull(response);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("Resource not found", response.getBody().get("error"));
    }

    @Test
    void handleGenericException_ShouldReturn500() {
        Exception ex = new Exception("Unexpected problem");
        ResponseEntity<Map<String, String>> response = exceptionHandler.handleGenericException(ex);

        assertNotNull(response);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("An unexpected error occurred", response.getBody().get("error"));
    }
}
