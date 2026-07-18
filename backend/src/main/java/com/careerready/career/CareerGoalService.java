package com.careerready.career;

import com.careerready.career.dto.CareerGoalRequest;
import com.careerready.career.dto.CareerGoalResponse;
import com.careerready.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CareerGoalService {

    private final CareerGoalRepository careerGoalRepository;

    @Transactional
    public CareerGoalResponse saveOrUpdateGoal(User user, CareerGoalRequest request) {
        CareerGoal goal = careerGoalRepository.findByUserId(user.getId())
                .orElse(CareerGoal.builder().user(user).build());

        goal.setTargetRole(request.getTargetRole());
        goal.setPreferredCompany(request.getPreferredCompany());
        goal.setGeneralIndustryReqs(request.getGeneralIndustryReqs());
        goal.setGraduationYear(request.getGraduationYear());
        goal.setExperienceLevel(request.getExperienceLevel());

        CareerGoal savedGoal = careerGoalRepository.save(goal);
        return mapToResponse(savedGoal);
    }

    @Transactional(readOnly = true)
    public CareerGoalResponse getGoal(User user) {
        CareerGoal goal = careerGoalRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Career goal not found for this user"));
        return mapToResponse(goal);
    }

    @Transactional
    public void deleteGoal(User user) {
        CareerGoal goal = careerGoalRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Career goal not found for this user"));
        careerGoalRepository.delete(goal);
    }

    private CareerGoalResponse mapToResponse(CareerGoal goal) {
        return CareerGoalResponse.builder()
                .id(goal.getId())
                .targetRole(goal.getTargetRole())
                .preferredCompany(goal.getPreferredCompany())
                .generalIndustryReqs(goal.getGeneralIndustryReqs())
                .graduationYear(goal.getGraduationYear())
                .experienceLevel(goal.getExperienceLevel())
                .createdAt(goal.getCreatedAt())
                .updatedAt(goal.getUpdatedAt())
                .build();
    }
}
