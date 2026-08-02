export type ValidationSeverity = "warn" | "error";

export type ValidationWarning = {
  severity: ValidationSeverity;
  message: string;
  slideIndex: number;
};
