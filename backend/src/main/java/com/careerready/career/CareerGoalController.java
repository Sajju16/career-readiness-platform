package com.careerready.career;

import com.careerready.career.dto.CareerGoalRequest;
import com.careerready.career.dto.CareerGoalResponse;
import com.careerready.user.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/career-goals")
@RequiredArgsConstructor
public class CareerGoalController {

    private final CareerGoalService careerGoalService;

    @PostMapping
    public ResponseEntity<CareerGoalResponse> saveOrUpdateGoal(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody CareerGoalRequest request) {
        CareerGoalResponse response = careerGoalService.saveOrUpdateGoal(user, request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<CareerGoalResponse> getGoal(@AuthenticationPrincipal User user) {
        CareerGoalResponse response = careerGoalService.getGoal(user);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/me")
    public ResponseEntity<Void> deleteGoal(@AuthenticationPrincipal User user) {
        careerGoalService.deleteGoal(user);
        return ResponseEntity.noContent().build();
    }
}
