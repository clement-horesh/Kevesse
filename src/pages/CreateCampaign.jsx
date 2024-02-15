import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Components, utils
import { FormField } from "../components";
import { useStateContext } from "../context";

const CreateCampaign = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { createCampaign } = useStateContext();
  const categories = ["FinTech", "GameFi", "Web3", "SocialID", "EduHealth"];
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    category: "",
    target: "",
    deadline: "",
    image: "",
  });
  const handleFormFieldChange = (fieldName, e) => {
    // If the field is 'target', check the value is not negative
    if (fieldName === "target" && e.target.value < 0) {
      return;
    }

    // If the field is 'deadline', check the date is not in the past or more than 60 days in the future
    if (fieldName === "deadline") {
      const inputDate = new Date(e.target.value);
      const today = new Date(getTodayDate());
      const maxDate = new Date(getMaxDate());

      if (inputDate < today || inputDate > maxDate) {
        return;
      }
    }

    setForm({ ...form, [fieldName]: e.target.value });
  };
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const getMaxDate = () => {
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 60); // Set maxDate to 60 days in the future

    const year = maxDate.getFullYear();
    const month = String(maxDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(maxDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === 1 || step === 2) {
      setStep(step + 1);
    } else {
     
      
    }
  };

  return (
    <div>
      <div>
        <Link to="/">Close</Link>
        <button
          onClick={() => {
            if (step > 1) setStep(step - 1);
          }}
        >
          Back
        </button>
        {isLoading && "Loading..."}
        <form onSubmit={handleSubmit}>
          <div>
            {step === 1 && (
              <div>
                <FormField
                  labelName="Username"
                  inputType="text"
                  value={form.name}
                  handleChange={(e) => handleFormFieldChange("name", e)}
                />
                <FormField
                  labelName="Campaign Title"
                  inputType="text"
                  value={form.title}
                  handleChange={(e) => handleFormFieldChange("title", e)}
                />
              </div>
            )}
            {step === 2 && (
              <div>
                <FormField
                  labelName="Category"
                  inputType="select"
                  options={categories}
                  value={form.category}
                  handleChange={(e) => handleFormFieldChange("category", e)}
                />
                <FormField
                  labelName="Campaign image"
                  inputType="url"
                  value={form.image}
                  handleChange={(e) => handleFormFieldChange("image", e)}
                />
                <FormField
                  labelName="Description"
                  isTextArea
                  maxLength={1000}
                  value={form.description}
                  handleChange={(e) => handleFormFieldChange("description", e)}
                />
              </div>
            )}
            {step === 3 && (
              <div>
                <FormField
                  labelName="Goal"
                  inputType="number"
                  value={form.target}
                  handleChange={(e) => handleFormFieldChange("target", e)}
                />
                <FormField
                  labelName="End Date"
                  inputType="date"
                  value={form.deadline}
                  handleChange={(e) => handleFormFieldChange("deadline", e)}
                />
              </div>
            )}
            <button type="submit">
              {step === 3 ? "Submit" : "Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCampaign;