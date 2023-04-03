import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { setting } from "../../settings/setting";
import { onboardingStepRoutesMap } from "../../youtube/onboarding/onboarding-step-routes.constant";

export const onboardingGuard: (neededOnboardingStep?: number) => CanActivateFn = (step?: number) => {
    const validatedStep = step || setting.numberConstants.onboardingMaxStep;

    return () => {
        const currentStep = Number(localStorage.getItem(setting.stringConstants.storeNames.onboardingStep)|| 0);
        console.log(currentStep)
        console.log(validatedStep)

        if (!currentStep) {
            return inject(Router).navigate(['identity/sign-in']);
        }
    
        return currentStep >= validatedStep
            ? true
            : inject(Router).navigate(['onboarding', onboardingStepRoutesMap[currentStep]]);
    };
};
