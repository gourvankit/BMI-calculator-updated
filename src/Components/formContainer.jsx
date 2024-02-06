import React, { useRef, useState } from "react";
import styles from "./form.module.css";
import { changeBmi } from "@/app/redux/features/bmi-slice";
import { useDispatch } from "react-redux";
const FormContainer = () => {
  const dispatch = useDispatch();
  const [unit, setUnit] = useState("cm");
  const [option, setOption] = useState("Adult");
  const [buttonPressed, setButtonPressed] = useState(false);
  const unitChangeHandler = (e) => {
    setUnit(e.target.value);
  };
  const optionSelector = (e) => {
    setOption(e.target.value);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setButtonPressed(true);
    var cmHeight = 0;
    var ftHeight = 0;
    var inchHeight = 0;
    if (document.getElementById("u1").checked) {
      cmHeight = e.target.cmHeight.value;
    }
    if (document.getElementById("u2").checked) {
      ftHeight = e.target.ftHeight.value;
      inchHeight = e.target.inchHeight.value;
    }
    const kg = e.target.weightInput.value;
    if (ftHeight > 0 && inchHeight > 0) {
      const totalInches = ftHeight * 12 + inchHeight;
      const centimeters = totalInches * 2.54;
      const heightToSend = centimeters;
      if (document.getElementById("kg").checked) {
        const bmi = await fetch("/api/calculate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ weight: kg, height: heightToSend }),
        });
        dispatch(changeBmi(await bmi.json()));
      } else {
        const kilograms = kg * 0.453592;
        const bmi2 = await fetch("/api/calculate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ weight: kilograms, height: heightToSend }),
        });
        dispatch(changeBmi(await bmi2.json()));
      }
    } else {
      if (document.getElementById("kg").checked) {
        const bmi = await fetch("/api/calculate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ weight: kg, height: cmHeight }),
        });
        dispatch(changeBmi(await bmi.json()));
      } else {
        const kilograms = kg * 0.453592;
        const bmi2 = await fetch("/api/calculate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ weight: kilograms, height: cmHeight }),
        });
        dispatch(changeBmi(await bmi2.json()));
      }
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={styles.formTop}>
        <div className={styles.selectOption}>
          <p>Select</p>
          <select
            name="ageSelector"
            defaultValue="Adult"
            onChange={optionSelector}
            required
          >
            <option value="Adult">Adult(Age 20+)</option>
            <option value="Child">Child(Age 5-19)</option>
          </select>
        </div>
        {option === "Child" && (
          <div className={styles.ageSelector}>
            <div className={styles.years}>
              <input type="number" placeholder="Years" name="years" required />
            </div>
            <div className={styles.months}>
              <input
                type="number"
                placeholder="months"
                name="months"
                required
              />
            </div>
          </div>
        )}
        <div className={styles.selectHeight}>
          <p>Height</p>
          <div className={styles.heightOptions}>
            <label>
              <input
                type="radio"
                name="unit"
                id="u1"
                value="cm"
                defaultChecked
                onChange={unitChangeHandler}
                required
              />
              Centimeters
            </label>
            <label>
              <input
                type="radio"
                name="unit"
                id="u2"
                value="ft"
                onChange={unitChangeHandler}
                required
              />
              Feets and inches
            </label>
          </div>
        </div>
        {unit === "cm" ? (
          <div className={styles.cmHeight}>
            <input type="number" placeholder="cm" name="cmHeight" required />
          </div>
        ) : (
          <div className={styles.ftHeight}>
            <div className="ft">
              <input type="number" placeholder="ft" name="ftHeight" required />
            </div>
            <div className="inches">
              <input
                type="number"
                placeholder="inches"
                name="inchHeight"
                required
              />
            </div>
          </div>
        )}
        <div className={styles.selectWeight}>
          <p>Weight</p>
          <div className={styles.weightOptions}>
            <label>
              <input
                type="radio"
                name="weightUnit"
                id="kg"
                value="kg"
                defaultChecked
                required
              />
              Kilograms
            </label>
            <label>
              <input
                type="radio"
                name="weightUnit"
                id="pounds"
                value="pounds"
                required
              />
              Pounds
            </label>
          </div>
        </div>
        <div className={styles.weightInput}>
          <input type="number" name="weightInput" required />
        </div>
        <div className={styles.selectWeight}>
          <p>Gender</p>
          <div className={styles.weightOptions}>
            <label>
              <input
                type="radio"
                name="gender"
                id="male"
                value="male"
                defaultChecked
                required
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                id="female"
                value="female"
                required
              />
              Female
            </label>
          </div>
        </div>
        <button className={styles.calculate}>
          {buttonPressed ? "Recalculate" : "Calculate"}
        </button>
      </div>
    </form>
  );
};

export default FormContainer;
