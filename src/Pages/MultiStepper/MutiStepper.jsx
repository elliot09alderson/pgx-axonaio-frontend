import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";

const steps = ["Credentials", "Business Details", "Document Upload"];

export default function MultiStepper({ activeStep }) {
  const isStepFailed = (step) => {
    return step === 0;
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const labelProps = {};

          //   if step failed
          if (isStepFailed(index)) {
            labelProps.optional = (
              <Typography variant="caption" color="error"></Typography>
            );
            labelProps.error = true;
          }

          return (
            <Step key={label}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}
