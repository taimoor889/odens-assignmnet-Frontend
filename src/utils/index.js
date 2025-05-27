// utils/utils.js
export const fields = [
  {
    name: "profile_name",
    label: "Profile Name",
    placeholder: "e.g. Ytterbåge",
    type: "text",
  },
  {
    name: "weight_kg_per_m",
    label: "Weight (kg/m)",
    placeholder: "e.g. 0.862",
    type: "number",
  },
  {
    name: "length_m",
    label: "Length (m)",
    placeholder: "e.g. 83.8",
    type: "number",
  },
  { name: "alloy", label: "Alloy", placeholder: "e.g. EN-AW-6073" },
  { name: "temper", label: "Temper", placeholder: "e.g. T5" },
  { name: "tolerance", label: "Tolerance", placeholder: "e.g. EN 755-9" },
  {
    name: "surface_treatment",
    label: "Surface Treatment",
    placeholder: "e.g. Powder Coated",
    type: "text",
  },
  {
    name: "lme_price_eur_per_kg",
    label: "LME Price (€/kg)",
    placeholder: "e.g. 7.34",
    type: "number",
  },
  { name: "date", label: "Date", placeholder: "", type: "date" },
];

export const URL =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:8000/predict"
    : "https://quote-predictor-api.onrender.com/predict";

export const initialFormState = Object.fromEntries(
  fields.map((f) => [f.name, ""])
);

export const validate = (name, value, form, setErrors = null) => {
  const errors = {};

  const entries = name ? [[name, value]] : Object.entries(form);

  entries.forEach(([fieldName, fieldValue]) => {
    const field = fields.find((f) => f.name === fieldName);
    const label = field.label;
    let error = "";

    if (!fieldValue || fieldValue.toString().trim() === "") {
      error = `${label} is required`;
    } else {
      switch (field.type) {
        case "number":
          const num = parseFloat(fieldValue);
          if (isNaN(num)) {
            error = `${label} must be a valid number`;
          } else if (num < 0) {
            error = `${label} cannot be negative`;
          }
          break;
        case "date":
          const date = new Date(fieldValue);
          if (isNaN(date.getTime())) {
            error = `${label} must be a valid date`;
          }
          break;
        case "text":
          const trimmed = fieldValue.toString().trim();
          if (!/^[a-zA-ZäöåÄÖÅ\s-]+$/.test(trimmed)) {
            error = `${label} must contain only letters`;
          }
          break;
        default:
          break;
      }
    }

    if (error) {
      errors[fieldName] = error;
    }
  });

  if (name) {
    return errors[name] || "";
  } else {
    setErrors?.(errors);
    return Object.keys(errors).length === 0;
  }
};
