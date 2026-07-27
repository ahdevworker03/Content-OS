export type Scale = 0.25 | 0.5 | 0.75 | 1;

export type ValidationSeverity = "warn" | "error";

export type ValidationWarning = {
  severity: ValidationSeverity;
  message: string;
  slideIndex: number;
};
